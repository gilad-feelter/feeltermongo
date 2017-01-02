var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Url = require('url');
var frequest = require('request');
var quota = require('../logic/quota').quota;
var formats = require('../logic/formats').formats;

var DB_URL = 'mongodb://127.0.0.1:27017/feelter';
var NEW_PHRASE_MSG = "new key phrase queued for research";

// ====================================== //
//          cdn - api endpoint            //
// ====================================== //

// This is the main endpoint where keyphrase data is requested by the client
// Only GET requests are supported
// The requested keyphrase is always returned as the key for the corresponding data
router.get('/', function(req, res, next) {
    try {
        var reqURL = Url.parse(req.url, true);
        var q = reqURL.query.q.trim().trim('|');
        var keyphraseList = q.split('|');
        // extract referer
        if (req.headers.referer) {
            var refererURL = Url.parse(req.headers.referer, true);
            req.headers.refid = refererURL.hostname;
        }
        else {
            req.headers.refid = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        }
        // test headers
        if (keyphraseList[0] == 'zzz') {
            res.end(JSON.stringify(req.headers));
            return;
        }
        // quota checks
        if (quota.blockAll(req.headers.refid, keyphraseList[0])) {
            res.end(buildNoDataMsg(keyphraseList[0], "global Quota exceeded"))
            //res.status(402).end('Quota exceeded');
            return;
        }
        // connect
        MongoClient.connect(DB_URL, function(err, db) {
            try {
                // handle connection errors
                //assert.equal(null, err);
                if (err != null) {
                    res.end(err);
                    return;
                }
                // init response params
                var returned = 0;
                var expected = keyphraseList.length;
                var resp = '';
                // handle multiple keyphrases in a single request
                for (var i = 0; i < expected; i++) {
                    var keyphrase = keyphraseList[i];
                    getPhrase(db, keyphrase, req, function(kpMsg) {
                        try {
                            if (kpMsg != '') {
                                if (kpMsg[0] == '[')
                                    kpMsg = kpMsg.substring(1, kpMsg.length - 1);
                                if (returned < expected - 1)
                                    kpMsg += ',';
                                resp += kpMsg;
                            }
                            returned++;
                            if (returned < expected)
                                return;
                            // send response to client
                            resp = resp.replace(',]', ']');
                            var fmt = req.query.format;
                            if (fmt) {
                                // handle specific formats
                                fmt = fmt.toLowerCase();
                                if (fmt == 'iframe') {
                                    res.writeHeader(200, {
                                        "Content-Type": "text/html"
                                    });
                                    var sharestring = keyphrase;
                                    res.write(formats.tamplates['iframe'][0].replace('Feelter.com social content analysis.', sharestring).replace('<title>feelter</title>', '<title>feelter report - ' + keyphrase + '</title>') + '<script>var local_responseData = [' + resp + '];</script> <div id="preview" style=""><a class="MI_Feelter" mi-keyphrase="' + keyphrase + '"></a></div>');
                                    res.end(formats.tamplates['iframe'][2]);
                                    return;
                                }
                                if (fmt == 'html') {
                                    res.writeHeader(200, {
                                        "Content-Type": "text/html"
                                    });
                                    if (resp.indexOf('"no_data":') > -1)
                                        res.end('<script>console.log(\'' + resp + '\')</script>');
                                    else
                                        formats.tamplates.html.render(resp, keyphrase, req, res)
                                    return;
                                }
                            }
                            // general response format
                            res.writeHeader(200, {
                                "Content-Type": "text/plain"
                            });
                            // wrap message if necessary
                            var suf = "";
                            if (reqURL.query.callback) {
                                res.write(reqURL.query.callback + '(');
                                suf = ");";
                            }
                            if (resp[0] != '[') {
                                res.write('[');
                                suf = "]" + suf;
                            }
                            res.write(resp);
                            res.write(suf);
                            res.end();
                            db.close();
                        }
                        catch (e1) {
                            res.end('error ' + e1);
                            db.close();
                            return;
                        }
                    });
                }
            }
            catch (e2) {
                res.end('error ' + e2);
                db.close();
                return;
            }
        });
    }
    catch (e3) {
        res.end('error ' + e3);
        return;
    }
});

