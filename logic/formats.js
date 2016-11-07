var http = require('http');
var jsfeelter = require('../logic/builder').jsfeelter;

var formats = {
    tamplates: {
        html: {
            render: function(json, phrase, requ, resp) {
                var res = resp;
                var req = requ;
                var h=jsfeelter(json,req,phrase,resp);
                //var html=template[0] + '<script>var local_responseData = [' + json + '];window.tshowPanelCallback();window.tshowPanelCallback=function(){console.log("ready to roll!");}</script> <div id="preview" style=""><a class="MI_Feelter" mi-keyphrase="'+phrase+'"></a></div>'+template[2];
                var vs='_dev';
                var html = '';//req.url;
                html+='<link rel="stylesheet" href="//d34p6saz4aff9q.cloudfront.net/css/MidasInsightBareBones' + vs + '.css"type="text/css" />';
                html+='<link rel="stylesheet" href="//d34p6saz4aff9q.cloudfront.net/css/MidasInsightDefault' + vs + '.css" type="text/css" />';
                html+='<script>';
// window.WebFontConfig = {';
//                 html+='        google: {';
//                 html+="            families: ['Source+Sans+Pro:200,300,400,600,700,900:latin', 'Roboto:200,300,400,600,700,900:latin']";
//                 html+='        }';
//                 html+='    };';
//                 html+='(function(d) {';
//                 html+="var wf = document.createElement('script');";
//                 html+='wf.src = "//d34p6saz4aff9q.cloudfront.net/js/webfont.js";';
//                 html+="wf.type = 'text/javascript';";
//                 html+="wf.async = 'true';";
//                 html+="var s = document.getElementsByTagName('script')[0];";
//                 html+="if (typeof s == 'undefined') s = document.getElementsByTagName('title')[0];";
//                 html+="s.parentNode.insertBefore(wf, s);";
//                 html+='})(document);                
                html+='var local_responseData=['+json+']';
                html+='</script>';
                html+='<div id="mi_root" class="MI_Feelter" mi-keyphrase="'+phrase+'" mi-seo="true" mi-layout="inlinepanel" style="position: relative;width: 750px; border: 1px solid rgb(111, 111, 111); box-shadow: 0px 0px 30px -10px; background-color: white;">'+h+'</div>'
                if(req.query.noscript=='undefined' || !req.query.noscript || req.query.noscript=='false')
                    html += '<script type="text/javascript" src="//feelter.com/scripts/feelter'+vs+'.js?'+req.url.split('format=html')[1]+'"></script>';
                res.end(html);
                return;
            

            }
        }
    },
    loadcount: 0,
    loadtime: new Date(),
    load: function() {
        this.loadtime = new Date();
        this.loadcount++;
        var url = 'http://feelter.com/iframe.html';
        var that = this;
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                that.tamplates['iframe'] = body.split(new RegExp('<!-- end segment: .+ -->', 'gi'));
            });
        }).on('error', function(e) {
            console.log("Got an error: ", e);
        });
    }
}
formats.load();
exports.formats = formats;