var http = require('http');
var quota = {
    referrers: {},
    loadcount: 0,
    loadtime: new Date(),
    quotaHost: 'http://api.feelter.com/qouta',
    load: function() {
        this.loadtime = new Date();
        this.loadcount++;
        var url = this.quotaHost+'/?type=state';
        var that = this;
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var r='';
                try{
                    r=JSON.parse(body);
                    that.referrers = r;
                    console.log("got quta: "+ JSON.stringify(that.referrers));
                } catch(e){
                    console.log("Quata response parse error: "+r, e);
                    setTimeout(that.load,10000);
                }
                //console.log(JSON.stringify(that.referrers) + 'this.referrers[ref] '+ that.referrers['188.120.148.189'].state );
            });
        }).on('error', function(e) {
            console.log("Got an error: ", e);
        });
    },
    blockAll: function(ref, phrase) {
        if (new Date()-this.loadtime>60000) this.load();
        if (this.referrers[ref] && this.referrers[ref].state == 'blockall') {
            this.reportBlocked(this.referrers[ref].state, ref, phrase);
            return true;
        }
        return false;
    },
    blockUnknown: function(ref, phrase) {
        if (this.referrers[ref] && this.referrers[ref].state == 'blocknew') {
            this.reportBlocked(this.referrers[ref].state, ref, phrase);
            return true;
        }
        return false;
    },
    reportUnknown: function(ref, phrase) {
        http.get(this.quotaHost + "/?type=reportunknown&ref=" + ref + "&phrase=" + phrase, function(res) {});
    },
    reportKnown: function(ref, phrase) {
        http.get(this.quotaHost + "/?type=reportknown&ref=" + ref + "&phrase=" + phrase, function(res) {});
    },
    reportBlocked: function(blocktype, ref, phrase) {
        // skip
        //http.get(this.quotaHost + "/?type=reportblocked&blocktype=" + blocktype + "&ref=" + ref + "&phrase=" + phrase, function(res) {});
    }
}
quota.load();
exports.quota = quota;