var getPhrase = function(db, keyphrase, req, callback) {
    try {
        // validation
        if (keyphrase.length < 4) {
            if (keyphrase == '')
                keyphrase = '_';
            var ej = {};
            ej[keyphrase] = 'no data';
            callback('');
            return;
            //callback(JSON.stringify(ej));
        }
        keyphrase = keyphrase.toLowerCase();
        var kpid = new Buffer(keyphrase).toString('base64');
        // request phrase collection from mongo db
        db.collection('phrase', function(err, collection) {
            try {
                // handle collection errors
                if (err != null) {
                    callback('error1: ' + err);
                    return;
                }
                // find corresponding document in the collection
                collection.find({
                    $or: [{
                        "_id": kpid
                    }, {
                        "phrases": keyphrase//ampq
                    }]
                }, {}, {
                    limit: 1
                }).toArray(
                    function(err, items) {
                        try {
                            // handle toArray errors
                            if (err != null) {
                                callback('error2: ' + err);
                                return;
                            }
                            if (items.length > 0 && !req.query.shard) {
                                // data available on mongo db
                                var j = items[0].json;
                                var jkp = {}
                                jkp[keyphrase] = j[Object.keys(j)[0]];
                                jkp[keyphrase].sourcedb = 'cdn_nosql_v1';
                                jkp[keyphrase].servertime = getServerTime();
                                quota.reportKnown(req.headers.refid, keyphrase);
                                callback(JSON.stringify(jkp));
                            }
                            else {
                                // quota checks
                                if (quota.blockUnknown(req.headers.refid, keyphrase)) {
                                    callback(buildNoDataMsg(keyphrase, "new phrase Quota exceeded"));
                                    return;
                                }
                                // request keyphrase from crawler farm
                                var qs = {
                                    q: keyphrase,
                                    ref: req.headers.refid
                                };
                                if (req.query.shard)
                                    qs.shard = req.query.shard;
                                frequest({
                                    url: 'http://54.187.35.9',
                                    qs: qs
                                }, function(err, response, body) {
                                    try {
                                        // handle frequest errors
                                        if (err) {
                                            callback(buildNoDataMsg(keyphrase, NEW_PHRASE_MSG, 4, JSON.stringify(err)));
                                            return;
                                        }
                                        // successfull response from sql, TODO: save to mongo
                                        if (response.body.indexOf(NEW_PHRASE_MSG) > -1)
                                            quota.reportUnknown(req.headers.refid, keyphrase);
                                        else
                                            quota.reportKnown(req.headers.refid, keyphrase);
                                        callback(response.body.replace(/,\s*"dbid"/, ',"sourcedb":"cdn_mysql_v1","servertime":"' + getServerTime() + '","dbid"'));
                                    }
                                    catch (e1) {
                                        callback(buildNoDataMsg(keyphrase, NEW_PHRASE_MSG, 5, JSON.stringify(e1)));
                                    }
                                });
                            }
                        }
                        catch (e2) {
                            callback(buildNoDataMsg(keyphrase, NEW_PHRASE_MSG, 6, e2.message));
                        }
                    });
            }
            catch (e3) {
                callback(buildNoDataMsg(keyphrase, NEW_PHRASE_MSG, 7, JSON.stringify(e3)));
            }
        });
    }
    catch (e4) {
        callback(buildNoDataMsg(keyphrase, NEW_PHRASE_MSG, 8, JSON.stringify(e4)));
    }
}

// Get the current server time as a formatted string
var getServerTime = function() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

// Build the no_data message from the specified params
var buildNoDataMsg = function(callback, keyphrase, reason, errorId, errorMsg) {
    var msg = {};
    msg[keyphrase] = {
        no_data: reason,
        helper: "",
        dbid: "-1",
    };
    if (errorMsg !== undefined)
        msg[keyphrase]["error" + errorId] = JSON.stringify(errorMsg);
    return JSON.stringify(msg);
}


// ====================================== //
//    upsert data -  crawlers endpoint    //
// ====================================== //

router.post('/insert', function(req, res, next) {
    //res.end('canceled');return;
    var existed = false;
    MongoClient.connect(DB_URL, function(err, db) {
        // handle connect errors
        assert.equal(null, err);
        try {
            var keyphrase = req.body._id;
            // remove data with old id (TODO: remove later - 20/11/16)
            db.collection('phrase').remove({
                _id: keyphrase
            }, {}, function(err) {});
            // insert or update with the new data
            var kpid = new Buffer(keyphrase).toString('base64');
            if (!req.body.json || req.body.json == '') {
                // delete the document if given empty data
                db.collection('phrase').remove({
                    _id: kpid
                }, {}, function(err) {
                    db.close();
                    if (err == null) {
                        res.end('deleted !');
                    }
                    else {
                        res.end(err.message);
                    }
                });
            }
            else {
                // save the new data
                var j = JSON.parse(req.body.json);
                var p = JSON.parse(req.body.phrases.toLowerCase());
                db.collection('phrase').save({
                    _id: kpid,
                    phrases: p,
                    json: j
                }, {}, function(err, doc) {
                    db.close();
                    if (err == null)
                        res.end(doc == 1 ? 'updated' : 'saved !');
                    else
                        res.end(err.message);
                });
            }
        }
        catch (e) {
            res.end('err: ' + e.message);
            db.close();
        }
    });
});

// dummy method - post won't work if no get defined
router.get('/insert', function(req, res, next) {
    var msg = 'form data:' + JSON.stringify(req.body);
    res.write(msg);
    res.end(' - dummy');
});


