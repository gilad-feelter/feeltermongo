var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var Url = require('url');
var frequest = require('request');


// ====================================== //
//          cdn - api endpoint            //
// ====================================== //

router.get('/', function(req, res, next) {
    try {
        var url = 'mongodb://10.12.192.94:27017/feelter';
        MongoClient.connect(url, function(err, db) {
            try {
                //assert.equal(null, err);
                if (err != null) {
                    res.end(err);
                    return;
                }
                var url_parts = Url.parse(req.url, true);
                var aq = url_parts.query.q.trim().trim('|');
                var qs = aq.split('|');
                var returned = 0;
                var expected = qs.length;
                var resp = '';

                // handle multiple keyphrases in a single request

                for (var i = 0; i < qs.length; i++) {
                    var q = qs[i];
                    getPhrase(db, q, function(h) {
                        try {

                            if (h != '') {
                                if (h[0] == '[') h = h.substring(1, h.length - 1);
                                if (returned < expected - 1) h += ',';
                                resp += h;
                            }
                            returned++;
                            if (returned >= expected) {

                                // send response to client

                                res.writeHeader(200, {
                                    "Content-Type": "text/plain"
                                });
                                if (url_parts.query.callback) res.write(url_parts.query.callback + '(');

                                if (resp[0] != '[') res.write('[');
                                res.write(resp);
                                if (resp[0] != '[') res.write(']');
                                resp = resp.replace(',]', ']');

                                if (url_parts.query.callback) res.write(');');
                                res.end();
                                db.close();
                            }
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

var getPhrase = function(db, q, callback) {
    try {

        // validation

        if (q.length < 4) {
            if (q == '') q = '_';
            var ej = {};
            ej[q] = 'no data';
            callback('');
            return;
            //callback(JSON.stringify(ej));
        }
        q = q.toLowerCase();
        var h = '';
        var multi = false;
        var t = 2;

        // request from mongo db

        db.collection('phrase', function(err, collection) {
            try {
                if (err != null) {
                    callback('error: ' + err);
                    return;
                }
                collection.find({ // TODO: switch to lookup by phrases field
                    "_id": q
                }, {}, {
                    limit: 1
                }).toArray(
                    function(err, items) {
                        try {
                            if (err != null) {
                                callback('error: ' + err);
                                return;
                            }
                            if (items.length > 0) {

                                // data available on mongo db

                                var j = items[0].json;
                                var jkp = {};
                                jkp[q] = j[Object.keys(j)[0]];
                                jkp[q].sourcedb = 'cdn';
                                callback(JSON.stringify(jkp) + '');
                            }
                            else {

                                // data is not available, forward request to sql

                                //callback('{"'+q+'": {"no_data": "new key phrase queued for research","helper": "","dbid": "'+q+'"}}');
                                //return;
                                frequest({
                                    url: 'http://api.feelter.com',
                                    qs: {
                                        q: q
                                    }
                                }, function(err, response, body) {
                                    q=q.replace(new RegExp('"','gi'),'\\"');
                                    try {
                                        if (err) {
                                            callback('{"' + q + '": {"no_data": "new key phrase queued for research","helper": "","dbid": "-1","error":"' + JSON.stringify(err) + '"}}');
                                            return;
                                        }

                                        // successfull response from sql, TODO: save to mongo

                                        callback(response.body.replace(',"dbid"', ',"sourcedb":"sql","dbid"'));
                                    }
                                    catch (e1) {
                                        callback('{"' + q + '": {"no_data": "new key phrase queued for research","helper": "","dbid": "-1","error":"' + JSON.stringify(e1) + '"}}');
                                    }
                                });
                            }
                        }
                        catch (e2) {
                            callback('{"' + q + '": {"no_data": "new key phrase queued for research","helper": "","dbid": "-1","error":"' + JSON.stringify(e2) + '"}}');
                        }
                    });
            }
            catch (e3) {
                callback('{"' + q + '": {"no_data": "new key phrase queued for research","helper": "","dbid": "-1","error":"' + JSON.stringify(e3) + '"}}');
            }
        });
    }
    catch (e4) {
        callback('{"' + q + '": {"no_data": "new key phrase queued for research","helper": "","dbid": "-1","error":"' + JSON.stringify(e4) + '"}}');
    }
}


// ====================================== //
// upsert data, called from relational db //
// ====================================== //

router.post('/insert', function(req, res, next) {
   // res.end('canceled');
    //return;
    var existed = false;
    var url = 'mongodb://10.12.192.94:27017/feelter';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        try {
            if (!req.body.json || req.body.json==''){
                db.collection('phrase').remove({
                    _id: req.body._id
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
            else{
                var j = JSON.parse(req.body.json);
                var p = JSON.parse(req.body.phrases.toLowerCase());
                db.collection('phrase').save({
                    _id: req.body._id,
                    phrases: p,
                    json: j
                }, {}, function(err, doc) {
                    db.close();
                    if (err == null) {
                        res.end(doc == 1 ? 'updated' : 'saved !');
                    }
                    else {
                        res.end(err.message);
                    }
                });
            }
        }
        catch (e) {
            res.end('err: ' + e.message);
            db.close();
        }
    });
});






// dummy method, post wong work if no get defined

router.get('/insert', function(req, res, next) {
    var h = 'form data:' + JSON.stringify(req.body); //.data;
    res.write(h);
    res.end(' - dummy');
});



// test functions

router.get('/test', function(req, res, next) {
    var h = 'form data:' + JSON.stringify(req.body); //.data;
    res.write(h);
    res.end(' - dummy');
});

router.get('/home', function(req, res, next) {

    var url = 'mongodb://10.12.192.94:27017/feelter';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findMentions(db, function(h) {
            //res.render('index', { title: h });
            res.writeHeader(200, {
                "Content-Type": "text/html"
            });
            res.write(h + ' count');
            res.end();
            db.close();
        });
    });
});
var findMentions = function(db, callback) {
    var h = '';
    var multi = false;
    //callback('ccc');
    db.collection('phrase').count(function(error, nbDocs) {
        h = 'count: ' + nbDocs;
        h += '<form method="post" action="search"><input name="data"/><input type="submit/></form>';
        callback(h);
    });


}

router.get('/search', function(req, res, next) {
    var url = 'mongodb://10.12.192.94:27017/feelter';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var url_parts = Url.parse(req.url, true);
        var q = url_parts.query.q;
        searchMentions(db, q, function(h) {
            //res.writeHeader(200, {
            //"Content-Type": "text/html"
            //});
            res.write(url_parts.query.callback + '(' + h + ')');
            res.end();
            db.close();
        });
    });
});
var searchMentions = function(db, q, callback) {
    var h = '';
    var multi = false;
    var t = 2;
    var trimmedq = false;
    var find = {
        _id: {
            '$regex': q
        }
        //,"$where":"this._id.length <= "+(q.length+10)
    }
    if (q.indexOf(' ') > -1) {
        var trimmedq = q.substring(0, q.indexOf(' ')).trim();
        find['$text'] = {
            "$search": '' + trimmedq + ''
        };
        //h=trimmedq;
    }

    db.collection('phrase', function(err, collection) {
        collection.find(find, {
                phrases: 1,
                //_id:1,
                score: {
                    $meta: "textScore"
                }
            }, {
                limit: 500
            })
            .sort({
                score: {
                    $meta: "textScore"
                }
            })
            .toArray(
                function(err, items) {
                    //       callback(items.length);return;
                    if (err != null) {
                        callback(err);
                        return;
                    }
                    items.sort(function(a, b) {
                        return a._id.length - b._id.length
                    });
                    items.sort(function(a, b) {
                        return b.phrases.length - a.phrases.length
                    });
                    for (var i = 0; i < Math.min(20, items.length); i++) {
                        if (items[i]._id.length > q.length + 20) continue;
                        if (h != '') {
                            multi = true;
                            h += ',';
                        }
                        //delete items[i].phrases;
                        h += JSON.stringify({
                            label: items[i]._id,
                            category: 'cat'
                        });
                    }
                    //if (multi) 
                    h = '[' + h + ']';
                    callback(h);
                    return;

                });

        //   callback('no records found');
    });
}

module.exports = router;