// ====================================== //
//          Misc                          //
// ====================================== //

// Perform free form queries to the mongo db
var finDocs = function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {
            try {
                // handle connect errors
                if (err != null) {
                    res.end('Error: connect: ' + err);
                    return;
                }
                var reqURL = Url.parse(req.url, true);
                //var query = {_id:{$gt:q}};
                //var fields = {_id:1};
                //var options = {limit:10};
                var query = JSON.parse(reqURL.query.q);
                var fields = JSON.parse(reqURL.query.f);
                var options = JSON.parse(reqURL.query.o);
                db.collection('phrase', function(err, collection) {
                    try {
                        // handle collection errors
                        if (err != null) {
                            res.end('Error: collection: ' + err);
                            return;
                        }
                        // perform the query
                        var cursor = collection.find(query, fields, options);
                        cursor.toArray(function(err, items) {
                            try {
                                if (err != null) {
                                    res.end('Error: toArray: ' + err);
                                    return;
                                }
                                res.writeHeader(200, {
                                    "Content-Type": "text/plain"
                                });
                                res.write(JSON.stringify(items));
                                res.end();
                                db.close();
                                return;
                            }
                            catch (e4) {
                                res.end('Error: 4: ' + e4);
                            }
                        });
                    }
                    catch (e3) {
                        res.end('Error: 3: ' + e3);
                    }
                });
            }
            catch (e2) {
                res.end('Error: 2: ' + e2);
                db.close();
                return;
            }
        });
    }
    catch (e1) {
        res.end('Error: 1: ' + e1);
        return;
    }
};
router.get('/find', finDocs);
router.post('/find', finDocs);

// Test - return request body itself
router.get('/test', function(req, res, next) {
    var msg = 'form data:' + JSON.stringify(req.body);
    res.write(msg);
    res.end(' - dummy');
});

// Home - count mentions
router.get('/home', function(req, res, next) {
    MongoClient.connect(DB_URL, function(err, db) {
        assert.equal(null, err);
        countDocuments(db, function(msg) {
            //res.render('index', { title: msg });
            res.writeHeader(200, {
                "Content-Type": "text/html"
            });
            res.write(msg + ' count');
            res.end();
            db.close();
        });
    });
});
var countDocuments = function(db, callback) {
    var msg = '';
    var multi = false;
    db.collection('phrase').count(function(error, nbDocs) {
        msg = 'count: ' + nbDocs;
        msg += '<form method="post" action="search"><input name="data"/><input type="submit/></form>';
        callback(msg);
    });
}

// search for mentions
router.get('/search', function(req, res, next) {
    MongoClient.connect(DB_URL, function(err, db) {
        assert.equal(null, err);
        var reqURL = Url.parse(req.url, true);
        var q = reqURL.query.q;
        searchMentions(db, q, function(data) {
            //res.writeHeader(200, {
            //    "Content-Type": "text/html"
            //});
            res.write(reqURL.query.callback + '(' + data + ')');
            res.end();
            db.close();
        });
    });
});
var searchMentions = function(db, q, callback) {
    var resp = '';
    var multi = false;
    // build the query object
    var query = {
        _id: {
            '$regex': q
        },
        //"$where": "this._id.length <= " + (q.length + 10)
    }
    // free text search of first word
    var spaceIndex = q.indexOf(' ');
    if (spaceIndex > -1) {
        var firstWord = q.substring(0, spaceIndex).trim();
        query['$text'] = {
            "$search": '' + firstWord + ''
        };
    }
    // find fields
    var fields = {
        phrases: 1,
        //_id:1,
        score: {
            $meta: "textScore"
        }
    };
    // find options
    var options = {
        limit: 500
    };
    // sort by
    var sortBy = {
        score: {
            $meta: "textScore"
        }
    };
    // get the phrase collection
    db.collection('phrase', function(err, collection) {
        // find the required documents
        collection.find(query, fields, options).sort(sortBy).toArray(function(err, items) {
            //callback(items.length);return;
            // handle find errors
            if (err != null) {
                callback(err);
                return;
            }
            // sort
            items.sort(function(a, b) {
                return a._id.length - b._id.length;
            });
            items.sort(function(a, b) {
                return b.phrases.length - a.phrases.length
            });
            // build response
            for (var i = 0; i < Math.min(20, items.length); i++) {
                if (items[i]._id.length > q.length + 20)
                    continue;
                if (resp != '') {
                    multi = true;
                    resp += ',';
                }
                //delete items[i].phrases;
                resp += JSON.stringify({
                    label: items[i]._id,
                    category: 'cat'
                });
            }
            //if (multi) 
            resp = '[' + resp + ']';
            callback(resp);
            return;
        });
        //callback('no records found');
    });
}

/*-*/
module.exports = router;
