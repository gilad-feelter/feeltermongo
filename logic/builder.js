var extend = require('extend');

var window = {
    "v": "server side"
};

    var MI_MidasRoot = function(j,requ,phrase,resp) {
try {
    //resp.write('zzzzz'+j);
        var json=JSON.parse(j);
        var req=requ;
        var res=resp;
        // Pre load resources and configurations
        function prePluginInit() {
            // Default options for the plug-in 
            // Those can be pre defined or overridden in any of the following:
            // query string parameters in the script reference
            // hash tag parameters in the browser URL box
            // as the options parameter in the  plug-in construction call
            // as meta tags in the enhanced element
                window.MI_defaults = {
                    optimizeNames: true,
                    useLinkTarget: false,
                    useLinkTitle: false,
                    mi_style: 'default',
                    abtest: 'false',
                    debug: 'false',
                    tabs: ['mentions', 'photos', 'stats'],
                    frameElements: ['statsPreview', 'mediaPreview', 'tags', 'shareLinks'],
                    ex: [],
                    includedSourceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
                    widgetTextPosition: 'bottom',
                    hidden: 'false',
                    xOffset: 0,
                    yOffset: 0,
                    gaugeOrientation: 'left',
                    vertical: 'all',
                    inqa: false,
                    RTL: false,
                    lang: "EN",
                    displayText: false,
                    layout: 'inlinepanel',
                    columnscount:2,
                    allowExternalLinks: 'true',
                    displayExternalLinksInline: 'true',
                    collapseLines: 'true',
                    displayShowMore: 'true',
                    loadWhenInvisible: 'false',
                    hover: false,
                    doClientSide: false,
                    template: 'RASTA',
                    tabsType: "TABS",
                    starsType: "SMALL",
                    animationStyle: "DEFAULT",
                    logo: "//d34p6saz4aff9q.cloudfront.net/images/feelterfooter.png",
                    buttonType: "DEFAULT",
                    lightbox: true

                };
            window.tempDictionary = window.tempDictionary ? window.tempDictionary : {
                socialItem: function(data, baseid) {
                    var click = data.click;
                    var si = data.modsi ? data.modsi : window.tempDictionary[window.MI_defaults.template].socialItem.normalItem.replace("@@@metaicon", data.metaicon).replace("@@@cond", (data.sourceURL == '' || window.MI_defaults.allowExternalLinks == 'false' ? 'style="cursor:default;direction:ltr!important;"' : ' style="direction:ltr!important;" onclick="' + click + '"'))
                    var item = window.tempDictionary[window.MI_defaults.template].socialItem.nonTimelineItem.replace(/@@@itemImageURL/g, data.itemImageURL);
                    si = si.replace("@@@item", item)

                    si = si.replace(/@@@itemImageURL/g, data.itemImageURL)
                    si = si.replace(/@@@itempublisher/g, (data.itemPublisher.length > 18 ? data.itemPublisher.substring(0, 17) + '...' : data.itemPublisher))
                    si = si.replace(/@@@timeago/g, data.timeAgo)
                    si = si.replace(/@@@itemDate/g, data.itemDate)
                    si = si.replace(/@@@sourceURL/g, data.sourceURL != 'undefined' ? "" : data.sourceURL.replace('http://www.youtube.com/', ''))
                    si = si.replace(/@@@sourceAvatar/g, item).replace(/@@@itemtext/g, data.moditemText)
                    si = si.replace(/@@@itemWidth/g, (typeof data.itemTimeLine != 'undefined' ? '250' : '275') + 'px')
                    si = si.replace(/@@@sourceSite/g, (data.source.replace('.com', '').replace('www.', '').replace('.', '').replace('.', '')).trim())
                    if (data.regarding) si = si.replace('</th>', '<span style="position: inherit;margin-right: 3px;color: #ccc;">On</span>' + data.regarding.capitalize() + '</th>');
                    if (window.MI_defaults.lang != 'EN')
                        si += '<div class="mi_translate" onclick="window.MI_logUsage(\'translate_clicked\',\'' + baseid + '\',\'' + window.MI_defaults.lang + '\');jQuery.MidasInsight.translate(\'' + data.ksid + '\');event.stopPropagation();" style="color: #49b7e6;font-size:12px;height:24px;float:left;">' + window.langDictionary[window.MI_defaults.lang].translate + '</div>';
                    if (data.itemContentImageURL && data.itemContentImageURL.indexOf('/') == -1) data.itemContentImageURL = '';
                    if (data.itemContentImageURL && data.itemContentImageURL.indexOf('//') < 0) data.itemContentImageURL = '//' + data.itemContentImageURL;
                    if (data.itemContentImageURL && data.itemContentImageURL.indexOf('.') > -1) {
                        if (!jQuery.MidasInsight.ObjDictionary[baseid].gallery) jQuery.MidasInsight.ObjDictionary[baseid].gallery = [{
                            href: '//d34p6saz4aff9q.cloudfront.net/img/feelter.png'
                        }];
                        //jQuery.MidasInsight.ObjDictionary[baseid].gallery.push({ href: data.itemContentImageURL, title: data.itemPublisher })
                        //data.galleryindex = jQuery.MidasInsight.ObjDictionary[baseid].gallery.length - 1;
                        //if (window.MI_defaults.lightbox == true && !(data.source.indexOf("facebook") > -1)) {
                        si += window.tempDictionary[window.MI_defaults.template].socialItem.lightboxContentImage.replace(/@@@itemcontentimage/g, data.itemContentImageURL).replace(/@@@ksid/g, data.ksid).replace(/@@@kfid/g, baseid);

                        //} else {
                        //    si += window.tempDictionary[window.MI_defaults.template].socialItem.itemContentImage.replace("@@@itemcontentimage", data.itemContentImageURL);

                        //}
                    }
                    si += '</td></tr></table>'
                    si += '</div>';
                    si = si.replace(/@@@click/g, '');

                    data.modsi = si;
                },
                socialItemneweggItem: function(data, baseid) {
                    data.moditemText = data.moditemText.replace(/Pros:/g, '<span style="font-weight:bold">Pros:</span>').replace(/Cons:/g, '<span style="font-weight:bold">Cons:</span>').replace(/Other Thoughts:/g, '<span style="font-weight:bold">Other Thoughts:</span>')
                    window.tempDictionary.socialItem(data, baseid);
                },
                socialItemShowInPhotosTab: function(data, baseid) {
                    data.click = ' ';
                    window.tempDictionary.socialItem(data, baseid);
                },
                socialItemflickrItem: function(data, baseid) {
                    window.tempDictionary.socialItemShowInPhotosTab(data, baseid);
                },
                socialIteminstagramItem: function(data, baseid) {
                    data.click = ' ';
                    data.modsi = window.tempDictionary[window.MI_defaults.template].socialItem.instagramItem.replace("@@@metaicon", data.metaicon).replace("@@@cond", (data.sourceURL == '' || window.MI_defaults.allowExternalLinks == 'false' ? 'style="cursor:default;direction:ltr!important;"' : ' style="direction:ltr!important;" onclick="' + data.click + '"'))
                    window.tempDictionary.socialItem(data, baseid);
                },
                socialItempinterestItem: function(data, baseid) {
                    window.tempDictionary.socialItemShowInPhotosTab(data, baseid);
                },
                socialItemyoutubeItem: function(data, baseid) {
                    //if (!jQuery.MidasInsight.ObjDictionary[baseid].gallery) jQuery.MidasInsight.ObjDictionary[baseid].gallery = [];
                    var vurl = data.sourceURL.replace('http://www.youtube.com/', '//www.youtube.com/watch?v=');
                    jQuery.MidasInsight.AddtoGallery(baseid, {
                        href: vurl,
                        title: data.itemPublisher
                    });
                    //jQuery.MidasInsight.ObjDictionary[baseid].gallery.push({ href: data.sourceURL.replace('http://www.youtube.com/', '//www.youtube.com/watch?v='), title: data.itemPublisher })
                    var click = "window.MI_logUsage('play_video','" + baseid + "','youtube'); jQuery.MidasInsight.ShowLightBoxURL('" + vurl + "','" + baseid + "')";
                    var item = window.tempDictionary[window.MI_defaults.template].socialItem.nonTimelineItem;
                    item = item.replace(/@@@itemImageURL/g, data.itemImageURL)
                    var si = window.tempDictionary[window.MI_defaults.template].socialItem.lightboxYoutubeItem
                        .replace(/@@@youtubeid/g, data.sourceURL.split('/')[data.sourceURL.split('/').length - 1]);
                    data.modsi = si.replace(/@@@itemDate/g, data.itemDate)
                        .replace(/@@@click/g, click)
                        .replace(/@@@itemImageURL/g, data.itemImageURL)
                        .replace(/@@@itemPublisher/g, (data.itemPublisher.length > 18 ? data.itemPublisher.substring(0, 17) + '...' : data.itemPublisher))
                        .replace(/@@@ksid/g, data.ksid)
                        .replace(/@@@timeAgo/g, data.timeAgo)
                        .replace(/@@@sourceURL/g, data.sourceURL.replace('http://www.youtube.com/', ''))
                        .replace(/@@@sourceAvatar/g, item)
                        .replace(/@@@itemText/g, data.moditemText)
                        .replace(/@@@itemWidth/g, (typeof data.itemTimeLine != 'undefined' ? '250' : '275') + 'px')
                        .replace(/@@@sourceSite/g, (data.source.replace('.com', '').replace('www.', '').replace('.', '').replace('.', '')).trim())
                },
                socialItemvimeoItem: function(data, baseid) {
                    //debugger;
                    //if (!jQuery.MidasInsight.ObjDictionary[baseid].gallery) jQuery.MidasInsight.ObjDictionary[baseid].gallery = [];
                    var vurl = data.sourceURL;
                    jQuery.MidasInsight.AddtoGallery(baseid, {
                        href: vurl,
                        title: data.itemPublisher
                    });

                    //jQuery.MidasInsight.ObjDictionary[baseid].gallery.push({
                    //    href: data.sourceURL//.replace('vimeo.com/', 'player.vimeo.com/video/')
                    //    , title: data.itemPublisher
                    //})
                    var click = "window.MI_logUsage('play_video','" + baseid + "','vimeo'); jQuery.MidasInsight.ShowLightBoxURL('" + vurl + "','" + baseid + "')";
                    var item = window.tempDictionary[window.MI_defaults.template].socialItem.nonTimelineItem;
                    item = item.replace(/@@@itemImageURL/g, data.itemImageURL)
                    var si = window.tempDictionary[window.MI_defaults.template].socialItem.lightboxVimeoItem;
                    data.modsi = si.replace(/@@@itemDate/g, data.itemDate)
                        .replace(/@@@click/g, click)
                        .replace(/@@@itemImageURL/g, data.itemImageURL)
                        .replace(/@@@itemPublisher/g, (data.itemPublisher.length > 18 ? data.itemPublisher.substring(0, 17) + '...' : data.itemPublisher))
                        .replace(/@@@ksid/g, data.ksid)
                        .replace(/@@@timeAgo/g, data.timeAgo)
                        .replace(/@@@sourceURL/g, data.sourceURL.replace('vimeo.com/', 'player.vimeo.com/video/'))
                        .replace(/@@@sourceAvatar/g, item)
                        .replace(/@@@itemContentImageURL/g, data.itemContentImageURL)
                        .replace(/@@@itemText/g, data.moditemText)
                        .replace(/@@@itemWidth/g, (typeof data.itemTimeLine != 'undefined' ? '250' : '275') + 'px')
                        .replace(/@@@sourceSite/g, (data.source.replace('.com', '').replace('www.', '').replace('.', '').replace('.', '')).trim())

                },
                DEFAULT: {
                    panelLayout: {
                        header: ["tabs"],
                        content: ["stars", "photos", "tags", "mentions"],
                        footer: ["share"]
                    },
                    panel: {
                        videoholder: '<div id="mi_videoholder_@@@baseid" class="mi_singlevideocontainer mi_closeTopLeft" onclick="jQuery.MidasInsight.MI_GetPhotos(\'@@@baseid\',false)"><div class="mi_singlevideo"></div></div>',
                        containerHtml: '<div style="padding:5px;" class="mi_panelBackground mikfpanel" id="cpcnt_@@@kfid" style="direction: ltr;@@@layout"></div>',
                        tabs: '<tr><td><div class="MI_tabs@@@orientation" style="margin-left:-3px!important;display:inline-block;width:100%;padding-top:10px;">@@@tabs</div></td></tr>',
                        gauge: '<div class="mi_gradeselectgradbg"></div><div class="mi_gradeselectmasknerrow' + (window.MI_defaults.RTL == 'true' ? ' mi_gradeselectmasknerrow_right' : '') + '"></div><div class="mi_gradeselecthandlenerrow"></div><div class="mi_gradeselectdigitsnerrow"  ' + (window.MI_defaults.RTL == 'true' ? 'style="direction:ltr!important;"' : 'style="direction:ltr;"') + '><span style="font-size: 48px;z-index: 3;color: #92c83e;font-family: \'Source Sans Pro\', Alef!important;"></span><span class="mi_gradeselectdigitsnerrow_after">/ 100</span></div><div class="mi_gradeselecttext"></div>',
                        tag: '<span onclick="jQuery.MidasInsight.tagClicked(\'@@@kfid\',\'@@@atags\')" class=\'mi_tag_@@@atagsreplace mi_tag\'>@@@atagscap <span style="display:;color:@@@color;-webkit-font-smoothing: antialiased;padding: 0;margin-bottom: 0;margin-left: 0;margin-top: 3px;text-shadow: @@@color 0 0 0.3px,1px 1px 1px white;background-color: transparent;line-height: 10px;nobox-shadow:inset 1px 1px 2px -1px lightslategray;padding: 0px 2px 1px 3px;border-radius: 50%;left: 4px;position: relative;">&#9733;</span></span>',
                        slidercontainer: '<div id="mi_previewPhotosContainer_@@@kfid" style="max-width: 465px;cursor:default;-moz-user-select:none;-webkit-user-select:none; -ms-user-select:none; user-select:none;" unselectable="on" onselectstart="return false;"><table class="mi_previewPhotosContainer" style="" cellspacing="0" onclick="jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false)"><tr>',
                        photopreview: '<tr ><td id="mi_photopreview_@@@kfid" colspan="2" style="width:100%;overflow:hidden;background-color:white;padding:5px 0 !important;border-bottom: 1px solid #DBDBDB !important;"><div class="mi_thumbscontainer">',
                        tabswrapper: {
                            header: '<div style="width: 152px;margin: 0 auto;background: #fefefe; /* Old browsers */background: -moz-linear-gradient(top,  #fefefe 0%, #eeeeee 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fefefe), color-stop(100%,#eeeeee)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* IE10+ */background: linear-gradient(to bottom,  #fefefe 0%,#eeeeee 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#fefefe\', endColorstr=\'#eeeeee\',GradientType=0 ); /* IE6-9 */-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;border: 1px solid #cbcbcb;padding: 5px;">',
                            footer: '</div>'
                        },
                        starspanel: {
                            header: '<tr><td><div class="mi_hover_starspanel" style="border-bottom: 1px solid #dfdfdf !important;padding-bottom:5px;width:100%;overflow:hidden;border-top:1px solid #dfdfdf;padding-top:5px;background: #f7f7f7; /* Old browsers */background: -moz-linear-gradient(top,  #f7f7f7 0%, #ffffff 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(100%,#ffffff)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* IE10+ */background: linear-gradient(to bottom,  #f7f7f7 0%,#ffffff 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f7f7f7\', endColorstr=\'#ffffff\',GradientType=0 ); /* IE6-9 */width: 396px;left: 0px;position: relative;"><table style="position:relative">',
                            footer: '</tr></table></div></td></tr>'
                        },
                        footer: {
                            header: '<div class="mi_footerwrapper"><div class="mi_footerroot mi_footerroot_@@@kfid" style="background-image: url(//d34p6saz4aff9q.cloudfront.net/images/footer/feelterfooternew.png);background-position: -120px 0px;background-repeat: no-repeat;"><div class="mi_footercontainer" id="mi_footercontainer_@@@kfid" style="height:100%;position:static;">' +
                                '<div class="mi_footer" style="height:auto;"><div onclick="jQuery(\'#cpcnt_@@@kfid\').find(\'.MI_tab_selected\').removeClass(\'MI_tab_selected\');jQuery(\'#mipct_scroll_@@@kfid\').addClass(\'mi_blured\');jQuery(\'#mipct_tblabout_@@@kfid\').css(\'max-height\',jQuery(\'#mipct_scroll_@@@kfid\').height()+1).css(\'height\',jQuery(\'#mipct_scroll_@@@kfid\').height()+1).css(\'top\',jQuery(\'#mipct_scroll_@@@kfid\').position().top).fadeIn();" style="z-index: 1;position: absolute;right: 0px;top: 5px;height: 25px;width:57px;background-size: contain;cursor: pointer;background-image: url(\'@@@logo\');background-repeat: no-repeat;"></div></div>',
                            share: '<div style="width: 100%;float:left;"><div class="mi_footer_prompt" style="margin-bottom:0;">@@@ask</div>' +
                                '<ul class="mi_share-buttons"><li><a onclick="window.MI_logUsage(\'mail\');" href="mailto:?subject={1}&body={2}: {0}" target="_blank" title="Email"><img onload="this.style.opacity=1;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Email.png" style="opacity:0;" style="opacity:0"></a></li><li><a onclick="window.MI_logUsage(\'share\');" href="https://www.facebook.com/sharer/sharer.php?u={0}" target="_blank"><img onload="this.style.opacity=1;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Facebook.png" style="opacity:0;"></a></li><li><a onclick="window.MI_logUsage(\'share\');" href="https://twitter.com/intent/tweet?source={0}&text={1}: {0}" target="_blank" title="Tweet"><img onload="this.style.opacity=1;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Twitter.png" style="opacity:0"></a></li><li style="display:none;"><a onclick="window.MI_logUsage(\'share\');" href="http://pinterest.com/pin/create/button/?url={0}&description={2}" target="_blank" title="Pin it"><img onload="this.style.opacity=1;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Pinterest.png"></a></li><li><a onclick="window.MI_logUsage(\'share\');" href="https://plus.google.com/share?url={0}" target="_blank" title="Share on Google+"><img onload="this.style.opacity=1;this.style.top=0;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Googleplus.png" style="opacity:0;"></a></li></ul></div>',
                            callForActions: '<div id="cfa" style="white-space:nowrap;padding-left:0;display:inline-block;"><div onclick="alert(\'call to add to favorites\')" style="cursor:pointer;border-radius: 7px;height: 27px;width: 187px;margin:5px;MARGIN-LEFT:0;display: inline-block;text-align: center;box-shadow: inset 0 -9px 37px -10px silver;vertical-align: middle;padding-top: 8px;border: 1px solid rgba(0,0,0,0.2);color: grey;">Add to favorites</div><div onclick="alert(\'call to book\')" style="cursor:pointer;border-radius: 7px;height: 27px;width: 187px;margin:5px;display: inline-block;text-align: center;box-shadow: inset 0 -9px 37px -10px rgb(3, 179, 12);vertical-align: middle;padding-top: 8px;border: 1px solid rgba(0,0,0,0.2);color: white;margin-left: 1px;background-color: rgb(161, 218, 101);">BOOK</div></div>'
                        },
                        header: {
                            header: '<table align="left" class="mi_reset mi_greenredtitle">' +
                                '<div class="mi_green_close @@@orientation" onclick="jQuery.MidasInsight.hidePanel(\'@@@kfid\');" style="z-index:3;"></div>' +
                                '<tr><td class="mi_header_caption@@@gaugeOrientation>' +
                                '<div class="mi_drag_area" style="position: absolute;width: 100%;height: 60px;left:0;z-index: 2"></div>' +
                                '<div class="mi_gradselectroot @@@gaugeOrientation" id="mi_gradselectroot_@@@kfid" data-score="@@@grade" style="z-idex:1;"><div class="mi_gradeselect" id="mi_gradeselect_@@@kfid"></div></div>' +
                                '<div class="mi_title" style="@@@titleOrientation">@@@displayText</div>' +
                                '<div style="@@@optionsrtl" class="mi_subtitle">@@@count</div></td></tr>'
                                /*if (count > 4) {
                                     p += '<div style="' + (options.RTL == 'true' ? '' : '') + '" class="mi_subtitle ' + (options.RTL == 'true' ? 'mi_subtitle_rtl' : '') + '">' + window.langDictionary[window.MI_defaults.lang].basedon.replace('%d', count);
                                     p += '</div>';
                                 */
                                // tools tabs
                                +
                                '<div style="clear:both;height:0px;margin-bottom:0px;border-top:0px solid #DBDBDB!important;"></div>',
                            footer: '</table>'
                        }

                        ,
                        closebutton: '<div class="mi_green_close@@@gaugeOrientation" onclick="jQuery.MidasInsight.hidePanel(\'@@@kfid\');"></div>'
                    }

                    ,
                    scrollables: {
                        header: '<div style="clear:both;height: px;margin-bottom:0px;border-top:1px solid #DBDBDB"></div><div id="mipct_scroll_@@@kfid" tabindex="-1" style="heightdummy:0;outline:none;" class="mi_scroll">' +
                            '<table align="left" id="mipct_tbldefault_@@@kfid" class="mi_results mi_scrolledcontent">',
                        footer: '</table></div>'
                    },
                    socialItem: {
                        timelineItem: '<div class="mi_timeline">@@@fullYear<br/>@@@month<br/>@@@date</div>',
                        nonTimelineItem: '<img onerror="jQuery.MidasInsight.HandleMissingImage(\'avatar\',this)" src="@@@itemImageURL" valign="top" class="mi_resultimage"/>',
                        youtubeItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"><img src="https://i.ytimg.com/vi/@@@sourceURL/mqdefault.jpg" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  onclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div>' +
                            '</td></tr></table></div>',
                        lightboxYoutubeItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"><div id="#mi_image_lightbox_@@@ksid" onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();"><img src="https://i.ytimg.com/vi/@@@sourceURL/mqdefault.jpg" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  onclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div><div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery.MidasInsight.StopYoutubeVideo(jQuery(\'#mi_image_lightbox_@@@ksid iframe\')[0]);jQuery(this).fadeOut();"><iframe width="560" height="315" src="https://www.youtube.com/embed/@@@youtubeid?enablejsapi=1" frameborder="0" allowfullscreen></iframe></a></div>' +
                            '</td></tr></table></div>',
                        lightboxVimeoItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"><div id="#mi_image_lightbox_@@@ksid" onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'src\',jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'data-src\'));"><img src="@@@itemContentImageURL" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;nbox-shadow: 0px 0 10px 4px #eee;float: right!important;border-radius: 2px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  nonclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div><div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'src\',\'\');jQuery(this).fadeOut();"><iframe  id="mi_iframe_lightbox_@@@ksid" data-src="@@@sourceURL?autoplay=1&title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></a></div>' +
                            '</td></tr></table></div>',
                        normalItem: '<div style="position:relative;">@@@metaicon<table align="left" class="mi_resultcontainer" @@@cond onclick="@@@click"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display:block;">' +
                            '@@@item' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itempublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeago' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"><div class="mi_resulttext">@@@itemtext</div>',
                        instagramItem: '<div style="position:relative;">@@@metaicon<table align="left" class="mi_resultcontainer" @@@cond onclick="@@@click"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display:block;">' +
                            '@@@item' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itempublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeago' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;">'

                        ,
                        itemContentImage: '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;"><img onload="if (!jQuery.MidasInsight.imageIsGood(this)) jQuery.MidasInsight.HandleMissingImage(\'preview\',this);" onerror="jQuery.MidasInsight.HandleMissingImage(\'preview\',this);" src="@@@itemcontentimage" style="max-width: 275px;margin-top: 0px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;"/></div>',
                        lightboxContentImage: '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;"><div id="#mi_image_lightbox_@@@ksid" onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();"><img src="@@@itemcontentimage" style="max-width: 275px;margin-top: 0px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;"></div><div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery(this).fadeOut();"><img src="@@@itemcontentimage" style="box-shadow: 0px 0 10px 4px #eee;border-radius: 5px;" onload="jQuery(this).css(\'position\', \'relative\').css(\'top\',\'50%\').css(\'margin-top\',((this.height/2)*-1)+ \'px\').css(\'top\',\'50%\',\'!important\');"/></div></div>'

                    }
                },
                MODERN: {
                    panelLayout: {
                        header: ["tabs", "stars"],
                        content: ["tags", "mentions"],
                        footer: ["photos", "callForActions", "share"]
                    },
                    panel: {
                        videoholder: '<div id="mi_videoholder_@@@baseid" class="mi_singlevideocontainer mi_closeTopLeft" onclick="jQuery.MidasInsight.MI_GetPhotos(\'@@@baseid\',false)" style="margin-top: 74px;background-position: 10px 18px;"><div class="mi_singlevideo"></div></div>',
                        containerHtml: '<div style="padding:5px;margin-top:25px;border: 1px solid #ccc !important;" class="mi_panelBackground mikfpanel" id="cpcnt_@@@kfid" style="direction: ltr;margin-top: 20px;@@@layout"></div>',
                        tabs: '<tr><td><div class="MI_tabs@@@orientation" style="margin-left:-10px !important;position:relative;z-index:30;box-shadow:none;left:0px;padding-top: 0 !important;">@@@tabs</div></td></tr>',
                        gauge: '<div class="mi_gradeselectgradbg"></div><div class="mi_gradeselectmasknerrow' + (window.MI_defaults.RTL == 'true' ? ' mi_gradeselectmasknerrow_right' : '') + '" style="background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAABQCAYAAADFuSFAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyODYzNTRkZS04NWY4LTg3NDEtYjNmOS02OGU4NGQzZjVjODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM0QjUyMzEwQ0ZBMTFFNTlCQjg4NzExODFEM0Q0M0QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM0QjUyMzAwQ0ZBMTFFNTlCQjg4NzExODFEM0Q0M0QiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDVFOTA3RTFFN0Y4MTFFNDkzNjJGQzdDNUEyRDA1MTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDVFOTA3RTJFN0Y4MTFFNDkzNjJGQzdDNUEyRDA1MTYiLz4gPC9yZGY6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\/PWEz++jGvqdq7pHoDCVavcQCihRplNndC+x+\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\');width:100%;background-repeat: no-repeat;background-position: 15px 6px;"></div><div class="mi_gradeselecthandlenerrow"></div><div class="mi_gradeselectdigitsnerrow"  ' + (window.MI_defaults.RTL == 'true' ? 'style="direction:ltr!important;"' : 'style="direction:ltr;  LEFT: -4PX;TOP: 30PX;"') + '><span style="font-size: 43px;z-index: 3;color: #92c83e;font-family: \'Source Sans Pro\', Alef!important;"></span></div><div class="mi_gradeselecttext" ' + (window.MI_defaults.RTL == 'true' ? 'style="top:77px;direction:rtl;color:#b8b8b8;"' : 'style="top:77px;direction:ltr;color:#b8b8b8;"') + '></div>',
                        starspanel: {
                            header: '<tr><td><div class="mi_hover_starspanel" style="border-bottom: 1px solid #dfdfdf !important;padding-bottom:5px;width:387px;;overflow:hidden;border-top:1px solid #dfdfdf;  padding-top: 20px;margin-top: -17px;background: #f7f7f7; /* Old browsers */background: -moz-linear-gradient(top,  #f7f7f7 0%, #ffffff 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(100%,#ffffff)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* IE10+ */background: linear-gradient(to bottom,  #f7f7f7 0%,#ffffff 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f7f7f7\', endColorstr=\'#ffffff\',GradientType=0 ); /* IE6-9 */width: 396px;left: -5px;position: relative;"><table style="position:relative">',
                            footer: '</tr></table></div></td></tr>'
                        },
                        tag: '<span onclick="jQuery.MidasInsight.tagClicked(\'@@@kfid\',\'@@@atags\')" class="mi_tag_@@@atagsreplace mi_tag">@@@atagscap</span>',
                        slidercontainer: '<div id="mi_previewPhotosContainer_@@@kfid" style="height:65px;cursor:default;-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;" unselectable="on" onselectstart="return false;"><table class="mi_previewPhotosContainer" style="" cellspacing="0"><tr>',
                        photopreview: '<tr ><td id="mi_photopreview_@@@kfid" onclick="jQuery(\'.mi_thumbscontainer\').hide();jQuery.MidasInsight.resize(\'@@@kfid\');jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false);" colspan="2" style="width: 100%;overflow: hidden;background-color:white;"><div class="mi_thumbscontainer" style="margin:0 auto;overflow:hidden;width:386px;padding-top: 3px;border-top: 1px solid rgba(0,0,0,0.2);">',
                        tabswrapper: {
                            header: '<div style="width: 152px;margin: 0 auto;background: #fefefe; /* Old browsers */background: -moz-linear-gradient(top,  #fefefe 0%, #eeeeee 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fefefe), color-stop(100%,#eeeeee)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* IE10+ */background: linear-gradient(to bottom,  #fefefe 0%,#eeeeee 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#fefefe\', endColorstr=\'#eeeeee\',GradientType=0 ); /* IE6-9 */-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;border: 1px solid #cbcbcb;padding: 5px;">',
                            footer: '</div>'
                        },
                        footer: {
                            header: '<div class="mi_footerwrapper" style="background-color:#fff;"><div class="mi_footerroot" style="top:2px;"><div class="mi_footercontainer" id="mi_footercontainer_@@@kfid" style="height:100%;position:static;">' +
                                '<div class="mi_footer" style="background-image:none;height:auto;margin-top:2px;"><div onclick="jQuery(\'#cpcnt_@@@kfid\').find(\'.MI_tab_selected\').removeClass(\'MI_tab_selected\');jQuery(\'#mipct_scroll_@@@kfid\').addClass(\'mi_blured\');jQuery(\'#mipct_tblabout_@@@kfid\').css(\'max-height\',jQuery(\'#mipct_scroll_@@@kfid\').height()+1).css(\'height\',jQuery(\'#mipct_scroll_@@@kfid\').height()+1).css(\'top\',jQuery(\'#mipct_scroll_@@@kfid\').position().top).fadeIn();" style="z-index: 1;position: absolute;right: 0px;top: 5px;height: 25px;width: 65px;cursor: pointer;"></div>',
                            share: '<div class="mi_footer_prompt" style="color:#59a3e8;top:auto;border-top:none;position:static;float:left;margin-bottom:0;padding: 7px;">@@@ask</div>' +
                                '<div><ul class="mi_share-buttons" style="padding:0;margin: -5px 0 0 0;"><li><a onclick="window.MI_logUsage(\'mail\');" href="mailto:?subject={1}&body={2}: {0}" target="_blank" title="Email" ><div style="background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAxCAYAAAAm0WAHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQxOTgzOUY2RjMxMjExRTQ4RDc1QkNENzc1ODE3OTkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxOTgzOUY3RjMxMjExRTQ4RDc1QkNENzc1ODE3OTkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDE5ODM5RjRGMzEyMTFFNDhENzVCQ0Q3NzU4MTc5OTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDE5ODM5RjVGMzEyMTFFNDhENzVCQ0Q3NzU4MTc5OTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SFpoiAAAe+klEQVR42uxd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\/\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\/\/FjFYF1Gm5hd1eXFnRDYcjCGL1XPW3TTDhdptg+41432SUjIul6IXuRkeS2ymARjCh9249SaWVMzf5n190/bt263xzOVo8Jnq6urJfIIkW1A4Ho+tZXErcubMGVrXW+nGC2jKD0v3d3Cb36ObrKysTD1fCSFrC2qy/qOYbIewHOnkuqikWr7TVMU5VbuK+9TafE5cRzWl/UdgtViK4MDThTI+ZObrdw+fq8wmYF1dXcTwNDA8gOO2bOWLtOMFwPBCVVXVfPPpdKuiU2h2tyRUDY70JbQsPDEy43zJmGbMACyd6lQYXU7bEEU3+NCLsb0Hp56x/javgFksGDcfGvkm3MsPEAO46Gom+tF78/F5uBRqTT9ikgf5KgAZXGCYb+K1AfsTCPQvq62tVc9VcvLZbtPVkiJOc+04lZCP2hMqM+4M6WoRYiSRWtNGYfTCopVxWUuJXSUenIFYhmy30mc3VoOOCMNuxC2fhyXaOcKhuMnpdPIVCNXp7zOzyeDDHPYiajvDASYrusU7IHGS06dPM/b6CfjwA9DQk0/AnDm0J4xGfwGmzoHEfpUdmA9STISQmYwhKPSfBB2PgoZnOJUygjZO4Df347dPtbe3n8P2iIHkMzOtZTJR6YGguFWpoq1Pk+5wqhCsBAwxGWclWDDmNFdNqU0FwbECp1qsGNA/p+G+OwrhYhuvIWv7KcbhH7jExypkulFvTGj6uPKBGSMwMMHiE+kPpwtXQTFYpjccYuODnz+FJbuZrobgxtuSWbW+o6ODQeUvcfxdyfLkSq52jPeArcX+nwiUF/HdYOkYzBeIOGzD40sz/afAJfXClcuKAYJxClr/XUNBRjtwfKvO34MP94EP7onkgylcwMDnH+5Gn/sz3T+qNxyyrolGNyNgnhwOh5cYS31lvN4GbQaS9PVnz57VAeoJnPt7kjeatoyN8307YQWWA0NdJgymENEaxJODu3qCXRtZjSkNw1Fo/UMQrl+NYhZqyLQf2t0KPtiAYSVLccRQrCePsmFgWQgKQuH6Hdzifbi0L9tvRvUCOouQbeLMLKzJMq6DZwGT67GL5TJNbeEcHJhC5rDSzfce/HCkliu9TWM7Dma8DwgzwaDZXGYyXhiYxnd2dpI52yHU30G/L4xRuAbCFrT/HjCcRR9LgIGPvg0Uk4vNB2IAH5LAwJrdg7j8Ua7fZhKwQlyktXMu72Vq+hC0ZyHNNIP/sQC0/BMEVVuhSwG4D3Dqh7jG6aDoWAcr7S3PM+Euv4FzX+fbbkh/sTCwum1gYMzIV7L/GNd25coSR4mLHfKR/e+53e6LjZfCFI0PnALibhRS/xXXnkabXfleLT+qt0xnIgK/WYj9SzCZdwJUJV9MxuCZxcCRmGxmfdQUBsH082BQB7Tzv1kjwr5vrAzJ8Z58L74zLvtr0Hud8Z4FtY8GAy0W6ecOwdrEeA9tvIZ+OtNDiWJaGbTViL5uQ1/3AMP00fLBXJ1i4QPXETE0edScMSnkv68UU8BMa8bnEm8GmNshbNNprhkXcKc2cerGePonNW+WTKqdmk7B4s6VDzh3FANFoXoB+15arYn4Rwz4rMXplej7Kzj+DOj15cJgrvfPgIGzC2/jGpOR9diPpTNlnARMhTn4nIv9OtD5BT7bCgy2QvnA+Vpi4Hec6wCGZ3HL07h/t/WB4I9DwAbe3IdTdSBsOY6vBJiLcW6m8fiV3TDnqRpfatOMyVz+v5+3AeR3OOZrMVtwLTaR/6vIgmMSdi4VvxC3XY1ra3C+3KA/HYNmYOC6+R3Y1+P773HL0fTi6QQJmNkPJ2Lr6V1A0xXgwyXAMZ/JgIkjnQ9cbo6dxeuNOM\/\/ScAXLXPZeSgTHz4uAbMOng/HXE1ayocx+dJeptec8pDU/yGiyziN6yf50hJqCJerZPqnThMsYNY+y7EHQHsljqfzhTDY+Tic01i7dQa/Pc5/imX8Iy9OricyZdUTLGAD10C7h3zAJ/8tDstMdVQigw9cHtTNN0TyH5MZfOET2aH08S+6gH2yfbIVe7N/MgSfbOO5/b8AAwDCB5vdkkgX5QAAAABJRU5ErkJggg==\');height:50px;width:50px;height: 30px;width: 30px;background-size: cover;"></div></a></li><li><a onclick="window.MI_logUsage(\'share\');" href="https://www.facebook.com/sharer/sharer.php?u={0}" target="_blank"><div style="background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAxCAYAAAAm0WAHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQxOTgzOUY2RjMxMjExRTQ4RDc1QkNENzc1ODE3OTkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxOTgzOUY3RjMxMjExRTQ4RDc1QkNENzc1ODE3OTkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDE5ODM5RjRGMzEyMTFFNDhENzVCQ0Q3NzU4MTc5OTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDE5ODM5RjVGMzEyMTFFNDhENzVCQ0Q3NzU4MTc5OTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SFpoiAAAe+klEQVR42uxd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\/\/PK9kMrSbljqk8VTXco1mN7BBatFq7D+QFTFN0chSLMnO+VrF5XIKiQLnI5IJvShZl8yL9E1HxFLx2usuc++ckIXpbkeIKfL4ACrgq6mDyvnaSpDTglWphmDTPFOBFaRicH0SqcS3lSJJesaL7al57iWsS8zGB8I+DO4SM2oj3qAzS5G/Qs301oRuypT2AdDn3QXaY2mc61CyTfHmy5g0Uzzdrkmrsx5vGAkRXwSVusP+yJyEqn6ZfM8CJ5dSkOoMSdhnpmhvXUgBvekpSrnyZSgaiMMLw1gYWiQZtGm7tSl7KAZHzZCqJlB7mtLyHEEv+fDrUcThc1H5qpLcWOdie5odaNDJRKRHOOPsSb9fB5Rs1gsUhEc6+Q8kyN6hgeuKMV3kRcRxrwJL3PFfJ9cPNej3CdrYH53brdfCB8gfFp6qSWbgJ1F0Dw1mwXTDYdnBn4UEPr0p97rV8Q3Iru8cblP1X5e2R2Vx99NyHSk9XQVtBDtfRqELCFN1S65a3lATnQl4CYj8rO3+qQDTPn0Io/YHdYAdlB70unhxDHOdZiuxdhO4RiXEp5sWsfBXoyMsRF0UQleQPxXD0aw7hVL6mOIRVIxDyeKWbicCyFOJHOvP4vH43zouAPuXrNkkUk+m2jgy27BRB9mXay3MoxhnNs02aESqXJvyv1PRgjSUO2QZCylUPQaVlnW9YEOhpRBsuEw6AwWNFXEJ5ZjsdiSfOumbEbB8gAG88nNIVilmIpnvnp+iayc7kJ84wYT3bLlWCoTY7bmQk91yGDWLSxRvn9BrVOCUU1lZ89s6Zcn3w3id0m5bZU/tdjNlnv5DuikBTjEOWvLpZPUpmg0qmb8syUpLIMwAGe8yFiQmfBnkWAsgUtn/W00QkYX1BVKygbEN9WIPxfVOYdljukY+PAxMVjdJBWE54AhHggEXGOxYsQaBdtpnc0QQK2KwHE0UZxlChxr0HwcAhYrZC5ydyQSuTbjsl5LKMH0t/lYXH6+MSh7WlKlhS+fnypTROD6/DC9a2e7laXoDSNjM6YmGOtUBexqro7BMj9vXOZV2vX45n55dms/rIDIJXPdMiBjWSwYmBODtvOJo6jFRfbgHJ+8Ls2lJJxbpCJMRdx4HFasq19TlX1+MnUXfWTuWtWRgHHnqbicgNBevcgLF2xTFizXBgwY8uQxa80O1owW+QCfuq6srKzIVM/T9KGBWK5C60DxNBWh5i07DJQp0mOyLPdjrGl19+B6uBAXuQWgdfOJkvRGecQ4i1pKd3cAMcxVC7xy+7l+aZjkUFqhG1NHtPi0FFUB54AxMk0yA+FUPKQLQgBZt8AjpRCyRzemSh5MrZkMpJYAZ9Z+AsMnH0BIWgQsAtqbgaEhG4bBbFaXOTUO+eCUDZZUpB7WlcJvzzTfkbdYbJMzQU1+i2yatTTGnvmsIOmCe+k03Et6XLODlsHE8Oe6kT5DwLZAMfozKl8a6A8Aupc/ylg9hwXyu+yy9XhcWnqScstKn9x5AYUrVbAbmJowxovBI4UuYuyxZMrvWx8w4M9soOKi2R759uUlMhtWcA9c7xFkorR43PW0tJj0gc4OfD+YRiJBvoJrejYMZo2Ifa+b75U5iFE4pfPs9rDK/sSWecVqVuFypDC+sjuirOHaOR4V32l56mWwUP2gc2P6unZDIfhiksNQlD9b4TL5gDiSL1N5L1s2nG7BOgD6j729vbcwhrH+htXsmZWs/tqktVeT21ZyysEnlbBSsYQ+ptUUKnEF05c3kByfPLIhJPtOp+Ygp1Zwykgb0j7oI7AXQd+ZdMMA4OvhdoJ9fX2l6RhMd0Y3zCyrxCPIqjzS2qOpeJFTJ5fNc8vKBrfUoV9bAcLFrJRZMS3vPMSV1yz2FrR0pgcbxvoVaH44A/P6cO03wLkUGBxZyxTGilnl8vK4SEmbu8zlIjV9cA2YnqNMgTGmom8ChmMFlSlwYwia8zyU6xYG0VyPPxi36LKswaUCdGor59nKfVz3ZBdt5FNYGQugyaRNdiGmO9mlKcE6f5YLbtY+JCCFYFH7MQb6y+lm2RiEVmB4PRQK3ZyOIbXkSIMwRGUfkg9mWcz8QrHUylYG/a8i+w3h3LUQlDKvLaOgcOxdYDtjy42HYvKLTf0yyW+XL6724dOWmt/MsYEuWtiDoPdguns0jhPA8Cos2IPAyzV6GRXFLLuYa+Y1vVjWKf9yHYMPdI/P53ri25lBe97hGiUo2HI+MDGwDBkfrJvctNyrhG0rsq+nt4SVYGWLlUa06YPpPoX22nM8EDD3gOs1Bx90kUF/wvftGaZelGKB5sdwz024127FQIFaD2vz8q6IKrFU+FMumJaSrn9erUPOQ5+z4Ta5uiOdYTbDatG2dSJ5eXM/51DDShDvutCvLFhCyz0WxNDd3c1XVz2e7QFW476DuOcl3Ht7TU3NsCC/BmNEBW8+GZfVjW6ZVZVaGZLeOcs+g0XVVIXfxvqXnrk8wGp/byQpp7oT6t4y7/CsmhjoRRAnHsfhG0YdrGABa4FU/gwN/E9JSYmd728wGcSK9pRSm9xzoU+aT7hkd2tqhr4YT64bz0go4Vo1wyVN1Y4hD2OYPh90xeECH8v1CDvu3QYMr+De60pLS8VcvmOT1FQPk4wyn8j8WlhkZJOzqp3YHcoqMXZin0kzqzPW4qeWU3PBnq5mIF7eFZUtULKZlU758nleWTrNOWTWIlfcEgwG94O+N1n/ynFvL+55FBg+y1dKDeWDLrNB7/kQrF83h+WRt0Jy1UKPGrt0Z8KMn5a2I0j8NlX7238iJuFEZstMvHtPJ2TbibjUBFLlloQ2GKJY+ED3+HNgOJLTGlpN77Zt2wYmjXH+ibKysqvr6uqGLX2xWwL58djMLNkKiv23tbVR+5/H8b043ZZlftLcLsIAvMQnoadMmTIgJKzeP9eccvEUtIUYwAua3DIPGSWX5tBKp6ZSbErAqVRh3McFe5ycf/9YXK20YN3rXM7lLfPITFiPpJ57wtjE0Nra2gfm3IvjpwoILPhik38qLy\/\/FjFYF1Gm5hd1eXFnRDYcjCGL1XPW3TTDhdptg+41432SUjIul6IXuRkeS2ymARjCh9249SaWVMzf5n190/bt263xzOVo8Jnq6urJfIIkW1A4Ho+tZXErcubMGVrXW+nGC2jKD0v3d3Cb36ObrKysTD1fCSFrC2qy/qOYbIewHOnkuqikWr7TVMU5VbuK+9TafE5cRzWl/UdgtViK4MDThTI+ZObrdw+fq8wmYF1dXcTwNDA8gOO2bOWLtOMFwPBCVVXVfPPpdKuiU2h2tyRUDY70JbQsPDEy43zJmGbMACyd6lQYXU7bEEU3+NCLsb0Hp56x/javgFksGDcfGvkm3MsPEAO46Gom+tF78/F5uBRqTT9ikgf5KgAZXGCYb+K1AfsTCPQvq62tVc9VcvLZbtPVkiJOc+04lZCP2hMqM+4M6WoRYiSRWtNGYfTCopVxWUuJXSUenIFYhmy30mc3VoOOCMNuxC2fhyXaOcKhuMnpdPIVCNXp7zOzyeDDHPYiajvDASYrusU7IHGS06dPM/b6CfjwA9DQk0/AnDm0J4xGfwGmzoHEfpUdmA9STISQmYwhKPSfBB2PgoZnOJUygjZO4Df347dPtbe3n8P2iIHkMzOtZTJR6YGguFWpoq1Pk+5wqhCsBAwxGWclWDDmNFdNqU0FwbECp1qsGNA/p+G+OwrhYhuvIWv7KcbhH7jExypkulFvTGj6uPKBGSMwMMHiE+kPpwtXQTFYpjccYuODnz+FJbuZrobgxtuSWbW+o6ODQeUvcfxdyfLkSq52jPeArcX+nwiUF/HdYOkYzBeIOGzD40sz/afAJfXClcuKAYJxClr/XUNBRjtwfKvO34MP94EP7onkgylcwMDnH+5Gn/sz3T+qNxyyrolGNyNgnhwOh5cYS31lvN4GbQaS9PVnz57VAeoJnPt7kjeatoyN8307YQWWA0NdJgymENEaxJODu3qCXRtZjSkNw1Fo/UMQrl+NYhZqyLQf2t0KPtiAYSVLccRQrCePsmFgWQgKQuH6Hdzifbi0L9tvRvUCOouQbeLMLKzJMq6DZwGT67GL5TJNbeEcHJhC5rDSzfce/HCkliu9TWM7Dma8DwgzwaDZXGYyXhiYxnd2dpI52yHU30G/L4xRuAbCFrT/HjCcRR9LgIGPvg0Uk4vNB2IAH5LAwJrdg7j8Ua7fZhKwQlyktXMu72Vq+hC0ZyHNNIP/sQC0/BMEVVuhSwG4D3Dqh7jG6aDoWAcr7S3PM+Euv4FzX+fbbkh/sTCwum1gYMzIV7L/GNd25coSR4mLHfKR/e+53e6LjZfCFI0PnALibhRS/xXXnkabXfleLT+qt0xnIgK/WYj9SzCZdwJUJV9MxuCZxcCRmGxmfdQUBsH082BQB7Tzv1kjwr5vrAzJ8Z58L74zLvtr0Hud8Z4FtY8GAy0W6ecOwdrEeA9tvIZ+OtNDiWJaGbTViL5uQ1/3AMP00fLBXJ1i4QPXETE0edScMSnkv68UU8BMa8bnEm8GmNshbNNprhkXcKc2cerGePonNW+WTKqdmk7B4s6VDzh3FANFoXoB+15arYn4Rwz4rMXplej7Kzj+DOj15cJgrvfPgIGzC2/jGpOR9diPpTNlnARMhTn4nIv9OtD5BT7bCgy2QvnA+Vpi4Hec6wCGZ3HL07h/t/WB4I9DwAbe3IdTdSBsOY6vBJiLcW6m8fiV3TDnqRpfatOMyVz+v5+3AeR3OOZrMVtwLTaR/6vIgmMSdi4VvxC3XY1ra3C+3KA/HYNmYOC6+R3Y1+P773HL0fTi6QQJmNkPJ2Lr6V1A0xXgwyXAMZ/JgIkjnQ9cbo6dxeuNOM\/\/ScAXLXPZeSgTHz4uAbMOng/HXE1ayocx+dJeptec8pDU/yGiyziN6yf50hJqCJerZPqnThMsYNY+y7EHQHsljqfzhTDY+Tic01i7dQa/Pc5/imX8Iy9OricyZdUTLGAD10C7h3zAJ/8tDstMdVQigw9cHtTNN0TyH5MZfOET2aH08S+6gH2yfbIVe7N/MgSfbOO5/b8AAwDCB5vdkkgX5QAAAABJRU5ErkJggg==\');height:50px;width:50px;height: 30px;width: 30px;background-size: cover;background-position-x: 32px;;background-position: 32px;"></div></a></li><li><a onclick="window.MI_logUsage(\'share\');" href="https://twitter.com/intent/tweet?source={0}&text={1}: {0}" target="_blank" title="Tweet"><div style="background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAxCAYAAAAm0WAHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQxOTgzOUY2RjMxMjExRTQ4RDc1QkNENzc1ODE3OTkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxOTgzOUY3RjMxMjExRTQ4RDc1QkNENzc1ODE3OTkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDE5ODM5RjRGMzEyMTFFNDhENzVCQ0Q3NzU4MTc5OTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDE5ODM5RjVGMzEyMTFFNDhENzVCQ0Q3NzU4MTc5OTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SFpoiAAAe+klEQVR42uxd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\/\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\');height:50px;width:50px;height: 30px;width: 30px;background-size: cover;background-position-x: 62px;;background-position: 62px;"></div></a></li><li style="display:none;"><a onclick="window.MI_logUsage(\'share\');" href="http://pinterest.com/pin/create/button/?url={0}&description={2}" target="_blank" title="Pin it"><img onload="this.style.opacity=1;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Pinterest.png" style="opacity:0"></a></li><li><a onclick="window.MI_logUsage(\'share\');" href="https://plus.google.com/share?url={0}" target="_blank" title="Share on Google+"><div style="background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAD4klEQVRIDY1VzW8bVRD/7Xq9teOPtElDHdlupSIFKEqUhH5AI7WNBCeQuHAqlEPpASHgyA3hf4ALHwckGoFAHBGIA5zapoiCEUpCEiGFUlHJTkCyiePEXjter5f5rf2CWTuBkcZvPB+/eW/evFkNB9DKysrpVqt1NRgMpoWPmqYZbzQa27ZtF4Vzuq7PjY+P/3QARK9pYWHh4urq6s2trS2r2Wy6kqCHqaedfsvLyxd7UfpolpaW5jY3N7ccx3H/L5dKpS2Je0/gtD6QnkpbXFyctyzLVqDcHWWu/8XVatVmfF9wZqaDkKuYgJQVsJL3szOeJ1cJvGOwZslk8stYLDaoaRpc120fpSMXKi6+Xqnim18sWLstDEUCuDQWxotPROH3LwttbGw8OzExMa8TRW49Q2DKCljJ9wpNfPhtGU+eCuOtZ44gFtLx+MmQB6x8uJIYG4/HB4nH/zrbLZFInKOhH3/24w6OxXWMCo89YGD2oRBurdWwXXMY37MZ6ohHXF0u7KVIJBKm0k8szh9lB9v1dpmY/NSoCdtxhQFpUQ/890IDdrPlhVNHPL4P3TCMlKpbz87FcSIZxJ17dayXbC94s+rgsROHcHjgn677JFv1EhJYUSAQSBt8eQTdjy6fjcBquPjo+yoSUppyzcXLF6KsB37O28je30Wu1MT17yowDQ3XZiIeFHF1Pmm1Y2q7E1GOmBpen43itdkYbqzVpTuAqNn2G4poePiYgXBQw5isjyQML55xUpG4wVmhAP2rSrZebuFPqX3ysIHbd+vSijounxmQ/wGPF+UEMydNhCSJInkb24Y8iKJS+Ffe0adZC6zkmeMmXrkQwY1fd/HFkoUTR3TMPChHELp2fgBmgN3WPhHvkLiGdEuOF0GFnz7+wcLquo23nxvcGxpXzoZR3HGwLHoFfshoR6qTE4+40u/6XKVSqdHg55truwgEJGnHRgj6JAYDOD7Urq/SdcfKGKgRV+c8LhaLWeWkVjq/8VQUf1UcvHPLwt2C43XF7d8aqNstzI4F6er1uid0/RQKhSxxvecvQBnZfdnv/OhoAJmnY9ipO3jzqx28P1+FIRHPnw4jJKVQfc1VMXGk3hli7RWa0yyVSl2R/uxUkOZ/E0+jHhwtSlb3JaDNfD7/weTk5KuevTtcvkDz6XT6vPS+l8AP1u3rlwmcy+XuTE9PXxKb9yr3dt5x5gfj3ZGRkRdkPuyNX7Wz/ZLJBZalzp9PTU1d7U7qB/dsnW9iZnh4+FwoFArLzXfHeDITyVerJp9ENkOG89vv1BdcOXFscmrKEEoJH+WT5ssTXVE4L7rrB339/wYDDxkPEF5efgAAAABJRU5ErkJggg==\');  background-size: 29px;width:30px;height:30px;background-repeat: no-repeat;"></div></a></li></ul></div>',
                            callForActions: '<tr><td><div id="cfa" style="white-space:nowrap;border-top: solid 1px #c5c5c5 !important;padding-left:0;"><div onclick="alert(\'call to add to favorites\')" style="cursor:pointer;border-radius: 7px;height: 27px;width: 187px;margin:5px;MARGIN-LEFT:0;display: inline-block;text-align: center;box-shadow: inset 0 -9px 37px -10px silver;vertical-align: middle;padding-top: 8px;border: 1px solid rgba(0,0,0,0.2);color: grey;">Add to favorites</div><div onclick="alert(\'call to book\')" style="cursor:pointer;border-radius: 7px;height: 27px;width: 187px;margin:5px;display: inline-block;text-align: center;box-shadow: inset 0 -9px 37px -10px rgb(3, 179, 12);vertical-align: middle;padding-top: 8px;border: 1px solid rgba(0,0,0,0.2);color: white;margin-left: 1px;background-color: rgb(161, 218, 101);">BOOK</div></div></td></tr>'
                        },
                        header: {
                            header: '<table align="left" class="mi_reset mi_greenredtitle"><tr><td class="mi_header_caption@@@gaugeOrientation" style="padding:0 !important;">' +
                                '<div class="mi_drag_area" style="position: absolute;width: 100%;height:125px;left:0;z-index: 2"></div>' +
                                '<div class="mi_green_close@@@gaugeOrientation" onclick="jQuery.MidasInsight.hidePanel(\'@@@kfid\');" style="z-index:3;"></div>'
                                // score gauge
                                +
                                '<div class="mi_gradselectroot @@@gaugeOrientation" id="mi_gradselectroot_@@@kfid" data-score="@@@grade" style="left:123px;top:-48px;"><div class="mi_gradeselect" id="mi_gradeselect_@@@kfid"></div></div>' +
                                '<div class="mi_title" style="@@@titleOrientation;margin-top:40px;width:240px;float: left;height:38px" >@@@displayText</div>' +
                                '<div style="float:left !important;" class="mi_subtitle" >@@@count</div>' +
                                '<div class="mi_preview_images" style="z-index:3;width: 100px;height: 75px;border: 1px solid #ababab;position: absolute;right: 18px;top: 33px;padding: 1px 3px 3px 1px;cursor: pointer; cursor: hand;" onclick="jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false);"><div style="border: 1px solid #ababab;width:100%;height:100%;background-image:url(@@@previewimgsrc);  background-size: cover;"></div></div>'

                            // tools tabs
                                +
                                '<div style="clear:both;height:0px;margin-bottom:0px;border-top:0px solid #DBDBDB!important;"></div>' +
                                '</td></tr>',
                            footer: '</table>'
                        }
                    },
                    scrollables: {
                        header: '<div style="clear:both;height: px;margin-bottom:0px;border-top:1px solid #DBDBDB"></div><div id="mipct_scroll_@@@kfid" tabindex="-1" style="heightdummy:0;outline:none;max-height:auto;" class="mi_scroll">' +
                            '<table align="left" id="mipct_tbldefault_@@@kfid" class="mi_results mi_scrolledcontent">',
                        footer: '</table></div>'
                    },
                    socialItem: {
                        timelineItem: '<div class="mi_timeline">@@@fullYear<br/>@@@month<br/>@@@date</div>',
                        nonTimelineItem: '<img onerror="jQuery.MidasInsight.HandleMissingImage(\'avatar\',this)" src="@@@itemImageURL" valign="top" class="mi_resultimage">',
                        youtubeItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher">@@@itemPublisher<span class="mi_resulttimeago">@@@timeAgo' +
                            '</div></span></th></tr><tr><td style="padding-right:30px;">' +
                            '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"><img src="https://i.ytimg.com/vi/@@@sourceURL/mqdefault.jpg" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;border-radius: 5px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  onclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div>' +
                            '</div></td></tr></table></div>',
                        lightboxYoutubeItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"><div id="#mi_image_lightbox_@@@ksid" onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();"><img src="https://i.ytimg.com/vi/@@@sourceURL/mqdefault.jpg" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  onclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div><div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery.MidasInsight.StopYoutubeVideo(jQuery(\'#mi_image_lightbox_@@@ksid iframe\')[0]);jQuery(this).fadeOut();"><iframe width="560" height="315" src="https://www.youtube.com/embed/@@@youtubeid?enablejsapi=1" frameborder="0" allowfullscreen></iframe></a></div>' +
                            '</td></tr></table></div>',
                        lightboxVimeoItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"><div id="#mi_image_lightbox_@@@ksid" onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'src\',jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'data-src\'));"><img src="@@@itemContentImageURL" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;nbox-shadow: 0px 0 10px 4px #eee;float: right!important;border-radius: 2px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  nonclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div><div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'src\',\'\');jQuery(this).fadeOut();"><iframe  id="mi_iframe_lightbox_@@@ksid" data-src="@@@sourceURL?autoplay=1&title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></a></div>' +
                            '</td></tr></table></div>',
                        normalItem: '<div style="position:relative;">@@@metaicon<table align="left" class="mi_resultcontainer" @@@cond onclick="@@@click"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display:block;">' +
                            '@@@item' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher">@@@itempublisher<span class="mi_resulttimeago"> @@@timeago' +
                            '</div></span></th></tr><tr><td style="padding-right:30px;"><div class="mi_resulttext">@@@itemtext',
                        instagramItem: '<div style="position:relative;">@@@metaicon<table align="left" class="mi_resultcontainer" @@@cond onclick="@@@click"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display:block;">' +
                            '@@@item' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itempublisher<span class="mi_resulttimeago"> @@@timeago' +
                            '</div></span></th></tr><tr><td style="padding-right:30px;"><div class="mi_resulttext">',
                        itemContentImage: '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;"><img onload="if (!jQuery.MidasInsight.imageIsGood(this)) jQuery.MidasInsight.HandleMissingImage(\'preview\',this);" onerror="jQuery.MidasInsight.HandleMissingImage(\'preview\',this);" src="@@@itemcontentimage" style="max-width: 275px;margin-top: 0px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;"/></div>',
                        lightboxContentImage: '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;"><div id="#mi_image_lightbox_@@@ksid" onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();"><img src="@@@itemcontentimage" style="max-width: 275px;margin-top: 0px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;"></div><div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery(this).fadeOut();"><img src="@@@itemcontentimage" style="nbox-shadow: 0px 0 10px 4px #eee;border-radius: 5px;" onload="jQuery(this).css(\'position\', \'relative\').css(\'top\',\'50%\').css(\'margin-top\',((this.height/2)*-1)+ \'px\').css(\'top\',\'50%\',\'!important\');"/></div></div>'
                    }
                },
                RASTA: {
                    panelLayout: {
                        header: ["tabs", "stars"],
                        content: ["photos", "tags", "mentions"],
                        footer: ["share"]
                    },
                    panel: {
                        videoholder: '<div id="mi_videoholder_@@@baseid" class="mi_singlevideocontainer mi_closeTopLeft" onclick="jQuery.MidasInsight.MI_GetPhotos(\'@@@baseid\',false)" style="margin-top: 74px;background-position: 10px 18px;"><div class="mi_singlevideo"></div></div>',
                        containerHtml: '<div style="padding:0px;margin-top:25px;border: 1px solid #ccc;" class="mi_panelBackground mikfpanel mi_rasta" id="cpcnt_@@@kfid" style="direction: ltr;margin-top: 20px;@@@layout"></div>',
                        tabs: '<tr><td><div class="MI_tabs@@@orientation" style="margin-left:0px !important;position:relative;z-index:30;box-shadow:none;left:0px;padding-top: 0 !important;">@@@tabs</div></td></tr>',
                        gauge: '<div class="mi_gradeselectgradbg"></div><div class="mi_gradeselectmasknerrow' + (window.MI_defaults.RTL == 'true' ? ' mi_gradeselectmasknerrow_right' : '') + '" style="background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAABQCAYAAADFuSFAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyODYzNTRkZS04NWY4LTg3NDEtYjNmOS02OGU4NGQzZjVjODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM0QjUyMzEwQ0ZBMTFFNTlCQjg4NzExODFEM0Q0M0QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM0QjUyMzAwQ0ZBMTFFNTlCQjg4NzExODFEM0Q0M0QiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDVFOTA3RTFFN0Y4MTFFNDkzNjJGQzdDNUEyRDA1MTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDVFOTA3RTJFN0Y4MTFFNDkzNjJGQzdDNUEyRDA1MTYiLz4gPC9yZGY6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\/PWEz++jGvqdq7pHoDCVavcQCihRplNndC+x+\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\');width:100%;background-repeat: no-repeat;background-position: 15px 6px;"></div><div class="mi_gradeselecthandlenerrow"></div><div class="mi_gradeselectdigitsnerrow"  ' + (window.MI_defaults.RTL == 'true' ? 'style="direction:ltr!important;"' : 'style="direction:ltr;  LEFT: -4PX;TOP: 30PX;"') + '><span style="font-size: 43px;z-index: 3;color: #92c83e;font-family: \'Source Sans Pro\', Alef!important;"></span></div><div class="mi_gradeselecttext" ' + (window.MI_defaults.RTL == 'true' ? 'style="top:77px;direction:rtl;color:#b8b8b8;"' : 'style="top:77px;direction:ltr;color:#b8b8b8;"') + '></div>',
                        starspanel: {
                            header: '<tr><td style="    border-top: 1px solid #DFDFDF;"><div class="mi_hover_starspanel" style="border-bottom: 1px solid #dfdfdf !important;padding-bottom:5px;;overflow:hidden;border-top:1px solid transparent;  padding-top: 20px;margin-top: -17px;background: #f7f7f7; /* Old browsers */background: -moz-linear-gradient(top,  #f7f7f7 0%, #ffffff 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(100%,#ffffff)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #f7f7f7 0%,#ffffff 100%); /* IE10+ */background: linear-gradient(to bottom,  #f7f7f7 0%,#ffffff 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f7f7f7\', endColorstr=\'#ffffff\',GradientType=0 ); /* IE6-9 */width: @@@widthpx;left: -0px;position: relative;    height: 30px;"><table style="position:relative">',
                            footer: '</tr></table></div></td></tr>'
                        },
                        tag: '<span onclick="jQuery.MidasInsight.tagClicked(\'@@@kfid\',\'@@@atags\')" class="mi_tag_@@@atagsreplace mi_tag">@@@atagscap<span style="display:inline-block;background-color:@@@color;-webkit-font-smoothing: antialiased;padding: 0;margin-bottom: 0;margin-left: 0;margin-top: 5px;left: 4px;position: relative;width:6px;height:6px;border-radius:50%;    box-shadow: inset 0 0 10px 10px rgba(0,0,0,0.2);"></span></span>',
                        slidercontainer: '<div id="mi_previewPhotosContainer_@@@kfid" style="height:65px;cursor:default;-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;" unselectable="on" onselectstart="return false;"><table class="mi_previewPhotosContainer" style="" cellspacing="0"><tr>',
                        photopreview: '<tr ><td id="mi_photopreview_@@@kfid" onclick="window.MI_logUsage(\'photo_preview_clicked\',\'@@@kfid\');if(jQuery.inArray(\'photos\', jQuery.MidasInsight.ObjDictionary[\'@@@kfid\'].options.tabs) ==-1) return;jQuery(this).find(\'.mi_thumbscontainer\').hide();jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false);" colspan="2" style="width: 100%;overflow: hidden;background-color:white;"><div class="mi_thumbscontainer" style="margin:0 auto;overflow:hidden;width:@@@widthpx;padding-top: 3px;border-top: 0px solid rgba(0,0,0,0.2);">',
                        tabswrapper: {
                            header: '<div style="width: 152px;margin: 0 auto;background: #fefefe; /* Old browsers */background: -moz-linear-gradient(top,  #fefefe 0%, #eeeeee 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fefefe), color-stop(100%,#eeeeee)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #fefefe 0%,#eeeeee 100%); /* IE10+ */background: linear-gradient(to bottom,  #fefefe 0%,#eeeeee 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#fefefe\', endColorstr=\'#eeeeee\',GradientType=0 ); /* IE6-9 */-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;border: 1px solid #cbcbcb;padding: 5px;">',
                            footer: '</div>'
                        },
                        footer: {
                            header: '<div class="mi_footerwrapper" style="background-color:#fff;"><div class="mi_footerroot" style="top:2px;"><div class="mi_footercontainer" id="mi_footercontainer_@@@kfid" nstyle="height:100%;position:static;">' +
                                '<div class="mi_footer" style="background-image:none;height:auto;margin-top:2px;"><div onclick="jQuery(\'#cpcnt_@@@kfid\').find(\'.MI_tab_selected\').removeClass(\'MI_tab_selected\');jQuery(\'#mipct_scroll_@@@kfid\').addClass(\'mi_blured\');jQuery(\'#mipct_tblabout_@@@kfid\').css(\'max-height\',jQuery(\'#mipct_scroll_@@@kfid\').height()+1).css(\'height\',jQuery(\'#mipct_scroll_@@@kfid\').height()+1).css(\'top\',jQuery(\'#mipct_scroll_@@@kfid\').position().top).fadeIn();" style="z-index: 1;position: absolute;right: 0px;top: 5px;height: 25px;width: 65px;cursor: pointer;display:none;"></div>',
                            share: '<div><ul class="mi_share-buttons" style="padding:0;    margin: 0 10px 5px;;"><li><a onclick="window.MI_logUsage(\'share\');" href="https://www.facebook.com/sharer/sharer.php?u={0}" target="_blank"><div style="margin-right: -6px;background-image: url(//d34p6saz4aff9q.cloudfront.net/img/f.png);height: 30px;width: 30px;"></div></a></li>' +
                                ' <li><a onclick="window.MI_logUsage(\'share\');" href="https://twitter.com/intent/tweet?url={0}&text={1}:" target="_blank" title="Tweet"><div style="background-image:url(//d34p6saz4aff9q.cloudfront.net/img/t.png);height: 30px;width: 30px;"></div></a></li><li style="display:none;"><a onclick="window.MI_logUsage(\'share\');" href="http://pinterest.com/pin/create/button/?url={0}&description={2}" target="_blank" title="Pin it"><img onload="this.style.opacity=1;this.style.top=0;" src="//d34p6saz4aff9q.cloudfront.net/images/footer/Pinterest.png" style="opacity:0"></a></li>' +
                                '<li><a onclick="window.MI_logUsage(\'share\');" href="https://plus.google.com/share?url={0}" target="_blank" title="Share on Google+"><div style="background-image: url(//d34p6saz4aff9q.cloudfront.net/img/g.png); ;width:30px;height:30px;background-repeat: no-repeat;"></div></a></li></ul></div>' +
                                '<div class="mi_footer_prompt" style="color:#59a3e8;top:auto;border-top:none;position:static;float:left;margin-bottom:0;padding: 7px;">@@@ask</div>',
                            callForActions: '<tr><td><div id="cfa" style="white-space:nowrap;padding: 0;margin-top: -2px;"><div onclick="alert(\'call to add to favorites\')" style="cursor:pointer;height: 21px;width: 50%;margin: 0;display: inline-block;text-align: center;vertical-align: middle;padding-top: 7px;border: 1px solid rgb(239, 239, 239);border-left: none;font-size: 12px;color: #111;border-top: none;">+Add to Favorites</div><div onclick="alert(\'call to book\')" style="cursor: pointer;height: 21px;width: 50%;margin: 0;display: inline-block;text-align: center;vertical-align: middle;padding-top: 7px;border: 1px solid rgb(239, 239, 239);border-left: none;font-size: 12px;color: #111;border-top: none;background-color: #31b444;color: white;">Book</div></div></td></tr>'
                        },
                        header: {
                            header: '<div class="mi_panelheader" style="    max-width: @@@widthpx;overflow: hidden;display: block;"><table class="mi_rasta"  align="left" class="mi_reset mi_greenredtitle" style="    max-width: @@@widthpx;overflow: hidden;display: block;"><tr><td class="mi_header_caption@@@gaugeOrientation" style="padding:0 !important;@@@exttrastyle">' +
                                '<div class="mi_drag_area" style="position: absolute;width: 100%;height:125px;left:0;z-index: 2"></div>' +
                                '<div class="mi_green_close@@@gaugeOrientation" onclick="jQuery.MidasInsight.hidePanel(\'@@@kfid\');" style="z-index:3;cursor:pointer;display:none;">âœ•</div>'
                                // score gauge
                                +
                                '<div class="oi_gauge oi_gauge_@@@clsgrade mi_gradselectroot @@@gaugeOrientation" id="mi_gradselectroot_@@@kfid" data-score="@@@decgrade" ></div>' +
                                '<div class="mi_titlescore oi_color_@@@clsgrade" style="@@@titleOrientation;text-align: left;margin-top: 16px;width: 240px;font-size: 25px;height: 0px;margin-left: 105px;" >@@@textgrade</div>' +
                                '<div class="mi_title" style="@@@titleOrientation;margin-top: 22px;width: 240px;float: left;height: 41px;margin-left: 102px;color: #030303;" >@@@displayText</div>' +
                                '<div style="float:left !important;margin-left:102px;color: #A0A0A0;    margin-top: -5px;    nmargin-left: 0!important;npadding-left: 0!important;" class="mi_subtitle" >@@@count</div>' +
                                '<div class="mi_preview_images" style="z-index: 3;width: 100px;height: 60px;border: 0px solid #ababab;position: absolute;right: 18px;top: 33px;padding: 0px 0px 0px 0px;cursor: pointer;" onclick="if(jQuery.inArray(\'photos\', jQuery.MidasInsight.ObjDictionary[\'@@@kfid\'].options.tabs) ==-1) return; jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false);"><div style="border: 0px solid #ababab;width:100%;height:100%;background-image:url(@@@previewimgsrc);      background-size: contain;background-repeat: no-repeat;background-position: center top;"></div></div>'

                            // tools tabs
                                +
                                '<div style="clear:both;height:0px;margin-bottom:0px;border-top:0px solid #DBDBDB!important;"></div>' +
                                '</td></tr>',
                            footer: '</table></div>'
                        }
                    },
                    scrollables: {
                        header: '<div style="clear:both;height: px;margin-bottom:0px;border-top:0px solid #DBDBDB"></div><div id="mipct_scroll_@@@kfid" tabindex="-1" style="heightdummy:0;outline:none;max-height:none;" class="mi_scroll">' +
                            '<table align="left" id="mipct_tbldefault_@@@kfid" class="mi_results mi_scrolledcontent">',
                        footer: '</table></div>'
                    },
                    socialItem: {
                        timelineItem: '<div class="mi_timeline">@@@fullYear<br/>@@@month<br/>@@@date</div>',
                        metaIcon: function(data, baseid) {
                            return "<div style=\"left:auto;position: absolute;right: 24px;-moz-transform:none;-moz-filter:grayscale(100%);filter: grayscale(100%);zoom: 1;-webkit-filter: grayscale(1);top: 5px;\" class=\"mi_widget_social_icon_small mi_widget_social_icon_small_" + (data.source.replace('.com', '').replace('www.', '').replace('.', '').replace('.', '')).trim().capitalize() + "\" mi_data-tooltip=\"" + (data.source.replace('.com', '').replace('www.', '').replace('mi.google.reviews', 'Google Reviews').replace('plus.google', 'Google+')) + "\"></div>";
                        },
                        nonTimelineItem: '<img data-source="@@@sourceSite" onerror="jQuery.MidasInsight.HandleMissingImage(\'avatar\',this)" src="@@@itemImageURL" valign="top" class="mi_resultimage">',
                        youtubeItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher">@@@itemPublisher<span class="mi_resulttimeago">@@@timeAgo' +
                            '</div></span></th></tr><tr><td style="padding-right:30px;">' +
                            '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;" class="mi_imgcontainer"><img src="https://i.ytimg.com/vi/@@@sourceURL/mqdefault.jpg" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;box-shadow: 0px 0 10px 4px #eee;border-radius: 5px;display:inline;"/><img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  onclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"/></div>' +
                            '</div></td></tr></table></div>',
                        lightboxYoutubeItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;"  class="mi_imgcontainer">' +
                            '<div id="#mi_image_lightbox_@@@ksid" >' +
                            '<img src="https://i.ytimg.com/vi/@@@sourceURL/mqdefault.jpg" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;nbox-shadow: 0px 0 10px 4px #eee;float: right!important;border-radius: 2px;display:inline;"/>' +
                            '<img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;"  '
                            //+'onclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" '
                            +
                            'onerror="this.style.display=\'none\';"/></div>'
                            //+'<div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery.MidasInsight.StopYoutubeVideo(jQuery(\'#mi_image_lightbox_@@@ksid iframe\')[0]);jQuery(this).fadeOut();"><iframe width="560" height="315" src="https://www.youtube.com/embed/@@@youtubeid?enablejsapi=1" frameborder="0" allowfullscreen></iframe></a></div>'
                            +
                            '</td></tr></table></div>',
                        lightboxVimeoItem: '<div style="position:relative;"><div class=\"MI_SourceIcon MI_@@@sourceSite\" mi_data-tooltip=\"@@@sourceSite\"></div><table align="left" class="mi_resultcontainer" style="direction:ltr!important;cursor:default;"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display: block;">' +
                            '@@@sourceAvatar' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itemPublisher<span class="mi_resulttimeago" itemDate="@@@itemDate">@@@timeAgo' +
                            '</span></div></th></tr><tr><td style="padding-right:30px;"></td></tr>' +
                            '<tr><td colspan="2" onclick="@@@click" style="cursor: pointer; cursor: hand;"><div style="padding-right:10px;overflow:hidden;position:relative;max-width: 275px;" class="mi_imgcontainer">' +
                            '<div id="#mi_image_lightbox_@@@ksid" '
                            //+'onclick=" jQuery(mi_image_lightbox_@@@ksid).fadeIn();jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'src\',jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'data-src\'));"'
                            +
                            '><img src="@@@itemContentImageURL" style="max-width: @@@itemWidth ;min-width:185px;margin-top: 15px;margin-bottom: 15px;nbox-shadow: 0px 0 10px 4px #eee;float: right!important;border-radius: 2px;display:inline;"/>' +
                            '<img src="//d34p6saz4aff9q.cloudfront.net/images/playvideow.png" style="position:absolute;cursor: pointer;left: 50%!important;margin-top: 20%;display:inline;margin-left: -30px;" '
                            //+'nonclick="window.MI_logUsage(\'play_video\',\'@@@baseid\');@@@click" onerror="this.style.display=\'none\';"
                            +
                            '/></div>'
                            //+'<div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery(\'#mi_iframe_lightbox_@@@ksid\').attr(\'src\',\'\');jQuery(this).fadeOut();"><iframe  id="mi_iframe_lightbox_@@@ksid" data-src="@@@sourceURL?autoplay=1&title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
                            //+'</a></div>'
                            +
                            '</td></tr></table></div>',
                        normalItem: '<div style="position:relative;">@@@metaicon<table align="left" class="mi_resultcontainer" @@@cond onclick="@@@click"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display:block;">' +
                            '@@@item' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher">@@@itempublisher<span class="mi_resulttimeago" style=""> @@@timeago' +
                            '</div></span></th></tr><tr><td style="padding-right:30px;"><div class="mi_resulttext">@@@itemtext',
                        instagramItem: '<div style="position:relative;">@@@metaicon<table align="left" class="mi_resultcontainer" @@@cond onclick="@@@click"><tr><td rowspan="4" valign="top" style="padding-right:15px;padding-left:3px;width: 65px;"><div style="position:relative;height: 100%;display:block;">' +
                            '@@@item' +
                            '</div></td><th style="vertical-align: middle;" align="left"><div class="mi_resultpublisher" style="color:#838383;">@@@itempublisher<span class="mi_resulttimeago"> @@@timeago' +
                            '</div></span></th></tr><tr><td style="padding-right:30px;"><div class="mi_resulttext">',
                        itemContentImage: '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;"><img nonload="if (!jQuery.MidasInsight.imageIsGood(this)) jQuery.MidasInsight.HandleMissingImage(\'preview\',this);" onerror="jQuery.MidasInsight.HandleMissingImage(\'preview\',this);" src="@@@itemcontentimage" style="max-width: 275px;margin-top: 0px;margin-bottom: 15px;nbox-shadow: 0px 0 10px 4px #eee;float: right;border-radius: 5px;"/></div>',
                        lightboxContentImage: '</td></tr><tr><td colspan="2"><div style="padding-right:10px;overflow:hidden;"><div id="#mi_image_lightbox_@@@ksid" ><img src="@@@itemcontentimage" style="max-width: 275px;margin-top: 0px;margin-bottom: 15px;nbox-shadow: 0px 0 10px 4px #eee;    border-radius: 2px;float: left!important;cursor:pointer;" nonerror="jQuery.MidasInsight.HandleMissingImage(\'preview\',this);"  nonload="if (!jQuery.MidasInsight.imageIsGood(this)) jQuery.MidasInsight.HandleMissingImage(\'preview\',this); else ' +
                            '{jQuery.MidasInsight.AddtoGallery(\'@@@kfid\', { href: \'@@@itemcontentimage\', title:\'\' });' +
                            '  jQuery(this).parent().attr(\'onclick\',\'jQuery.MidasInsight.ShowLightBoxURL(\\\'@@@itemcontentimage\\\',\\\'@@@kfid\\\')\');}"></div></div>'
                            //<div class="mi_lightbox" id="mi_image_lightbox_@@@ksid" onclick="jQuery(this).fadeOut();"><img src="@@@itemcontentimage" style="nbox-shadow: 0px 0 10px 4px #eee;border-radius: 5px;" onload="jQuery(this).css(\'position\', \'relative\').css(\'top\',\'50%\').css(\'margin-top\',((this.height/2)*-1)+ \'px\').css(\'top\',\'50%\',\'!important\');"/></div></div>'
                    }
                }
            }

            var langDictionary = {
                EN: {
                    scores: ['Lame', 'Fair', 'Okay', 'Good', 'Great!'],
                    basedon: 'Based on %d Reviews & Mentions ',
                    ask: 'Ask friends for their opinion',
                    mentions: 'Mentions <br/>&&nbsp;Reviews',
                    media: 'Photos <br/>&&nbsp;Videos',
                    facebook: 'Facebook',
                    feelter: 'Social <br/>Insights',
                    comment: 'Comment',
                    back: 'Back',
                    insights: 'Insights',
                    clickhere: "CLICK HERE",
                    hoverbuttontext: 'REVIEWS, MENTIONS & PHOTOS',
                    rating: 'Rating <span style="font-family: \'Source Sans Pro\'">%d</span> Reviews & Mentions',
                    translate: 'Translate'
                },
                FR: {
                    scores: ['Boiteux', 'Juste', 'Bien', 'Bon', 'Grand!'],
                    basedon: 'BasÃ© sur %d Critiques et Mentions ',
                    ask: 'Demandez Ã  vos amis pour leur opinion',
                    mentions: 'Mentions & Commentaires',
                    media: 'Photos & VidÃ©os',
                    facebook: 'Facebook',
                    feelter: 'Insights sociaux',
                    comment: 'Commentaire',
                    back: 'ArriÃ¨re',
                    insights: 'Insights',
                    clickhere: "CLIQUEZ ICI",
                    hoverbuttontext: 'CRITIQUES, MENTIONS ET PHOTOS',
                    rating: ' Rating %d Critiques & Commentaires'
                },
                IT: {
                    scores: ['Zoppo', 'Fiera', 'Bene', 'Buono', 'Grande!'],
                    basedon: 'Sulla base %d Recensioni e Menzioni',
                    ask: 'Chiedi amici per il loro parere',
                    mentions: 'Menzioni & Recensioni',
                    media: 'Foto & Video',
                    facebook: 'Facebook',
                    feelter: 'Insights Sociali',
                    comment: 'Commento',
                    back: 'Indietro',
                    insights: 'Insights',
                    clickhere: "CLICK HERE",
                    hoverbuttontext: 'REVIEWS, MENTIONS & PHOTOS',
                    rating: 'Rating %d Reviews & Mentions'
                },
                DE: {
                    scores: ['lahm', 'Messe', 'Okay', 'gut', 'Na Toll!'],
                    basedon: 'Basierend auf %d Bewertungen & Mentions ',
                    ask: 'Fragen Sie Freunde nach ihrer Meinung',
                    mentions: 'ErwÃ¤hnungen & Reviews',
                    media: 'Fotos & Videos',
                    facebook: 'Facebook',
                    feelter: 'Social Insights',
                    comment: 'Kommentar',
                    back: 'Der RÃ¼cken',
                    insights: 'Insights',
                    clickhere: "HIER KLICKEN",
                    hoverbuttontext: 'REZENSIONEN, ERWÃ„HNUNGEN UND FOTOS',
                    rating: 'Bewertung %d  Rezensionen und ErwÃ¤hnungen'
                },
                ES: {
                    scores: ['Cojos', 'Justo', 'Bien', 'Bueno', 'Excelente!'],
                    basedon: 'Basado en %d Comentarios y Menciones ',
                    ask: 'Pregunte a sus amigos para su opiniÃ³n ',
                    mentions: 'Menciones',
                    media: 'Medios',
                    facebook: 'Facebook',
                    feelter: 'Feelter',
                    comment: 'comentario',
                    back: 'Back',
                    clickhere: "CLIC AQUÃ",
                    hoverbuttontext: ' COMENTARIOS, MENCIONCES Y FOTOS',
                    rating: 'PuntuaciÃ³n %d Comentarios Y Menciones'
                },
                HE: {
                    scores: ['×’×¨×•×¢', '×¡×‘×™×¨', '×˜×•×‘', '×˜×•×‘ ×ž××•×“', '!×ž×¢×•×œ×”'],
                    basedon: '×ž×‘×•×¡×¡ ×¢×œ %d ×—×•×•×ª ×“×¢×ª ',
                    ask: '×©×ª×£ ××ª ×”×—×‘×¨×™× ',
                    mentions: '×—×•×•×ª&nbsp;×“×¢×ª',
                    media: '×ª×ž×•× ×•×ª ×•×•×™×“××•',
                    facebook: '×¤×™×™×¡×‘×•×§',
                    feelter: 'Feelter',
                    comment: '×ª×’×•×‘×”',
                    moreInfo: '×ž×™×“×¢ × ×•×¡×£',
                    back: '×¡×’×•×¨',
                    insights: '×ª×•×‘× ×•×ª',
                    clickhere: "×œ×—×¥ ×›××Ÿ",
                    hoverbuttontext: '×‘×™×§×•×¨×•×ª, ××™×–×›×•×¨×™× ×•×ª×ž×•× ×•×ª',
                    rating: '×”×“×™×¨×•×’ ×ž×‘×•×¡×¡ ×¢×œ <span style="font-family: \'Source Sans Pro\'"> %d </span>×‘×™×§×•×¨×•×ª ×•××™×–×›×•×¨×™×',
                    translate: '×ª×¨×’×'
                },
                CN: {
                    scores: ['æ‹‰æ¢…', 'å…¬å¹³', 'å¥½å§', 'å¥½', 'å¤ªå¥½äº†ï¼'],
                    basedon: 'åŸºäºŽï¼…dä¸ªè¯„è®ºä¸Žè¯´èµ· ',
                    ask: 'é—®æœ‹å‹ä»–ä»¬çš„æ„è§ ',
                    mentions: 'è¯´èµ· ',
                    media: 'åª’ä½“ ',
                    facebook: 'Facebookçš„ ',
                    feelter: 'Feelter',
                    comment: 'è¯„è®º}',
                    back: 'Back',
                    clickhere: "CLICK HERE",
                    hoverbuttontext: 'REVIEWS, MENTIONS & PHOTOS',
                    rating: 'Rating %d Reviews & Mentions'
                },
                AR: {
                    scores: ['Ø¹Ø±Ø¬Ø§Ø¡', 'Ù…Ø¹Ø±Ø¶', 'Ø­Ø³Ù†Ø§ØŒ', 'Ø¬ÙŠØ¯Ø©', 'Ø¹Ø¸ÙŠÙ…!'],
                    basedon: 'Ø§Ø³ØªÙ†Ø§Ø¯Ø§ %d Ø§Ù„Ø¢Ø±Ø§Ø¡ Ùˆ Ø§Ù„ØªÙ†ÙˆÙŠÙ‡Ø§Øª ',
                    ask: ' Ù†Ø³Ø£Ù„ Ø§Ù„Ø§ØµØ¯Ù‚Ø§Ø¡ Ø¹Ù† Ø±Ø£ÙŠÙ‡Ù… ',
                    mentions: ' ÙŠØ°ÙƒØ± ',
                    media: ' Ø§Ù„ØµÙˆØ±  ',
                    facebook: ' Ø§Ù„ÙÙŠØ³Ø¨ÙˆÙƒ ',
                    feelter: ' Feelter ',
                    comment: ' ØªØ¹Ù„ÙŠÙ‚',
                    back: 'Back',
                    clickhere: "CLICK HERE",
                    hoverbuttontext: 'REVIEWS, MENTIONS & PHOTOS',
                    rating: 'Rating %d Reviews & Mentions'
                },
                CS: {
                    scores: ['PÅ™Ã­Å¡ernÃ©', 'UspokojivÃ©', 'PrÅ¯mÄ›rnÃ©', 'DobrÃ©', 'VynikajÃ­cÃ­'],
                    basedon: 'Na zÃ¡kladÄ› %d hodnocenÃ­ a zmÃ­nek',
                    ask: 'Zeptej se pÅ™Ã­tele na jeho nÃ¡zor',
                    mentions: 'HodnocenÃ­ a zmÃ­nky',
                    media: 'Fotky a videa  ',
                    facebook: 'Facebook',
                    feelter: ' Feelter ',
                    comment: 'KomentÃ¡Å™',
                    back: 'ZpÄ›t',
                    clickhere: "Klikni zde",
                    hoverbuttontext: 'NÃ¡zory, zmÃ­nky a fotky',
                    rating: 'HodnocenÃ­ %d nÃ¡zory a zmÃ­nky',
                    translate: 'pÅ™eloÅ¾it'
                },
                PL: {
                    scores: ['Okropnie', 'Å¹le', 'Åšredni', 'Bardzo Dobrze', 'Doskonale'],
                    basedon: 'Bazowane na %d Opiniach',
                    ask: 'Zapytaj znajomych o opiniÄ™',
                    mentions: 'Wzmianki i Opinie',
                    media: 'Filmy i ZdjÄ™cia',
                    facebook: 'Facebook',
                    feelter: ' Feelter',
                    comment: 'komentarz',
                    back: 'z powrotem',
                    clickhere: "kliknij tutaj",
                    hoverbuttontext: 'Opinie, Wzmianki i ZdjÄ™cia',
                    rating: 'Ranking %d Wzmianek i Opini',
                    translate: 'tÅ‚umaczyÄ‡'
                },
                SK: {
                    scores: ['HroznÃ©', 'UspokojivÃ©', 'PriemernÃ©', 'DobrÃ©', 'VÃ½bornÃ©'],
                    basedon: 'Na zÃ¡klade %d hodnotenÃ­ a zmienok',
                    ask: 'SpÃ½taj sa priateÄ¾a na jeho nÃ¡zor',
                    mentions: 'Zmienky a hodnotenia',
                    media: 'Fotky a videÃ¡',
                    facebook: 'Facebook',
                    feelter: ' Feelter',
                    comment: 'KomentÃ¡r',
                    back: 'SpÃ¤Å¥',
                    clickhere: "Klikni tu",
                    hoverbuttontext: 'Opinie, Wzmianki i ZdjÄ™cia',
                    rating: 'Hodnotenie %d nÃ¡zory a zmienky',
                    translate: 'PreloÅ¾iÅ¥'
                }
            };

            window.langDictionary = langDictionary;


            // Constructs an object from a query string
            // in the format of key=value&key2=value2
            function parseQuery(query) {
                var Params = new Object();
                if (!query) return Params; // return empty object
                var Pairs = unescape(query).split('&');
                for (var i = 0; i < Pairs.length; i++) {
                    if (Pairs[i].indexOf('=') == -1) continue;
                    var key = Pairs[i].substr(0, Pairs[i].indexOf('='));
                    var val = Pairs[i].substr(Pairs[i].indexOf('=') + 1);
                    val = val.replace(/\+/g, ' ');
                    Params[key] = val;
                }
                return Params;
            }

            // parse parameters from script source
            var myScript = req.url;
            var queryString = req.query;//(typeof myScript == 'undefined' || typeof myScript.src == 'undefined') ? '' : myScript.src.replace(/^[^\?]+\??/, '');

            var params = parseQuery(queryString);
            //res.write('zzzz'+queryString+' '+ JSON.stringify(queryString));
            
            window.MI_defaults = extend({}, window.MI_defaults, queryString)
            if (typeof window.MI_defaults.feedback != 'undefined') window.MI_defaults.inqa = window.MI_defaults.feedback;

            //get template from html if availasble
            if (!(typeof mi_template === "undefined")) {
                window.tempDictionary[window.MI_defaults.template].panelLayout = mi_template.panelLayout;
            }
            if (typeof window.MI_defaults.panelLayout == "string") try {
                window.MI_defaults.panelLayout = JSON.parse(window.MI_defaults.panelLayout.replace(/'/g, '"'));
            }
            catch (e) {}
            if (!(typeof window.MI_defaults.panelLayout === "undefined")) {
                window.tempDictionary[window.MI_defaults.template].panelLayout = window.MI_defaults.panelLayout;
            }
            if (typeof window.MI_defaults.frameElements == "string") try {
                window.MI_defaults.frameElements = JSON.parse(window.MI_defaults.frameElements.replace(/'/g, '"'));
            }
            catch (e) {}
            if (typeof window.MI_defaults.tabs == "string") try {
                window.MI_defaults.tabs = JSON.parse(window.MI_defaults.tabs.replace(/'/g, '"'));
            }
            catch (e) {}
            if (typeof window.MI_defaults.ex == "string") try {
                window.MI_defaults.ex = JSON.parse(window.MI_defaults.ex.replace(/'/g, '"'));
            }
            catch (e) {}
            if (typeof window.MI_defaults.panelLayout == 'undefined') window.MI_defaults.panelLayout = {};
            if (typeof window.MI_defaults.panelLayout.flags == 'undefined') window.MI_defaults.panelLayout.flags = [];
            if (typeof window.MI_defaults.panelLayout.flags == "string") try {
                window.MI_defaults.panelLayout.flags = JSON.parse(window.MI_defaults.panelLayout.flags.replace(/'/g, '"'));
            }
            catch (e) {}
            if (typeof window.langDictionary[window.MI_defaults.lang] == 'undefined') window.MI_defaults.lang = 'EN';

            if (typeof window.langDictionary[window.MI_defaults.lang] == 'undefined')
                window.langDictionary[window.MI_defaults.lang] = extend({}, langDictionary['EN'], window.langDictionary[window.MI_defaults.lang]);

            //exclude tripadvisor
            if (typeof window.MI_defaults.ex == 'undefined') {
                window.MI_defaults.ex = [];
            }
            window.MI_defaults.ex.push(3);
            window.MI_defaults.ex.push(24);
            switch (window.MI_defaults.lang) {
                case 'AR':
                    window.MI_defaults.RTL = 'true';
                    window.MI_defaults.gaugeOrientation = 'right';
                    break;
            }
            window.MI_defaults.minPanelWidth = window.MI_defaults.layout == "inlinepanel" ? 750 : 485;
            window.MI_defaults.panelWidth = window.MI_defaults.template == 'RASTA' ? window.MI_defaults.minPanelWidth : 386;

            if (typeof String.prototype.camelCase !== 'function') {
                String.prototype.camelCase = function() {
                    return this.toLowerCase().replace(/-(.)/g, function(match, group1) {
                        return group1.toUpperCase();
                    });
                }
            }
            if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function() {
                    return this.replace(/^\s+|\s+$/g, '');
                }
            }

            if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function() {
                    return this.replace(/^\s+|\s+$/g, '');
                }
            }
            String.prototype.capitalize = function() {
                return this.replace(/((?:^|\s(?!and)(?!or)(?!of)(?!the)(?!\bat\b))\S)/g, function(a) {
                    return a.toUpperCase();
                }).replace(/\b\S\S$/g, function(a) {
                    return a.toUpperCase();
                });
            };

            if (!Object.keys) {
                Object.keys = function(obj) {
                    var keys = [];

                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            keys.push(i);
                        }
                    }
                    return keys;
                };
            }
            if (typeof console == "undefined") {
                this.console = {
                    log: function() {}
                };
            }

            if (!Array.prototype.map) {
                Array.prototype.map = function(fun) {
                    var t = Object(this);
                    var len = t.length >>> 0;
                    var res = new Array(len);
                    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                    for (var i = 0; i < len; i++) {
                        if (i in t)
                            res[i] = fun.call(thisArg, t[i], i, t);
                    }
                    return res;
                };
            }

            Array.maxProp = function(array, prop) {
                var values = array.map(function(el) {
                    return el[prop];
                });
                return Math.max.apply(Math, values);
            };
            Array.minProp = function(array, prop) {
                var values = array.map(function(el) {
                    return el[prop];
                });
                return Math.min.apply(Math, values);
            };
            String.prototype.format = function() {
                var formatted = this;
                for (var i = 0; i < arguments.length; i++) {
                    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                    formatted = formatted.replace(regexp, arguments[i]);
                }
                return formatted;
            };


            // initiate logging parameters and create 
            // on-screen log if in debug mode
            window.MI_logState = '';
            window.MI_logDetails = '';
            window.MI_logKey = '';
            window.MI_logLast = new Date();
            window.MI_scrollLast = new Date(1970, 1, 1);
            window.MI_queuedLoggingEvents = '';
            if (typeof(window.MI_defaults.debug) != 'undefined' && window.MI_defaults.debug == 'true') {
                jQuery('<div id="MI_onScreenLog" style="padding:5px;overflow:hidden;z-index:999;position:fixed;right:10px;top:10px;width:200px;bottom:10px;border-radius:5px;border:1px solid #333;background:#aaa;background:rgba(0,0,0,0.5);color:white;"><div class="mi-logCaption" style="background:#aaa;margin:-10px -10px 10px -10px;padding:10px;color:#333;" ><strong style="color: white;">Debug-Mode Log</strong><br><div style="box-shadow: 0px 0px 5px gray;background-color: white;border: 1px solid #7D7D7D;border-radius: 4px;padding: 5px;margin-top: 5px;font-size: 11px;color: #999;">This log is only displayed on debug mode.To stop showing It, Remove the "debug=true" parameter from your script reference or hash tag.</div></div>').appendTo("body");
            }
            else if (typeof(window.MI_defaults.hidden) != 'undefined' && window.MI_defaults.hidden == 'true') {
                return;
            }

            window.misstimer = 0;
        }
        prePluginInit();



        // locals
        var latin_map = {
            "Ã": "A",
            "Ä‚": "A",
            "áº®": "A",
            "áº¶": "A",
            "áº°": "A",
            "áº²": "A",
            "áº´": "A",
            "Ç": "A",
            "Ã‚": "A",
            "áº¤": "A",
            "áº¬": "A",
            "áº¦": "A",
            "áº¨": "A",
            "áºª": "A",
            "Ã„": "A",
            "Çž": "A",
            "È¦": "A",
            "Ç ": "A",
            "áº ": "A",
            "È€": "A",
            "Ã€": "A",
            "áº¢": "A",
            "È‚": "A",
            "Ä€": "A",
            "Ä„": "A",
            "Ã…": "A",
            "Çº": "A",
            "á¸€": "A",
            "Èº": "A",
            "Ãƒ": "A",
            "êœ²": "AA",
            "Ã†": "AE",
            "Ç¼": "AE",
            "Ç¢": "AE",
            "êœ´": "AO",
            "êœ¶": "AU",
            "êœ¸": "AV",
            "êœº": "AV",
            "êœ¼": "AY",
            "á¸‚": "B",
            "á¸„": "B",
            "Æ": "B",
            "á¸†": "B",
            "Éƒ": "B",
            "Æ‚": "B",
            "Ä†": "C",
            "ÄŒ": "C",
            "Ã‡": "C",
            "á¸ˆ": "C",
            "Äˆ": "C",
            "ÄŠ": "C",
            "Æ‡": "C",
            "È»": "C",
            "ÄŽ": "D",
            "á¸": "D",
            "á¸’": "D",
            "á¸Š": "D",
            "á¸Œ": "D",
            "ÆŠ": "D",
            "á¸Ž": "D",
            "Ç²": "D",
            "Ç…": "D",
            "Ä": "D",
            "Æ‹": "D",
            "Ç±": "DZ",
            "Ç„": "DZ",
            "Ã‰": "E",
            "Ä”": "E",
            "Äš": "E",
            "È¨": "E",
            "á¸œ": "E",
            "ÃŠ": "E",
            "áº¾": "E",
            "á»†": "E",
            "á»€": "E",
            "á»‚": "E",
            "á»„": "E",
            "á¸˜": "E",
            "Ã‹": "E",
            "Ä–": "E",
            "áº¸": "E",
            "È„": "E",
            "Ãˆ": "E",
            "áºº": "E",
            "È†": "E",
            "Ä’": "E",
            "á¸–": "E",
            "á¸”": "E",
            "Ä˜": "E",
            "É†": "E",
            "áº¼": "E",
            "á¸š": "E",
            "êª": "ET",
            "á¸ž": "F",
            "Æ‘": "F",
            "Ç´": "G",
            "Äž": "G",
            "Ç¦": "G",
            "Ä¢": "G",
            "Äœ": "G",
            "Ä ": "G",
            "Æ“": "G",
            "á¸ ": "G",
            "Ç¤": "G",
            "á¸ª": "H",
            "Èž": "H",
            "á¸¨": "H",
            "Ä¤": "H",
            "â±§": "H",
            "á¸¦": "H",
            "á¸¢": "H",
            "á¸¤": "H",
            "Ä¦": "H",
            "Ã": "I",
            "Ä¬": "I",
            "Ç": "I",
            "ÃŽ": "I",
            "Ã": "I",
            "á¸®": "I",
            "Ä°": "I",
            "á»Š": "I",
            "Èˆ": "I",
            "ÃŒ": "I",
            "á»ˆ": "I",
            "ÈŠ": "I",
            "Äª": "I",
            "Ä®": "I",
            "Æ—": "I",
            "Ä¨": "I",
            "á¸¬": "I",
            "ê¹": "D",
            "ê»": "F",
            "ê½": "G",
            "êž‚": "R",
            "êž„": "S",
            "êž†": "T",
            "ê¬": "IS",
            "Ä´": "J",
            "Éˆ": "J",
            "á¸°": "K",
            "Ç¨": "K",
            "Ä¶": "K",
            "â±©": "K",
            "ê‚": "K",
            "á¸²": "K",
            "Æ˜": "K",
            "á¸´": "K",
            "ê€": "K",
            "ê„": "K",
            "Ä¹": "L",
            "È½": "L",
            "Ä½": "L",
            "Ä»": "L",
            "á¸¼": "L",
            "á¸¶": "L",
            "á¸¸": "L",
            "â± ": "L",
            "êˆ": "L",
            "á¸º": "L",
            "Ä¿": "L",
            "â±¢": "L",
            "Çˆ": "L",
            "Å": "L",
            "Ç‡": "LJ",
            "á¸¾": "M",
            "á¹€": "M",
            "á¹‚": "M",
            "â±®": "M",
            "Åƒ": "N",
            "Å‡": "N",
            "Å…": "N",
            "á¹Š": "N",
            "á¹„": "N",
            "á¹†": "N",
            "Ç¸": "N",
            "Æ": "N",
            "á¹ˆ": "N",
            "È ": "N",
            "Ç‹": "N",
            "Ã‘": "N",
            "ÇŠ": "NJ",
            "Ã“": "O",
            "ÅŽ": "O",
            "Ç‘": "O",
            "Ã”": "O",
            "á»": "O",
            "á»˜": "O",
            "á»’": "O",
            "á»”": "O",
            "á»–": "O",
            "Ã–": "O",
            "Èª": "O",
            "È®": "O",
            "È°": "O",
            "á»Œ": "O",
            "Å": "O",
            "ÈŒ": "O",
            "Ã’": "O",
            "á»Ž": "O",
            "Æ ": "O",
            "á»š": "O",
            "á»¢": "O",
            "á»œ": "O",
            "á»ž": "O",
            "á» ": "O",
            "ÈŽ": "O",
            "êŠ": "O",
            "êŒ": "O",
            "ÅŒ": "O",
            "á¹’": "O",
            "á¹": "O",
            "ÆŸ": "O",
            "Çª": "O",
            "Ç¬": "O",
            "Ã˜": "O",
            "Ç¾": "O",
            "Ã•": "O",
            "á¹Œ": "O",
            "á¹Ž": "O",
            "È¬": "O",
            "Æ¢": "OI",
            "êŽ": "OO",
            "Æ": "E",
            "Æ†": "O",
            "È¢": "OU",
            "á¹”": "P",
            "á¹–": "P",
            "ê’": "P",
            "Æ¤": "P",
            "ê”": "P",
            "â±£": "P",
            "ê": "P",
            "ê˜": "Q",
            "ê–": "Q",
            "Å”": "R",
            "Å˜": "R",
            "Å–": "R",
            "á¹˜": "R",
            "á¹š": "R",
            "á¹œ": "R",
            "È": "R",
            "È’": "R",
            "á¹ž": "R",
            "ÉŒ": "R",
            "â±¤": "R",
            "êœ¾": "C",
            "ÆŽ": "E",
            "Åš": "S",
            "á¹¤": "S",
            "Å ": "S",
            "á¹¦": "S",
            "Åž": "S",
            "Åœ": "S",
            "È˜": "S",
            "á¹ ": "S",
            "á¹¢": "S",
            "á¹¨": "S",
            "Å¤": "T",
            "Å¢": "T",
            "á¹°": "T",
            "Èš": "T",
            "È¾": "T",
            "á¹ª": "T",
            "á¹¬": "T",
            "Æ¬": "T",
            "á¹®": "T",
            "Æ®": "T",
            "Å¦": "T",
            "â±¯": "A",
            "êž€": "L",
            "Æœ": "M",
            "É…": "V",
            "êœ¨": "TZ",
            "Ãš": "U",
            "Å¬": "U",
            "Ç“": "U",
            "Ã›": "U",
            "á¹¶": "U",
            "Ãœ": "U",
            "Ç—": "U",
            "Ç™": "U",
            "Ç›": "U",
            "Ç•": "U",
            "á¹²": "U",
            "á»¤": "U",
            "Å°": "U",
            "È”": "U",
            "Ã™": "U",
            "á»¦": "U",
            "Æ¯": "U",
            "á»¨": "U",
            "á»°": "U",
            "á»ª": "U",
            "á»¬": "U",
            "á»®": "U",
            "È–": "U",
            "Åª": "U",
            "á¹º": "U",
            "Å²": "U",
            "Å®": "U",
            "Å¨": "U",
            "á¹¸": "U",
            "á¹´": "U",
            "êž": "V",
            "á¹¾": "V",
            "Æ²": "V",
            "á¹¼": "V",
            "ê ": "VY",
            "áº‚": "W",
            "Å´": "W",
            "áº„": "W",
            "áº†": "W",
            "áºˆ": "W",
            "áº€": "W",
            "â±²": "W",
            "áºŒ": "X",
            "áºŠ": "X",
            "Ã": "Y",
            "Å¶": "Y",
            "Å¸": "Y",
            "áºŽ": "Y",
            "á»´": "Y",
            "á»²": "Y",
            "Æ³": "Y",
            "á»¶": "Y",
            "á»¾": "Y",
            "È²": "Y",
            "ÉŽ": "Y",
            "á»¸": "Y",
            "Å¹": "Z",
            "Å½": "Z",
            "áº": "Z",
            "â±«": "Z",
            "Å»": "Z",
            "áº’": "Z",
            "È¤": "Z",
            "áº”": "Z",
            "Æµ": "Z",
            "Ä²": "IJ",
            "Å’": "OE",
            "á´€": "A",
            "á´": "AE",
            "Ê™": "B",
            "á´ƒ": "B",
            "á´„": "C",
            "á´…": "D",
            "á´‡": "E",
            "êœ°": "F",
            "É¢": "G",
            "Ê›": "G",
            "Êœ": "H",
            "Éª": "I",
            "Ê": "R",
            "á´Š": "J",
            "á´‹": "K",
            "ÊŸ": "L",
            "á´Œ": "L",
            "á´": "M",
            "É´": "N",
            "á´": "O",
            "É¶": "OE",
            "á´": "O",
            "á´•": "OU",
            "á´˜": "P",
            "Ê€": "R",
            "á´Ž": "N",
            "á´™": "R",
            "êœ±": "S",
            "á´›": "T",
            "â±»": "E",
            "á´š": "R",
            "á´œ": "U",
            "á´ ": "V",
            "á´¡": "W",
            "Ê": "Y",
            "á´¢": "Z",
            "Ã¡": "a",
            "Äƒ": "a",
            "áº¯": "a",
            "áº·": "a",
            "áº±": "a",
            "áº³": "a",
            "áºµ": "a",
            "ÇŽ": "a",
            "Ã¢": "a",
            "áº¥": "a",
            "áº­": "a",
            "áº§": "a",
            "áº©": "a",
            "áº«": "a",
            "Ã¤": "a",
            "ÇŸ": "a",
            "È§": "a",
            "Ç¡": "a",
            "áº¡": "a",
            "È": "a",
            "Ã ": "a",
            "áº£": "a",
            "Èƒ": "a",
            "Ä": "a",
            "Ä…": "a",
            "á¶": "a",
            "áºš": "a",
            "Ã¥": "a",
            "Ç»": "a",
            "á¸": "a",
            "â±¥": "a",
            "Ã£": "a",
            "êœ³": "aa",
            "Ã¦": "ae",
            "Ç½": "ae",
            "Ç£": "ae",
            "êœµ": "ao",
            "êœ·": "au",
            "êœ¹": "av",
            "êœ»": "av",
            "êœ½": "ay",
            "á¸ƒ": "b",
            "á¸…": "b",
            "É“": "b",
            "á¸‡": "b",
            "áµ¬": "b",
            "á¶€": "b",
            "Æ€": "b",
            "Æƒ": "b",
            "Éµ": "o",
            "Ä‡": "c",
            "Ä": "c",
            "Ã§": "c",
            "á¸‰": "c",
            "Ä‰": "c",
            "É•": "c",
            "Ä‹": "c",
            "Æˆ": "c",
            "È¼": "c",
            "Ä": "d",
            "á¸‘": "d",
            "á¸“": "d",
            "È¡": "d",
            "á¸‹": "d",
            "á¸": "d",
            "É—": "d",
            "á¶‘": "d",
            "á¸": "d",
            "áµ­": "d",
            "á¶": "d",
            "Ä‘": "d",
            "É–": "d",
            "ÆŒ": "d",
            "Ä±": "i",
            "È·": "j",
            "ÉŸ": "j",
            "Ê„": "j",
            "Ç³": "dz",
            "Ç†": "dz",
            "Ã©": "e",
            "Ä•": "e",
            "Ä›": "e",
            "È©": "e",
            "á¸": "e",
            "Ãª": "e",
            "áº¿": "e",
            "á»‡": "e",
            "á»": "e",
            "á»ƒ": "e",
            "á»…": "e",
            "á¸™": "e",
            "Ã«": "e",
            "Ä—": "e",
            "áº¹": "e",
            "È…": "e",
            "Ã¨": "e",
            "áº»": "e",
            "È‡": "e",
            "Ä“": "e",
            "á¸—": "e",
            "á¸•": "e",
            "â±¸": "e",
            "Ä™": "e",
            "á¶’": "e",
            "É‡": "e",
            "áº½": "e",
            "á¸›": "e",
            "ê«": "et",
            "á¸Ÿ": "f",
            "Æ’": "f",
            "áµ®": "f",
            "á¶‚": "f",
            "Çµ": "g",
            "ÄŸ": "g",
            "Ç§": "g",
            "Ä£": "g",
            "Ä": "g",
            "Ä¡": "g",
            "É ": "g",
            "á¸¡": "g",
            "á¶ƒ": "g",
            "Ç¥": "g",
            "á¸«": "h",
            "ÈŸ": "h",
            "á¸©": "h",
            "Ä¥": "h",
            "â±¨": "h",
            "á¸§": "h",
            "á¸£": "h",
            "á¸¥": "h",
            "É¦": "h",
            "áº–": "h",
            "Ä§": "h",
            "Æ•": "hv",
            "Ã­": "i",
            "Ä­": "i",
            "Ç": "i",
            "Ã®": "i",
            "Ã¯": "i",
            "á¸¯": "i",
            "á»‹": "i",
            "È‰": "i",
            "Ã¬": "i",
            "á»‰": "i",
            "È‹": "i",
            "Ä«": "i",
            "Ä¯": "i",
            "á¶–": "i",
            "É¨": "i",
            "Ä©": "i",
            "á¸­": "i",
            "êº": "d",
            "ê¼": "f",
            "áµ¹": "g",
            "êžƒ": "r",
            "êž…": "s",
            "êž‡": "t",
            "ê­": "is",
            "Ç°": "j",
            "Äµ": "j",
            "Ê": "j",
            "É‰": "j",
            "á¸±": "k",
            "Ç©": "k",
            "Ä·": "k",
            "â±ª": "k",
            "êƒ": "k",
            "á¸³": "k",
            "Æ™": "k",
            "á¸µ": "k",
            "á¶„": "k",
            "ê": "k",
            "ê…": "k",
            "Äº": "l",
            "Æš": "l",
            "É¬": "l",
            "Ä¾": "l",
            "Ä¼": "l",
            "á¸½": "l",
            "È´": "l",
            "á¸·": "l",
            "á¸¹": "l",
            "â±¡": "l",
            "ê‰": "l",
            "á¸»": "l",
            "Å€": "l",
            "É«": "l",
            "á¶…": "l",
            "É­": "l",
            "Å‚": "l",
            "Ç‰": "lj",
            "Å¿": "s",
            "áºœ": "s",
            "áº›": "s",
            "áº": "s",
            "á¸¿": "m",
            "á¹": "m",
            "á¹ƒ": "m",
            "É±": "m",
            "áµ¯": "m",
            "á¶†": "m",
            "Å„": "n",
            "Åˆ": "n",
            "Å†": "n",
            "á¹‹": "n",
            "Èµ": "n",
            "á¹…": "n",
            "á¹‡": "n",
            "Ç¹": "n",
            "É²": "n",
            "á¹‰": "n",
            "Æž": "n",
            "áµ°": "n",
            "á¶‡": "n",
            "É³": "n",
            "Ã±": "n",
            "ÇŒ": "nj",
            "Ã³": "o",
            "Å": "o",
            "Ç’": "o",
            "Ã´": "o",
            "á»‘": "o",
            "á»™": "o",
            "á»“": "o",
            "á»•": "o",
            "á»—": "o",
            "Ã¶": "o",
            "È«": "o",
            "È¯": "o",
            "È±": "o",
            "á»": "o",
            "Å‘": "o",
            "È": "o",
            "Ã²": "o",
            "á»": "o",
            "Æ¡": "o",
            "á»›": "o",
            "á»£": "o",
            "á»": "o",
            "á»Ÿ": "o",
            "á»¡": "o",
            "È": "o",
            "ê‹": "o",
            "ê": "o",
            "â±º": "o",
            "Å": "o",
            "á¹“": "o",
            "á¹‘": "o",
            "Ç«": "o",
            "Ç­": "o",
            "Ã¸": "o",
            "Ç¿": "o",
            "Ãµ": "o",
            "á¹": "o",
            "á¹": "o",
            "È­": "o",
            "Æ£": "oi",
            "ê": "oo",
            "É›": "e",
            "á¶“": "e",
            "É”": "o",
            "á¶—": "o",
            "È£": "ou",
            "á¹•": "p",
            "á¹—": "p",
            "ê“": "p",
            "Æ¥": "p",
            "áµ±": "p",
            "á¶ˆ": "p",
            "ê•": "p",
            "áµ½": "p",
            "ê‘": "p",
            "ê™": "q",
            "Ê ": "q",
            "É‹": "q",
            "ê—": "q",
            "Å•": "r",
            "Å™": "r",
            "Å—": "r",
            "á¹™": "r",
            "á¹›": "r",
            "á¹": "r",
            "È‘": "r",
            "É¾": "r",
            "áµ³": "r",
            "È“": "r",
            "á¹Ÿ": "r",
            "É¼": "r",
            "áµ²": "r",
            "á¶‰": "r",
            "É": "r",
            "É½": "r",
            "â†„": "c",
            "êœ¿": "c",
            "É˜": "e",
            "É¿": "r",
            "Å›": "s",
            "á¹¥": "s",
            "Å¡": "s",
            "á¹§": "s",
            "ÅŸ": "s",
            "Å": "s",
            "È™": "s",
            "á¹¡": "s",
            "á¹£": "s",
            "á¹©": "s",
            "Ê‚": "s",
            "áµ´": "s",
            "á¶Š": "s",
            "È¿": "s",
            "É¡": "g",
            "á´‘": "o",
            "á´“": "o",
            "á´": "u",
            "Å¥": "t",
            "Å£": "t",
            "á¹±": "t",
            "È›": "t",
            "È¶": "t",
            "áº—": "t",
            "â±¦": "t",
            "á¹«": "t",
            "á¹­": "t",
            "Æ­": "t",
            "á¹¯": "t",
            "áµµ": "t",
            "Æ«": "t",
            "Êˆ": "t",
            "Å§": "t",
            "áµº": "th",
            "É": "a",
            "á´‚": "ae",
            "Ç": "e",
            "áµ·": "g",
            "É¥": "h",
            "Ê®": "h",
            "Ê¯": "h",
            "á´‰": "i",
            "Êž": "k",
            "êž": "l",
            "É¯": "m",
            "É°": "m",
            "á´”": "oe",
            "É¹": "r",
            "É»": "r",
            "Éº": "r",
            "â±¹": "r",
            "Ê‡": "t",
            "ÊŒ": "v",
            "Ê": "w",
            "ÊŽ": "y",
            "êœ©": "tz",
            "Ãº": "u",
            "Å­": "u",
            "Ç”": "u",
            "Ã»": "u",
            "á¹·": "u",
            "Ã¼": "u",
            "Ç˜": "u",
            "Çš": "u",
            "Çœ": "u",
            "Ç–": "u",
            "á¹³": "u",
            "á»¥": "u",
            "Å±": "u",
            "È•": "u",
            "Ã¹": "u",
            "á»§": "u",
            "Æ°": "u",
            "á»©": "u",
            "á»±": "u",
            "á»«": "u",
            "á»­": "u",
            "á»¯": "u",
            "È—": "u",
            "Å«": "u",
            "á¹»": "u",
            "Å³": "u",
            "á¶™": "u",
            "Å¯": "u",
            "Å©": "u",
            "á¹¹": "u",
            "á¹µ": "u",
            "áµ«": "ue",
            "ê¸": "um",
            "â±´": "v",
            "êŸ": "v",
            "á¹¿": "v",
            "Ê‹": "v",
            "á¶Œ": "v",
            "â±±": "v",
            "á¹½": "v",
            "ê¡": "vy",
            "áºƒ": "w",
            "Åµ": "w",
            "áº…": "w",
            "áº‡": "w",
            "áº‰": "w",
            "áº": "w",
            "â±³": "w",
            "áº˜": "w",
            "áº": "x",
            "áº‹": "x",
            "á¶": "x",
            "Ã½": "y",
            "Å·": "y",
            "Ã¿": "y",
            "áº": "y",
            "á»µ": "y",
            "á»³": "y",
            "Æ´": "y",
            "á»·": "y",
            "á»¿": "y",
            "È³": "y",
            "áº™": "y",
            "É": "y",
            "á»¹": "y",
            "Åº": "z",
            "Å¾": "z",
            "áº‘": "z",
            "Ê‘": "z",
            "â±¬": "z",
            "Å¼": "z",
            "áº“": "z",
            "È¥": "z",
            "áº•": "z",
            "áµ¶": "z",
            "á¶Ž": "z",
            "Ê": "z",
            "Æ¶": "z",
            "É€": "z",
            "ï¬€": "ff",
            "ï¬ƒ": "ffi",
            "ï¬„": "ffl",
            "ï¬": "fi",
            "ï¬‚": "fl",
            "Ä³": "ij",
            "Å“": "oe",
            "ï¬†": "st",
            "â‚": "a",
            "â‚‘": "e",
            "áµ¢": "i",
            "â±¼": "j",
            "â‚’": "o",
            "áµ£": "r",
            "áµ¤": "u",
            "áµ¥": "v",
            "â‚“": "x"
        };
        var totalAttemptsCount = 20;
        var attemptsCount = 0;
        var batchesCount = 1;
        var loadedStyle = false;



        // Globals
        jQuery={ inArray:function(v,a){return a.indexOf(v);}};
        if (typeof jQuery.MidasInsight == 'undefined')
            jQuery.MidasInsight = function() {
                //this.keyphrase = 'sony vaio';
                this.incomingSocialItems = [];
            };

        jQuery.MidasInsight.initTime = new Date();
        if (typeof jQuery.MidasInsight.ObjDictionary == 'undefined') jQuery.MidasInsight.ObjDictionary = {};

        // detect mobile and other small devices

        // convert the 1 to 100 numeric score to text
        jQuery.MidasInsight.getScoreAsText = function(score) {
            var s = '';
            if (score < 40) s = window.langDictionary[window.MI_defaults.lang].scores[0];
            else if (score < 55) s = window.langDictionary[window.MI_defaults.lang].scores[1];
            else if (score < 78) s = window.langDictionary[window.MI_defaults.lang].scores[2];
            else if (score < 89) s = window.langDictionary[window.MI_defaults.lang].scores[3];
            else if (score < 101) s = window.langDictionary[window.MI_defaults.lang].scores[4];
            if (s.length > 6) s = '<span style="display: block;white-space: nowrap;font-size: 14px;">' + s + '</span>';
            return s;
        }

        // bind events

        // creates the sources star rankings panel
        jQuery.MidasInsight.pieChart = function(elm, data, preview) {

            if (typeof preview == 'undefined') preview = false;
            var container = elm;
            var piedata = data;
            var ispreview = preview;
            ispreview = true;
            var ispieshown = !preview;
            if (typeof piedata == 'undefined' || piedata.length == 0) {
                container.css('display', 'none');
                return;
            }

            var colors = ['#008000', '#92c83e', '#FFA500', '#ff9955', '#ff0000', '#00aa00', '#00ff00', '#aaaaaa', '#ff9955', '#aa0000'];

            var h = '';
            if (!ispreview)
                h += '<div class="mi_pie_caption">Feels Expressed at ' + piedata.length + ' Sources</div>';

            h += '<div style="width: 100%;">';
            h += '<div class="mi_pielegend_container">';
            h += '<table style="width: 0px;position:absolute;border-collapse: initial;-webkit-box-sizing: initial !important;-moz-box-sizing: initial !important;box-sizing: initial !important;border-collapse: initial !important;border-spacing: initial !important;' + (window.MI_defaults.RTL == 'true' ? 'left' : 'left') + ':' + (piedata.length > 3 && jQuery.MidasInsight.ShowAnimations() ? ispreview ? 16 : 200 : 0) + 'px;text-align:center;line-height:15px;' + (window.MI_defaults.RTL == 'true' ? 'nodirection:rtl' : '') + '"><tr>';
            var tot = 0;
            var linked_sources = ['Trip Advisor', 'Yelp'];
            if (window.MI_defaults.allowExternalLinks == 'false') linked_sources = [];
            for (var i = 0; i < piedata.length; i++) {
                tot += piedata[i].count;
                // Commercial sites shouldn't have links as they are potential competitors.
                if (jQuery.inArray(piedata[i].name, linked_sources) == -1) piedata[i].link = '';

            }
            for (var i = 0; i < piedata.length; i++) {
                if (piedata[i].count < 2 && piedata[i].name != 'cnet' || piedata[i].name == "Trip Advisor") continue;
                h += '  <td class="mi_sumblock" style="color: ' + piedata[i].color + ';text-align:center;' + (piedata[i].link ? 'cursor:pointer;" onclick="window.open(\'//' + piedata[i].link + '\',\'_blank\');"' : '"') + '>';
                h += '<table class="mi_chartData" style="max-width: 80px;" data-ind="' + i + '" > ';
                h += '<tbody>';
                h += '<tr style="color: ' + piedata[i].color + '">';
                h += '    <td meta-color="' + colors[(i * 2) % 9] + '" class="mi_source_logo mi_source_logo_' + piedata[i].name.replace(' ', '').replace('&', 'and').toLowerCase() + '" style="' + (!isNaN(piedata[i].rating) ? '' : '-webkit-box-reflect: below -4px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.5)));box-shadow: 0px 3px 4px -5px #000;') + '">' + '<div style="color: #858585;height: 15px;max-width:100px;overflow:hidden;">' + piedata[i].name.replace(' ', '&nbsp;') + '</div></td>'; //piedata[i].name.replace(' ', '&nbsp;')
                h += '<td  meta-color="' + colors[(i * 2) % 9] + '" class="">' + piedata[i].count + '</td>';
                h += '</tr>';
                h += '</tbody>';
                h += '</table>';
                h += '<div class="" style="line-height:' + (!isNaN(piedata[i].rating) ? 15 : 15) + 'px;direction: ltr!important;">';
                var tr = Math.floor((piedata[i].rating + 10) / 20);
                if (jQuery.inArray(piedata[i].name, ["Twitter", "Pinterest", "Youtube", "Flickr"]) > -1) {
                    if (tr == 4) tr = 5;
                    if (tr == 3) tr = 4;
                    if (tr < 3) tr = 3;
                }
                h += '<span style="display: block;' + (isNaN(piedata[i].rating) ? '' : 'background-image:url(http://d34p6saz4aff9q.cloudfront.net/images/star' + tr + '.png);') + 'position: absolute;margin-' + (window.MI_defaults.RTL == 'true' ? 'right' : 'left') + ': 8px;width:60px;height:11px;"></span>'; //' + (isNaN(piedata[i].rating) ? piedata[i].name : '') + '
                if (window.MI_defaults.RTL == 'true')
                    h += '<br/><div class="mi_mentions_count" style="font-size:12px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="">' + window.langDictionary[window.MI_defaults.lang].mentions + '</td><td align="left">&nbsp;' + piedata[i].count + '&nbsp;</td></tr></table></div></div>';
                else
                    h += '<br/><div class="mi_mentions_count" style="font-size:12px;direction: ltr!important;">' + piedata[i].count + '&nbsp;' + window.langDictionary[window.MI_defaults.lang].mentions.split(' ')[0] + '</div></div>';
                h += '</td>';

                var sr = jQuery.MidasInsight.getScoreAsText(piedata[i].rating);
                piedata[i]['desc'] = '<span style="color: ' + piedata[i].color + ';">' + piedata[i].count + ' ' + piedata[i].name + ' reviewers, ' +
                    Math.round(piedata[i].count * 100 / tot) + '% of all mentions,<br/> feel <b><u>' + sr + '</u></b> about it. <a href="#" style="color:' +
                    piedata[i].color + ';nc: #49b7e6;text-decoration: none;">See all <span style="font-size:24px;line-height: 4px;top: 7px;position: relative;">&#65515;</span></a></span>';
            }
            h += '</tr></table>';
            h += '    </div>';
            if (piedata.length > 3 && !jQuery.MidasInsight.isMobileDevice()) {
                h += '    <div  class="mi_legend_left">&lsaquo;</div> ';
                h += '    <div class="mi_legend_right">&rsaquo;</div>';
            }
            h += ' </div>';
            if (!ispreview)
                h += '       <canvas class="mi_pie_chart" width="368" height="' + (ispreview ? 200 : 100) + '" style="margin-top:' + (ispreview ? 30 : 60) + 'px;padding-bottom:' + (ispreview ? 30 : 0) + 'px;"></canvas>';
            if (ispreview)
                h += '<div class="mi_pie_description"></div>';
            return h;
        };

        // plug-in static functions
        // and utility methods
        jQuery.MidasInsight.normalizeKeyPhrase = function(keyphrase) {
            var kf = keyphrase;
            // Map Latin characters, e.g. Ã->A, and remove other UTF-8 chars
            kf = kf.replace(/[^\x00-\x80]/g,
                function(a) {
                    return (a in latin_map) ? latin_map[a] : '';
                }
            );
            // Convert to lower case
            kf = kf.toLowerCase();
            // Remove special characters
            //kf = kf.replace(/[^a-z0-9]+/gi, ' ');
            // Remove pipes
            //kf = kf.replace('|', ' ');
            // Escape ampersands
            kf = kf.replace('&', '%26');
            //escape "
            kf = kf.replace('"', '');
            // Trim spaces
            kf = kf.replace(/\s+/gi, ' ').trim();
            return kf;
        }
        jQuery.MidasInsight.getIDfromNormalizedKeyPhrase = function(keyphrase) {
            var kfid = keyphrase.toLowerCase();
            kfid = kfid.replace(/%26/g, '&');
            kfid = kfid.replace(/[^a-z0-9\|]/gi, ' ');
            kfid = kfid.replace(/\|/gi, '_');
            kfid = kfid.replace(/\s+/gi, '_');
            return kfid;
        }
        jQuery.MidasInsight.prepareText = function(itemText, baseid) {
            var options = jQuery("[mi_kfid='" + baseid + "']")[0].MidasInsight.options;
            while (itemText.indexOf('<br/>') == 0) itemText = itemText.substring(5, itemText.length - 5);
            while (itemText.indexOf('<br/>') == itemText.length - 5) itemText = itemText.substring(0, itemText.length - 5);
            while (itemText.indexOf('<br/><br/>') == 0) itemText = itemText.replace('<br/><br/>', '<br/>');
            if (options.layout == "inlinepanel" && (typeof options.collapseLines == 'undefined' || !options.collapseLines || options.collapseLines == 'false')) return itemText;

            var lines = itemText.length / 35;
            lines += itemText.split('<br/>').length - 1;
            var maxlines = typeof options.collapseLines == 'undefined' ? 5 : options.collapseLines == 'true' || options.collapseLines === true ? 1 : parseInt(options.collapseLines);
            if (((lines > maxlines && !jQuery.MidasInsight.isMobileDevice()) || (lines > 3 && jQuery.MidasInsight.isMobileDevice())) && itemText.indexOf('MI_readmore') == -1 && itemText.indexOf('mi_resulttext') == -1) {
                itemText = '<div class="mi_inner_resulttext" style="">' + itemText + '</div><div class="MI_readmore" onclick="window.MI_logUsage(\'read_more\',\'' + baseid + '\');jQuery(this).hide();jQuery(this).prev().height(\'auto\');event.stopPropagation();return false;">read more</div>';
            }
            return itemText;
        }
        jQuery.MidasInsight.normalizeJsonResponse = function(itemText) {
            if (itemText.length > 302) itemText = itemText.substring(0, 300) + '...';
            var r = /\\u([\d\w]{4})/gi;
            itemText = itemText.replace(r, function(match, grp) {
                return String.fromCharCode(parseInt(grp, 16));
            });
            itemText = unescape(itemText);
            while (itemText && itemText.indexOf('Ã¢â‚¬â€œ') > 0) itemText = itemText.replace('Ã¢â‚¬â€œ', '-');
            itemText = unescape(encodeURIComponent(itemText.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, '').split('').reverse().join('').replace(/[\uDC00-\uDFFF](?![\uD800-\uDBFF])/g, '').split('').reverse().join('')));
            while (itemText && itemText.indexOf('ÃƒÂ‚Ã‚') > 0) itemText = itemText.replace('ÃƒÂ‚Ã‚', '');
            while (itemText && itemText.indexOf('ÃƒÂ¢Ã¢Â‚Â¬Ã¢Â„Â¢') > 0) itemText = itemText.replace('ÃƒÂ¢Ã¢Â‚Â¬Ã¢Â„Â¢', '\'');
            while (itemText && itemText.indexOf('ÃƒÂƒÃ‚Â¼') > 0) itemText = itemText.replace('ÃƒÂƒÃ‚Â¼', 'u');
            while (itemText && itemText.indexOf('\\\\') > 0) itemText = itemText.replace('\\\\', '\\');
            while (itemText && itemText.indexOf('\\r') > 0) itemText = itemText.replace('\\r', '');
            while (itemText && itemText.indexOf('\\n') > 0) itemText = itemText.replace('\\n', '<br/>');
            while (itemText && itemText.indexOf('\\') > 0) itemText = itemText.replace('\\', '');
            itemText = itemText.replace(/[^\x00-\x80]/g,
                function(a) {
                    return typeof(latin_map[a]) == 'undefined' ? '' : jQuery.inArray(a, latin_map) ? '' : a; // '<b>' + latin_map[a] + '</b>'
                }
            );
            return itemText;

        }
        jQuery.MidasInsight.parseSourceSpecialCharachters = function(itemText, itemSource) {
            if (itemSource == 'www.twitter.com') {
                itemText = itemText.replace(new RegExp('#(\\w+)', 'gi'),
                    "<a href=\"#\" onclick=\"window.MI_logUsage('clicked_link');jQuery.MidasInsight.openExternalLink('http://www.twitter.com/hashtag/$1','_blank');return false;\" class=\"mi_resultslink\">#$1</a> ");
                itemText = itemText.replace(new RegExp('@(\\w+)', 'gi'),
                    "<a href=\"#\" onclick=\"window.MI_logUsage('clicked_photo');jQuery.MidasInsight.openExternalLink('http://www.twitter.com/$1','_blank');return false;\"  class=\"mi_resultslink\">@$1</a> ");
            }
            return itemText;
        }
        jQuery.MidasInsight.getStyle = function(className) {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var classes = document.styleSheets[i].rules || document.styleSheets[i].cssRules
                    if (classes) {
                        for (var x = 0; x < classes.length; x++) {
                            if (classes[x].selectorText == className) {
                                if (classes[x].cssText)
                                    return (classes[x].cssText)
                                else
                                    return (classes[x].style.cssText);
                            }
                        }
                    }
                }
            }
            // sets the position and size of the panel


        // UX generation

        var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        jQuery.MidasInsight.createPanel = function(kfid) {
            var o = json[Object.keys(json)[0]];
            var count = 0;
            if (typeof o.volume != 'undefined') {
                for (var i = 0; i < o.volume.length; i++) {
                    count += parseInt(o.volume[i].count);
                }
            }
            if (typeof o.meta != 'undefined') {
                for (var i = 0; i < o.meta.length; i++) {
                    count += parseInt(o.meta[i].count);
                }
            }
            o.basedon = count;

            var options = window.MI_defaults;


            // mobile panel
            var rtl_class = (options.RTL == 'true') ? '_rtl' : '';
            var orientation = ''
            if (options.RTL == 'true') {
                orientation = '_rtl ';
            }
            else if (options.gaugeOrientation == 'right') {
                orientation = ' MI_tabs_right';
            }

            // footer;
            var footerContent = '';
//res.write('window.MI_defaults.template:'+window.MI_defaults.template+JSON.stringify(window.tempDictionary[window.MI_defaults.template].panelLayout));
            for (i = 0; i < window.tempDictionary[window.MI_defaults.template].panelLayout.footer.length; i++) {
                footerContent += jQuery.MidasInsight.getTemplate(window.tempDictionary[window.MI_defaults.template].panelLayout.footer[i], kfid);
            }
            if (footerContent != '') footerContent = window.tempDictionary[window.MI_defaults.template].panel.footer.header + footerContent;

            //header
            var p = '';
            var headerContent = ""
            headerContent = window.tempDictionary[window.MI_defaults.template].panel.header.header
                .replace('@@@count', window.langDictionary[window.MI_defaults.lang].basedon.replace('%d', count))
                .replace('@@@textgrade', jQuery.MidasInsight.getScoreAsText(o.sentiment))
                .replace('@@@decgrade', Math.round(o.sentiment) / 10)
                .replace('@@@clsgrade', Math.round(o.sentiment / 10))
                .replace('@@@clsgrade', Math.round(o.sentiment / 10))
                .replace(/@@@width/gi, (options.panelWidth));
            if (options.frameElements.indexOf('noheader') > -1) {
                headerContent = headerContent.replace('@@@exttrastyle', 'display:none;');
            }
            if (options.frameElements.indexOf('noheaderPhoto') > -1) {
                headerContent = headerContent.replace('class="mi_preview_images" style="', 'class="mi_preview_images" style="display:none;');
            }

            for (i = 0; i < window.tempDictionary[window.MI_defaults.template].panelLayout.header.length; i++) {
                headerContent += jQuery.MidasInsight.getTemplate(window.tempDictionary[window.MI_defaults.template].panelLayout.header[i], kfid);
            }
            if (o.photos.length > 0) {
                headerContent = headerContent.replace(/@@@previewimgsrc/g, o.photos[0].picture)
            }
            headerContent += window.tempDictionary[window.MI_defaults.template].panel.header.footer;
            // tools tabs
            var tabs = ''
                //toDo 
            tabs = jQuery.MidasInsight.createTabsMenu(options.tabsType, kfid, o)

            // scrollables
            var scrollableContent = "";
            scrollableContent += window.tempDictionary[window.MI_defaults.template].scrollables.header.replace(/@@@kfid/g, kfid);
            if (jQuery.inArray('header', window.tempDictionary[window.MI_defaults.template].panelLayout.content) == -1)
                p += headerContent;
            else {
                p += jQuery.MidasInsight.getTemplate('mobileheader', kfid);
                scrollableContent += '<tr><td>' + headerContent + '</td></tr>';
            }
            //scrollable content
            if (jQuery.inArray('tags', options.frameElements) > -1 &&
                jQuery.inArray('mediaPreview', options.frameElements) > -1 &&
                jQuery.inArray('mediaPreview', options.frameElements) <
                jQuery.inArray('tags', options.frameElements)
            ) {
                //options.frameElements.persistImagePreview = true;

                //window.tempDictionary[window.MI_defaults.template].panelLayout.content = ["photos", "tags", "mentions"];
            }
            for (i = 0; i < window.tempDictionary[window.MI_defaults.template].panelLayout.content.length; i++) {
                var tt = window.tempDictionary[window.MI_defaults.template].panelLayout.content[i];
                if (tt == 'header') continue;
                var sc = jQuery.MidasInsight.getTemplate(tt, kfid);
                if (tt == 'photos' && jQuery.inArray('persistImagePreview', options.frameElements) > -1) p += '<table>' + sc + '</table>';
                else scrollableContent += sc;
            }
            if (options.layout != 'inlinepanel' && jQuery.MidasInsight.isMobileDevice())
                scrollableContent += '<tr><td><div align="center" style="text-align:center;width: 100%;" id="mipct_tblphotos_' + kfid + '" class="mi_scrolledcontent mi_friendsresults"><div id="mi_photosPanel_' + kfid + '"></div></div></td></tr>';
            else
                scrollableContent += '<tr><td>' + jQuery.MidasInsight.getTemplate("additionals", kfid) + '</td></tr>';

            scrollableContent += window.tempDictionary[window.MI_defaults.template].scrollables.footer;
            scrollableContent = scrollableContent.replace(/@@@kfid/g, kfid).replace(/@@@gaugeOrientation/g, (options.gaugeOrientation == 'right' ? 'mi_header_caption_right' : '') + '"' + (options.RTL == 'true' ? 'style="text-align:right;"' : '')).replace(/@@@grade/g, o.sentiment).replace(/@@@displayText/g, (options.displayText ? options.displayText : o.phrase.capitalize())).replace(/@@@orientation/g, orientation).replace(/@@@rtlClass/g, rtl_class).replace(/@@@ask/g, window.langDictionary[window.MI_defaults.lang].ask).replace(/@@@titleOrientation/g, (options.RTL == 'true' ? 'padding-right:32px!important;' : 'text-align:left;')).replace(/@@@optionsrtl/g, options.RTL == 'true' ? '' : '').replace(/@@@baseid/g, kfid);
            //jQuery.MidasInsight.ObjDictionary[kfid].scrollableContent = jQuery(scrollableContent).find('#mipct_tbldefault_' + kfid).html();
            // scrollableContent += window.tempDictionary[window.MI_defaults.template].scrollables.footer;
            //replace @@@ with content
            tabs = tabs.replace(/@@@inArrayMentions/g, ((jQuery.inArray('mentions', jQuery.MidasInsight.ObjDictionary[kfid].options.tabs) > -1 &&
                    window.MI_defaults.template != 'RASTA') ? '|' : '&nbsp;'))
                .replace(/@@@mentions/g, window.langDictionary[window.MI_defaults.lang].mentions)
                .replace(/@@@media/g, window.langDictionary[window.MI_defaults.lang].media)
                .replace(/@@@feelter/g, window.langDictionary[window.MI_defaults.lang].feelter).replace(/@@@comment/g, window.langDictionary[window.MI_defaults.lang].comment)
                //if (window.MI_defaults.template == 'RASTA') tabs = tabs.replace(/\&/g, '<br/>&');
            footerContent = footerContent.replace(/@@@kfid/g, kfid).replace(/@@@logo/, options.logo)
            p += scrollableContent;
            p += footerContent
                //var optionsrtl = ;
            if (jQuery.MidasInsight.isMobileDevice()) {
                //p = '<div style="position:fixed;bottom:0;    z-index: 9;">' +  tabs + '</div>' + p;
                //tabs = '';
            }
            p = p.replace(/@@@tabs/g, tabs).replace(/@@@kfid/g, kfid).replace(/@@@gaugeOrientation/g, (options.gaugeOrientation == 'right' ? 'mi_header_caption_right' : '') + '"' + (options.RTL == 'true' ? 'style="text-align:right;"' : '')).replace(/@@@grade/g, o.sentiment).replace(/@@@displayText/g, (options.displayText ? options.displayText : o.phrase.capitalize())).replace(/@@@orientation/g, orientation).replace(/@@@rtlClass/g, rtl_class).replace(/@@@ask/g, window.langDictionary[window.MI_defaults.lang].ask).replace(/@@@titleOrientation/g, (options.RTL == 'true' ? 'padding-right:32px!important;' : 'text-align:left;')).replace(/@@@optionsrtl/g, options.RTL == 'true' ? '' : '').replace(/@@@baseid/g, kfid);
            return p;

        }

        jQuery.MidasInsight.currentTag = '';
        var createSocialItem = function (data, baseid) {
            // create absolute url
            if (!(data.sourceURL.indexOf(data.source) > -1) && data.sourceURL.charAt[0] !== "/" && !(data.sourceURL.indexOf('www') > -1) && !(data.sourceURL.indexOf('http://') > -1 || data.sourceURL.indexOf('https://') > -1))//debugger
            {
                data.sourceURL = data.source + data.sourceURL;
            }
            // hilight when on tags
            var itemText = data.itemText;
            if (typeof data.hilights != 'undefined') {
                var hilight = "(" +
                            data.hilights.replace(/(\s)/gi, "\\b") //.replace(/\|/g, "),(")
                            + ")";
                var r = new RegExp(hilight, "igm");
                itemText = ('<span>' + itemText + '</span>').replace(/(>[^<]+<)/igm, function (a) {
                    return a.replace(r, "<strong style='font-weight:bold;color:#555;'>$1</strong>");
                });
            }
            //add fix to item text no hr allowed
            itemText = itemText.replace(/<\/hr>/g, "");
            data.moditemText = itemText;
            if (typeof data.itemPublisher == 'undefined') data.itemPublisher = '';
            var metaicon;
            var domain = (data.source.replace('.com', '').replace('www.', '').replace('.', '').replace('.', '')).trim();
            if (typeof window.tempDictionary[window.MI_defaults.template].socialItem.metaIcon != 'undefined')
                metaicon = window.tempDictionary[window.MI_defaults.template].socialItem.metaIcon(data, baseid);
            else
                metaicon = "<div class=\"MI_SourceIcon MI_" + domain + "\" mi_data-tooltip=\"" + (data.source.replace('.com', '').replace('www.', '')) + "\"></div>";
            data.metaicon = metaicon;
            data.click = 'window.MI_logUsage(\'clicked_item\');jQuery.MidasInsight.openExternalLink(\'' + data.sourceURL + '\', \'' + data.ksid + '\', \'' + json.phrase + '\')';

            // cascade si templates
            //console.log(domain);
            if (typeof window.tempDictionary[window.MI_defaults.template]['socialItem' + domain + 'Item'] == 'function')
                window.tempDictionary[window.MI_defaults.template]['socialItem' + domain + 'Item'](data, baseid);
            else if (typeof window.tempDictionary['socialItem' + domain + 'Item'] == 'function')
                window.tempDictionary['socialItem' + domain + 'Item'](data, baseid);
            else
                window.tempDictionary.socialItem(data, baseid);

            var si = data.modsi;
            delete data.modsi;
            delete data.moitemText;
            delete data.metaicon;
            delete data.click;
            return si;

        }
        jQuery.MidasInsight.getTemplate = function(tempName, kfid) {
            var options = window.MI_defaults;

            function tagcount(c, s, t) {
                var r;
                if (t == 'praises') {
                    r = Math.round(c * s / 100);
                    r = 'Positive';
                }
                else {
                    r = Math.round(c * (100 - s) / 100);
                    r = 'Negative';
                }
                //if (r > 1000) r = Math.round(r / 1000) + 'k';
                return r;
            }
            var o = json[Object.keys(json)[0]];
            var p = "";
            if (tempName == "mobileheader") {
                return '<table style="position: fixed;width: 100vw;text-align: center;height: 40px;background-color: #f1f1f1!important;z-index: 99;"><tbody><tr><td style="text-align:left;color:#858585;padding-left:10px;" onclick="jQuery.MidasInsight.hidePanel(\'' + kfid + '\');" width="33%">Close</td><td width="33%"><img src="//d34p6saz4aff9q.cloudfront.net/img/mobilelogo.jpg"></td><td width="33%" style="text-align:right;color:#858585;padding-right:10px;" class="mobilesharebutton">Share' +
                    '<div class="mi_mobilesharelinkswrapper" ><table cellpadding="0" cellspacing="0" style="width: 100%;text-align: center;" class="mi_mobilesharelinks"><tbody><tr>' +
                    '<td><a onclick="window.MI_logUsage(\'share\');" href="whatsapp://send?text=Look%20what%20I%20found: ' + escape(document.location.href) + '" target="_blank" data-action="share/whatsapp/share"><img src="//d34p6saz4aff9q.cloudfront.net/img/mobilesocialwhatsup.jpg"></a></td>' +
                    '<td><a onclick="window.MI_logUsage(\'share\');" href="mailto:?Subject=Look%20what%20I%20found&Body=' + escape(document.location.href) + '" target="_blank"><img src="//d34p6saz4aff9q.cloudfront.net/img/mobilesocialmail.jpg"></a></td>' +
                    '<td><a onclick="window.MI_logUsage(\'share\');" href="https://www.facebook.com/sharer/sharer.php?u=' + escape(document.location.href) + '" target="_blank"><img src="//d34p6saz4aff9q.cloudfront.net/img/mobilesocialfacebook.jpg"></a></td>' +
                    '<td><a onclick="window.MI_logUsage(\'share\');" href="https://twitter.com/intent/tweet?url=' + escape(document.location.href) + '&amp;text=Look what I found" target="_blank" title="Tweet"><img src="//d34p6saz4aff9q.cloudfront.net/img/mobilesocialtwitter.jpg"></a></td>' +
                    '<td><a onclick="window.MI_logUsage(\'share\');" href="https://plus.google.com/share?url=' + escape(document.location.href) + '" target="_blank" title="Share on Google+"><img src="//d34p6saz4aff9q.cloudfront.net/img/mobilesocialgoogleplus.jpg"></a></td></tr></tbody></table></div>' +
                    '</td></tr></tbody></table>';
            }
            else if (tempName == "stars") {
                
                if (options.frameElements.indexOf('statsPreview') > -1 && options.tabs.indexOf('mentions') > -1 
                && o.meta.length > 0) {
                    return jQuery.MidasInsight.createStartsSlide(options.starsType, kfid)
                }
                else {
                    return "";
                }
            }
            else if (tempName == "photos") {
                // photos
                var photocount = 0;
                if (o.photos.length > 4) {
                    var photosChart = window.tempDictionary[window.MI_defaults.template].panel.slidercontainer.replace(/@@@kfid/g, kfid);
                    var photonum = 17;
                    if (o.photos.length < 17)
                        photonum = o.photos.length
                    for (var i = 0; i < photonum; i++) {
                        /*if (i > -1 &&
                            (window.MI_defaults.vertical == 'travel' &&
                             (o.photos[i].message + o.photos[i].publisher).toLowerCase().indexOf('hotel') == -1))
                            continue;*/
                        photosChart += '<td align="center" style="display:none;vertical-align:top;"><div class="mi_thumbcontainer" style="nwidth:0px;left:100px;height:65px;overflow:hidden;transition: left 1s, width 1s;position:relative;-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;" unselectable="on" onselectstart="return false;">';
                        photosChart += '<img src="' + (i == -1 ? '//d34p6saz4aff9q.cloudfront.net/images/play_slideshow.jpg' : o.photos[i].picture) + '" ' +
                            ' onload="' +
                            ';jQuery(this).parent().parent().fadeIn(2000);jQuery(this).parent().css(\'width\',jQuery(this).width()+\'px\').css(\'left\',\'0px\');' +
                            ' if(jQuery.inArray(\'photos\', jQuery.MidasInsight.ObjDictionary[\'' + kfid + '\'].options.tabs) ==-1) {' +
                            ' jQuery.MidasInsight.AddtoGallery(\'' + kfid + '\',{ href: \'' + o.photos[i].picture + '\', title: \'\' });'
                            //var tind;if(jQuery.MidasInsight.ObjDictionary[\'' + kfid + '\'].gallery.filter(function(a,b){if(a.href==\'' + o.photos[i].picture + '\'){'
                            //+'      tind=-b;return true}return false}).length==0){'
                            //+ '         jQuery.MidasInsight.ObjDictionary[\'' + kfid + '\'].gallery.push({ href: \'' + o.photos[i].picture + '\', title: \'\' });'
                            //+ '         tind=(-(jQuery.MidasInsight.ObjDictionary[\'' + kfid + '\'].gallery.length-1))};console.log(tind);'
                            +
                            ' jQuery(this).attr(\'onclick\',\'jQuery.MidasInsight.ShowLightBoxURL(\\\'' + o.photos[i].picture + '\\\',\\\'' + kfid + '\\\')\');}"' +
                            '" onerror="jQuery(this).parent().css(\'width\',\'0px\');jQuery(this).parent().parent().delay(1000).fadeOut(0,function(){jQuery(this).remove();})//;jQuery.MidasInsight.HandleMissingImage(\'preview\',this)"  valign="top" class="MI_previewPhoto' + (i == -1 ? ' MI_previewPhoto_playbutton' : '') + '" style="-moz-user-select: none; n-webkit-user-select: none; -ms-user-select:none; nuser-select:none;" nunselectable="on" nonselectstart="return false;" onmousedown="return false;"/>';
                        photosChart += '</div></td>';
                        photocount++;
                    }
                    photosChart += '</tr></table>';
                    if (jQuery.inArray('mediaPreview', options.frameElements) > -1 && photocount > 2) { // && jQuery.inArray('photos', options.tabs) > -1) {
                        p += window.tempDictionary[window.MI_defaults.template].panel.photopreview.replace(/@@@kfid/g, kfid).replace(/@@@width/gi, (options.panelWidth));
                        p += (photosChart);
                        p += '</div></div></td></tr>';
                        if (typeof options.thumbsheight != 'undefined') {
                            p = p.replace(/65px/gi, options.thumbsheight + 'px');
                            p = p.replace(/border/gi, 'zz');
                            p = p.replace(/onclick/gi, 'canceledonclick');
                            p = p.replace(/style="/gi, 'style="height:' + options.thumbsheight + 'px;');

                        }
                        //jQuery.MidasInsight.ObjDictionary[kfid].tumbs = p;
                    }
                    return p;
                }
                else return "";

            }
            else if (tempName == "share") {
                if (window.MI_defaults.frameElements.indexOf('shareLinks') == -1) return '';
                p = window.tempDictionary[window.MI_defaults.template].panel.footer.share
                // var src = document.location.href;
                // var srcEnc = encodeURIComponent(src);
                // var txt = window.document.title;
                // var txtEnc = encodeURIComponent(txt);
                // p = p.format(srcEnc, txtEnc, txtEnc, txtEnc);
                return p
            }
            else if (tempName == "lmt") {
                //todo lmt integration
                p = window.tempDictionary[window.MI_defaults.template].panel.footer.lmt;
                return p
            }
            else if (tempName == "callForActions") {
                p = window.tempDictionary[window.MI_defaults.template].panel.footer.callForActions
                return p
            }
            else if (tempName == "tags") {
                if (jQuery.inArray('tags', options.frameElements) > -1) {
                    if (typeof o.tags != 'undefined' && typeof o.tags.socialItems != 'undefined' && o.tags.socialItems.length > 0) {
                        var tags = '';
                        //var tags = '';
                        var done = [];
                        var otags = {};
                        var otagItems = {};
                        var atags = [];
                        for (var i = 0; i < o.tags.socialItems.length; i++) {
                            var t = o.tags.socialItems[i];
                            if (typeof otagItems[t.tagGroup] == 'undefined')
                                otagItems[t.tagGroup] = '';
                            if (otagItems[t.tagGroup].indexOf('|' + t.tag) == -1) otagItems[t.tagGroup] += '|' + t.tag;

                        }
                        var vdiv = '<div style="left:0px;top: 10px;bottom: 10px;position: absolute;border-left: 1px solid #ddd;"></div>'
                        var cols = (typeof(window.MI_defaults.inqa) == 'undefined' || window.MI_defaults.inqa != 'true') && typeof options.columnscount != 'undefined' ? options.columnscount : false;
                        while (cols * 339 > options.panelWidth) cols--;

                        for (var i = 0; i < o.tags.socialItems.length; i++) {
                            var t = o.tags.socialItems[i];
                            if (jQuery.inArray(t.tagGroup + '_' + t.ksid, done) > -1) continue;
                            done[done.length] = t.tagGroup + '_' + t.ksid;
                            t.hilights = otagItems[t.tagGroup].substring(1);
                            var si = createSocialItem(t, kfid);



                            if (typeof otags[t.tagGroup] == 'undefined') {
                                //otags[t.tagGroup] = { count: 1, html: '', htmlrows: ['<tr class="mi_socialitemrow"><td colspan="2" id="mi_si_ksid_' + t.ksid + '" >' + si + '</td></tr>'], totalSentiment: parseInt(t.sentiment) };
                                otags[t.tagGroup] = {
                                    count: 1,
                                    html: '',
                                    htmlrows: ['<td colspan="2" valign="top" style="position:relative;width:' + (cols ? 100 / cols : '') + '%;" id="mi_si_ksid_' + t.ksid + '" >' + (cols ? vdiv : '') + si + '</td>'],
                                    totalSentiment: parseInt(t.sentiment)
                                };
                                atags[atags.length] = t.tagGroup;
                                //if (tags.indexOf('>' + t.tagGroup + '<') == -1) {
                            }
                            else {
                                otags[t.tagGroup].count++;
                                //otags[t.tagGroup].htmlrows[otags[t.tagGroup].htmlrows.length] = '<tr class="mi_socialitemrow"><td colspan="2" id="mi_si_ksid_' + t.ksid + '" >' + si + '</td></tr>';
                                otags[t.tagGroup].htmlrows[otags[t.tagGroup].htmlrows.length] = '<td colspan="2"  valign="top" style="position:relative;width:' + (cols ? 100 / cols : '') + '%;" id="mi_si_ksid_' + t.ksid + '" >' + (cols ? vdiv : '') + si + '</td>';
                                otags[t.tagGroup].totalSentiment += parseInt(t.sentiment);
                            }
                        }
                        var sentimenttags = '';
                        atags.sort(function(a, b) {
                            return a.toLowerCase() == 'business' || a.toLowerCase() == 'couples' || a.toLowerCase() == 'single' || a.toLowerCase() == 'family' || a.toLowerCase() == 'service' ? -1 : b.toLowerCase() == 'business' || b.toLowerCase() == 'couples' || b.toLowerCase() == 'single' || b.toLowerCase() == 'family' || b.toLowerCase() == 'service' ? 1 : Math.round(otags[b].totalSentiment / otags[b].count) - Math.round(otags[a].totalSentiment / otags[a].count)
                        });
                        for (var i = 0; i < atags.length; i++) {

                            for (var g = 0; g < otags[atags[i]].htmlrows.length; g++) {
                                var r = otags[atags[i]].htmlrows.sort(function(a, b) {
                                    return b.split('<strong').length - a.split('<strong').length
                                });
                                mp = '';
                                for (var i1 = 0; i1 < r.length; i1++) {

                                    if (i1 > 0 && !cols)
                                        mp += '<tr><td colspan="' + (cols ? 2 * cols : 2) + '" ><hr class="mihr"/></td></tr>';
                                    if (!cols || i1 % cols == 0) {
                                        mp += '<tr class="mi_socialitemrow">';
                                        mp += r[i1];
                                    }
                                    else {
                                        mp += r[i1]; //divider
                                    }
                                    if (!cols || i1 % cols == cols - 1 || i == o.socialItems.length) mp += '</tr>';
                                    // QA code 
                                    //if (typeof(window.MI_defaults.inqa) != 'undefined' && window.MI_defaults.inqa == 'true') mp += '<tr><td colspan="2" id="mi_si_ksid_qa_' + o.socialItems[i].ksid + '" ><span style="height:100%;position: relative;display: block;"><div class="qa_icon_container qa_container" style="position:absolute;left: 90%;bottom:0px;z-index:2;"><div class="qa_icon" style="z-index:1;" ondblclick="window.open(\'http://www.midasinsite.com/QAConsole.aspx?qaid=' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '&kp=' + escape(jQuery.MidasInsight.ObjDictionary[kfid].response.phrase) + '\',\'_blank\')" noondblclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'OK\',\'just OK\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">Feed<br/>back</div> <div style="" class="mi_qa_dialog"> <span class="qa_tab" style="color:green;">Great</span> <span class="qa_tab qa_tab_selected" style="color:green;">OK</span> <span class="qa_tab" style="color:orange;">Ehaa..</span> <span class="qa_tab" style="color:red;">Bad</span> <span class="qa_tab" style="color:red;">Terrible</span> <div style="position:relative;top:0px;padding:5px;left:0px;width:250px;background-color:#fefefe;border-radius:0px 0px 5px 5px;border:1px solid #777;border-top:none;"> <div style="padding-top:10px;"> <div class="qa_option" style="cursor:pointer;color:green;"><div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'great\',\'just great\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">This item is just great</div><div>Suitable for the hall of fame <br/>because: </div><textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;"  onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'great\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Save</div> </div> <div class="qa_option" style="display:block;color:green;cursor:pointer;"><div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'OK\',\'OK\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">This item is OK</div>' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '</div> <div class="qa_option"style="color:orange;"><div>This item is not so halpfull because: </div><div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'Ehaa\',\'LamLam\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">LamLam</div><textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'Ehaa\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Save</div></div> <div class="qa_option"style="color:red;">This item is bad because: <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'giberrish\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">The text is giberrish</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'missformed\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">Text is missformed</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'irrelevant\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It is not relevant</div> <div>Other</div> <textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Other</div> </div> <div class="qa_option"style="color:red;">This item terrible because: <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'commercial\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It is commercial in nature</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'wrongkeyphrase\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It concerns another product</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'foul\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It contains faul language</div> <div>Other</div> <textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Other</div> </div> </div> </div></div></div></span></td></tr>';

                                }
                                otags[atags[i]].html = '<tr><td><table style="width:100%">' + mp + '</table></td></tr>'; // r.join('<tr><td colspan="2" ><hr class="mihr"/></td></tr>');
                            }
                            //otags[atags[i]].html += '<tr style="height:100px;"><td colspan="2" ></td></tr>';
                            var score = Math.round(otags[atags[i]].totalSentiment / otags[atags[i]].count);
                            var color = 'rgb(' + Math.round((100 - score) * 510 / 100) + ',' + Math.min(255 - (score - 75) * 5, Math.round((score - 25) * 1020 / 100)) + ',0)';
                            if (atags[i].toLowerCase() == 'praises' || atags[i].toLowerCase() == 'run downs') {
                                //if (sentimenttags != '')

                                if (window.MI_defaults.template == 'RASTA') {
                                    sentimenttags += '<span class="mi_' + (atags[i].toLowerCase().replace(' ', '')) + ' mi_tag_' + (atags[i].toLowerCase().replace(' ', '')) + ' " nmi_data-tooltip="Show the ' + atags[i] + '" onclick="jQuery.MidasInsight.tagClicked(\'' + kfid + '\',\'' + atags[i] + '\')" class=\'mi_tag_' + (atags[i].toLowerCase().replace(' ', '_')) + ' mi_tag\' >' + tagcount(o.basedon, o.sentiment, atags[i].toLowerCase()) + '</span>';
                                }
                                else sentimenttags = '<span class="mi_tag_' + (atags[i].toLowerCase().replace(' ', '')) + '" nmi_data-tooltip="Show the ' + atags[i] + '" onclick="jQuery.MidasInsight.tagClicked(\'' + kfid + '\',\'' + atags[i] + '\')" class=\'mi_tag_' + (atags[i].toLowerCase().replace(' ', '_')) + ' mi_tag\' >' + (atags[i] == 'praises' ? 'Positive' : 'Negative') + '</span>' + sentimenttags;
                            }
                            else {
                                tags += window.tempDictionary[window.MI_defaults.template].panel.tag.replace(/@@@kfid/g, kfid).replace(/@@@atags/, atags[i]).replace(/@@@atagsreplace/g, (atags[i].toLowerCase().replace(' ', '_'))).replace(/@@@atagscap/g, atags[i].capitalize()).replace(/@@@color/g, color);
                            }
                            if (typeof jQuery.MidasInsight.ObjDictionary[kfid].tags == 'undefined') jQuery.MidasInsight.ObjDictionary[kfid].tags = {};
                            jQuery.MidasInsight.ObjDictionary[kfid].tags[atags[i]] = otags[atags[i]];
                        }
                        tags = '<span style="padding-left: 0!important;padding-right: 0!important;float: left;display: inline-block;background-color: transparent;text-align: center;width: 20px;    color: #7F7F7F;font-size: 20px;margin-top: -1px;" class="mi_opentags" onclick="var he=jQuery(\'#cpcnt_' + kfid + '\').find(\'.mi_tagscontainer\');if(!he.is(\'.mi_unhover\')) he.addClass(\'mi_unhover\'); else he.removeClass(\'mi_unhover\')">+</span><div class="mi_innertagscontainer"></div>' +
                            sentimenttags + '<span style="color: rgb(74, 183, 230);box-shadow: none;display:inline-block;float:right;display:inline-block!important;background-color:white;    margin-right: 5px;" class="mi_closetags" onclick="jQuery.MidasInsight.currentTag=\'\';jQuery.MidasInsight.tagClicked(\'' + kfid + '\',\'_clear\');return false;jQuery.MidasInsight.resetLayout(\'' + kfid + '\')" nonclick="jQuery(\'#mipct_tbldefault_' + kfid + '\').html(jQuery.MidasInsight.ObjDictionary[\'' + kfid + '\'].allMentions);return false;">Clear</span>' +
                            tags;

                        var fp = '<tr ><td id="mi_tags_' + kfid + '" colspan="2" style="width: 100%;overflow: hidden;"><div class="mi_tagscontainer">';
                        fp += (tags);
                        fp += '</div></td></tr>';
                        jQuery.MidasInsight.ObjDictionary[kfid].tagsSearch = fp;
                        //shahar

                        p += fp;

                    }
                    return p;
                }
                else {
                    return "";
                }

            }
            else if (tempName == "additionals") {
                var p = "";
                // friends panel
                p += '<table align="left" id="mipct_tblfriends_' + kfid + '" class="mi_results mi_scrolledcontent" style="width: 100%;display:none;nomax-width:500px;min-width:300px;width:100%;margin:0px;"></table>';
                // photos panel
                p += '<div align="center" style="text-align:center;width: 100%;" id="mipct_tblphotos_' + kfid + '" class="mi_scrolledcontent mi_friendsresults">';
                //if (jQuery.inArray('statsPreview', jQuery.MidasInsight.ObjDictionary[kfid].options.frameElements) > -1 && jQuery.inArray('mentions', jQuery.MidasInsight.ObjDictionary[kfid].options.tabs) == -1 && o.meta.length > 0) p += stars;

                p += '<div id="mi_photosPanel_' + kfid + '"></div></div>';
                // add feel
                p += '<table align="center" id="mipct_tbladdfeel_' + kfid + '" style="display:none;width: 100%;" class="mi_scrolledcontent"><tr><td align="center" style="nntext-align: center;"><center><div style="font-size: 18px;padding-top: 20px!important;width: 100%;position: relative;">What\'s your FEEL?<br><div id="mi_score_select_' + kfid + '" class="mi_score_select" style="cursor:move;-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;" unselectable="on" onselectstart="return false;"></div><br><div style="float:left;padding-left: 15px;">Your Name:</div><input id="mi_uname_' + kfid + '" value="" style="width: 93%;  border: 1px solid #ddd;"><br><div style="float:left;padding-left: 15px;padding-top: 15px;">Your Feel:</div><br><textarea id="mi_utext_' + kfid + '" style="width: 93%;height: 75px;border: 1px solid #ddd;z-index: 0;margin: 3px;padding: 2px;"></textarea><input type="button" style="width: 83px;word-wrap: normal;float: right;background: transparent;border: none;z-index: 5;position: relative;margin-right: 22px;color:rgb(73, 183, 230);cursor:pointer;" onclick="jQuery.MidasInsight.addSocialItem(jQuery(\'#mi_udbid_' + kfid + '\').val(),jQuery(\'#mi_uname_' + kfid + '\').val(),jQuery(\'#mi_urating_' + kfid + '\').val(),jQuery(\'#mi_utext_' + kfid + '\').val(),\'' + kfid + '\');" value="Post Feel"><br><input id="mi_urating_' + kfid + '" value="50" style="width:100%" type="hidden"><input type="hidden" id="mi_udbid_' + kfid + '" value="' + o.dbid + '"><br/><br/></div></center></td></tr></table>';
                // stats 
                p += '<table align="center" id="mipct_tblstats_' + kfid + '" class="mi_stats mi_scrolledcontent" onclick="" style="display:none;width: 100%;margin-top: 10px"><tr><td>';
                if (jQuery.inArray('statsPreview', jQuery.MidasInsight.ObjDictionary[kfid].options.frameElements) > -1 && window.MI_defaults.template != 'MODERN' && window.MI_defaults.template != 'RASTA') {
                    if (o.meta.length > 0) p += '<div style="color: #49b7e6;padding-top: 0px!important;padding-bottom: 0px!important;float: left;padding-left: 0px!important;" class="mi_subtitle">' + o.meta.length + ' Sources</div><div class="mi_top_chart_caption " style="font-size:10px;float:right;margin-right:5px;">Feelter\'s sources of social feel by rank and volume </div><div style="position:relative;" class="mi_pie_container" id="mi_pie_container_' + kfid + '" ></div><br/>'
                }
                p += '<div class="mi_linechartcontainer" id="mi_stats_sentimentchart_' + kfid + '"></div><br/>';
                if (window.MI_defaults.template != 'RASTA') p += '<div class="mi_linechartcontainer" id="mi_stats_volumechart_' + kfid + '"></div><br/>';
                p += '<div style="position:relative;padding-right: 5px;" class="mi_stats_distchart" id="mi_stats_distchart_' + kfid + '"></div><br/><br/>';
                p += '<div style="position:relative;" class="mi_stats_genderpie" id="mi_stats_genderpie_' + kfid + '"></div><br/>';
                p += '</td></tr></table>';
                // about
                p += '<table align="center" id="mipct_tblabout_' + kfid + '" class="mi_about mi_blured_overlay mi_scrolledcontent" onclick="jQuery(\'#mipct_scroll_' + kfid + '\').removeClass(\'mi_blured\').fadeIn();jQuery(\'#mipct_tblabout_' + kfid + '\').fadeOut();" style="display:none;height: 200px;position: absolute;width: 100%;top: 120px;"><tr><td align="center" style="width: 435px;"><div style="width:312px;"><img width="200px" src="//d34p6saz4aff9q.cloudfront.net/images/feelter_art.png"><br/><b>Version 1.0.4</b><br/>Feelter presents accurate and reliable information from EVERY available social media source - right at your fingertips - processed and optimized for your ultimate shopping experience!!<br/><br/><img src="//d34p6saz4aff9q.cloudfront.net/images/logos.png"><br/><br/><br/></div></td></tr></table>';
                return p;
            }
            else if (tempName == "mentions") {
                // mentions stream
                var vdiv = '<div style="left:0px;top: 10px;bottom: 10px;position: absolute;border-left: 1px solid #ddd;"></div>'
                if (jQuery.inArray('mentions', jQuery.MidasInsight.ObjDictionary[kfid].options.tabs) > -1) {
                    var cols = (typeof(window.MI_defaults.inqa) == 'undefined' || window.MI_defaults.inqa != 'true') && typeof jQuery.MidasInsight.ObjDictionary[kfid].options.columnscount != 'undefined' ? jQuery.MidasInsight.ObjDictionary[kfid].options.columnscount : false;
                    while (cols * 339 > options.panelWidth) cols--;
                    var list = jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems;
                    var lp = 1,
                        onetag = false;
                    if (typeof jQuery.MidasInsight.ObjDictionary[kfid].options.tag != 'undefined') {
                        lp = 2;
                        onetag = true;

                    }
                    var sc = 0;
                    var otagItems = {};
                    for (var ii = 0; ii < 1; ii++) {
                        var mp = '';
                        if (onetag) {
                            if (ii == 0) {
                                list = jQuery.MidasInsight.ObjDictionary[kfid].response.tags.socialItems.filter(function(a) {
                                    return ('|' + jQuery.MidasInsight.ObjDictionary[kfid].options.tag + '|').indexOf('|' + a.tagGroup + '|') > -1
                                });

                                function unique(list) {
                                    var result = [];
                                    jQuery.each(list, function(i, e) {
                                        var le = e;

                                        if (result.filter(function(a) {
                                                return a.ksid == le.ksid
                                            }).length == 0) result.push(e);
                                    });
                                    return result;
                                }
                                list = unique(list);
                                //}
                                //else if (ii == 0) {
                                //for (var i = 0; i < list.length; i++) {
                                //    var t = list[i];
                                //    if (typeof otagItems[t.tagGroup] == 'undefined')
                                //        otagItems[t.tagGroup] = '';
                                //    if (otagItems[t.tagGroup].indexOf('|' + t.tag) == -1) otagItems[t.tagGroup] += '|' + t.tagList.replace(/,/gi,'|');

                                //}
                            }
                        }
                        for (var i = 0; i < list.length; i++) {
                            if (onetag) list[i].hilights = list[i].tagList.replace(/,/gi, '|'); // otagItems[jQuery.MidasInsight.ObjDictionary[kfid].options.tag].substring(1);
                            list[i].html = createSocialItem(list[i], kfid);
                        }
                        if (onetag) list = list.sort(function(a, b) {
                            return b.html.split('<strong').length - a.html.split('<strong').length
                        });

                        var hidden = '';
                        for (var i = 0; i < list.length; i++) {
                            if (typeof options.maxResults != 'undefined' && parseInt(options.maxResults) <= sc) {
                                if (typeof options.displayShowMore == 'undefined' || options.displayShowMore == 'false' || !options.displayShowMore) break;
                                hidden = ' style="display:none" ';
                            }
                            var si = list[i].html;
                            sc++;
                            if (i > 0 && !cols)
                                mp += '<tr ' + hidden + '><td colspan="' + (cols ? 2 * cols : 2) + '" ><hr class="mihr"/></td></tr>';
                            if (!cols || i % cols == 0) {
                                mp += '<tr ' + hidden + ' class="mi_socialitemrow">';
                                mp += '<td colspan="2" valign="top"  id="mi_si_ksid_' + list[i].ksid + '" >' + si + '</td>';
                            }
                            else {
                                mp += '<td colspan="2" valign="top" style="vertical-align: top;position:relative;width:' + (100 / cols) + '%;" id="mi_si_ksid_' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '" >' + vdiv + si + '</td>';
                            }
                            if (!cols || i % cols == cols - 1 || i == list.length) mp += '</tr>';
                            // QA code 
                            if (typeof(window.MI_defaults.inqa) != 'undefined' && window.MI_defaults.inqa == 'true') mp += '<tr><td colspan="2" id="mi_si_ksid_qa_' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '" ><span style="height:100%;position: relative;display: block;"><div class="qa_icon_container qa_container" style="position:absolute;left: 90%;bottom:0px;z-index:2;"><div class="qa_icon" style="z-index:1;" ondblclick="window.open(\'http://www.midasinsite.com/QAConsole.aspx?qaid=' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '&kp=' + escape(jQuery.MidasInsight.ObjDictionary[kfid].response.phrase) + '\',\'_blank\')" noondblclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'OK\',\'just OK\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">Feed<br/>back</div> <div style="" class="mi_qa_dialog"> <span class="qa_tab" style="color:green;">Great</span> <span class="qa_tab qa_tab_selected" style="color:green;">OK</span> <span class="qa_tab" style="color:orange;">Ehaa..</span> <span class="qa_tab" style="color:red;">Bad</span> <span class="qa_tab" style="color:red;">Terrible</span> <div style="position:relative;top:0px;padding:5px;left:0px;width:250px;background-color:#fefefe;border-radius:0px 0px 5px 5px;border:1px solid #777;border-top:none;"> <div style="padding-top:10px;"> <div class="qa_option" style="cursor:pointer;color:green;"><div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'great\',\'just great\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">This item is just great</div><div>Suitable for the hall of fame <br/>because: </div><textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;"  onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'great\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Save</div> </div> <div class="qa_option" style="display:block;color:green;cursor:pointer;"><div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'OK\',\'OK\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">This item is OK</div>' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '</div> <div class="qa_option"style="color:orange;"><div>This item is not so halpfull because: </div><div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'Ehaa\',\'LamLam\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">LamLam</div><textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'Ehaa\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Save</div></div> <div class="qa_option"style="color:red;">This item is bad because: <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'giberrish\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">The text is giberrish</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'missformed\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">Text is missformed</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'irrelevant\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It is not relevant</div> <div>Other</div> <textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'bad\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Other</div> </div> <div class="qa_option"style="color:red;">This item terrible because: <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'commercial\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It is commercial in nature</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'wrongkeyphrase\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It concerns another product</div> <div class="qa_button" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'foul\',\'\',\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">It contains faul language</div> <div>Other</div> <textarea style="width:227px;"></textarea><div class="qa_button" style="width:80px;margin-left:145px;text-align:right;" onclick="mi_qa_action(\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.socialItems[i].ksid + '\',\'terrible\',\'\',jQuery(this).prev().val(),\'' + jQuery.MidasInsight.ObjDictionary[kfid].response.phrase + '\');">...Other</div> </div> </div> </div></div></div></span></td></tr>';
                        }
                        if (hidden != '') {
                            mp += '<tr style="height: 50px;"><td colspan="' + (cols ? 2 * cols : 2) + '" valign="top"><div onclick=" var offset = jQuery(this).offset(),wo=jQuery(window).scrollTop();$(this).parents(\'table\').find(\'.mi_socialitemrow\').not(\':visible\').first().show();var noffset = jQuery(this).offset();jQuery(window).scrollTop(-1+wo+(noffset.top-offset.top));if($(this).parents(\'table\').find(\'.mi_socialitemrow\').not(\':visible\').length==0) $(this).hide();" class="mi_loadmorementions">show more</div></td></tr>';
                        }
                        else
                            mp += '<tr style="height:20px;"><td colspan="2" ></td></tr>';

                        var p = '<tr><td><table width="100%">' + mp + '</table></td></tr>';

                        if (ii == 0)
                            jQuery.MidasInsight.ObjDictionary[kfid].allMentions = p;
                    }
                }

                p += '</table>';
                return p;
            }
            else {
                return window.tempDictionary[window.MI_defaults.template].panel[tempName];
            }
        }
        jQuery.MidasInsight.getAllSelectors = function() {
            var ret = [];
            for (var i = 0; i < document.styleSheets.length; i++) {
                var rules = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
                for (var x in rules) {
                    if (typeof rules[x].selectorText == 'string') ret.push(rules[x].selectorText);
                }
            }
            return ret;
        }

        jQuery.MidasInsight.allSelectors = false;
        jQuery.MidasInsight.selectorExists = function(selector) {
            if (!jQuery.MidasInsight.allSelectors) jQuery.MidasInsight.allSelectors = jQuery.MidasInsight.getAllSelectors();
            var selectors = jQuery.MidasInsight.allSelectors;
            for (var i = 0; i < selectors.length; i++) {
                if (selectors[i] == selector) return true;
            }
            return false;
        }
        jQuery.MidasInsight.createStartsSlide = function(type, kfid) {
            var options = window.MI_defaults;
            var o = json[Object.keys(json)[0]];
            var stars = '';
            switch (type) {
                case "BIG":
                    stars = '<tr><td>' +
                        '<div class="mi_pie_container" style="padding:2px 0;border-bottom:1px solid #DBDBDB;font-family: \'Source Sans Pro\', Alef;font-size: 12px;position: relative;max-height: 62px;noverflow: visible;z-index: 3;margin-left: 0px;width:" id="mi_pie_preview_container_@@@kfid" ></div>' +
                        '</td></tr>'
                    return stars.replace(/@@@kfid/g, kfid);
                case "SMALL":
                    var elm = [];
                    var starsPanel = window.tempDictionary[window.MI_defaults.template].panel.starspanel.header.replace(/@@@width/gi, options.panelWidth);
                    

                    //var starsCell = '<div style="height: 29px; white-space: nowrap;"><div style="display: inline-block;margin-right:5px;" data-char="" class="mi_widget_social_icon_small mi_widget_social_icon_small_@@@socialName"></div><div style="display:inline-block"><div style="color:#979797;font-size:11px;font-weight:normal;line-height: 0px;text-align: left;"><span>@@@socialName</span><span style="color:#59a3e8;"> @@@socialCount</span></div><div style="line-height: 15px;margin-top: 7px;direction: ltr!important;display: inline-block;    margin-left: -13px;"><span style="display: block;background-image:url(//d34p6saz4aff9q.cloudfront.net/images/starts@@@tr.png);background-size: contain;background-repeat: no-repeat;width:60px;height:9px;"></span></div></div></div>'
                    var starsCell = '<div style="height: 29px; white-space: nowrap;" title="@@@socialName"><div style="display: inline-block;margin-right:5px;" data-char="" class="mi_widget_social_icon_small mi_widget_social_icon_small_@@@socialName"></div><div style="display:inline-block;padding-left: 5px;"><div style="color:#979797;font-size:11px;font-weight:normal;line-height: 0px;text-align: left;"><span></span><span style="color:;font-size:10px;"> @@@socialCount</span></div><div style="line-height: 15px;margin-top: 7px;direction: ltr!important;display: inline-block;    nmargin-left: -13px;"><span style="display: block;background-image:;background-size: contain;background-repeat: no-repeat;width:60px;height:9px;    min-height: auto;" class="starsspan">@@@textstars</span></div></div></div>'
                    elm['tr'] = [];
                    for (var i = 0; i < o.meta.length; i++) {
                        var tr = Math.floor((o.meta[i].rating + 10) / 20);
                        if (["Twitter", "Pinterest", "Youtube", "Flickr"].indexOf(o.meta[i].name) > -1) {
                            if (tr == 4) tr = 5;
                            if (tr == 3) tr = 4;
                            if (tr < 3) tr = 3;
                        }
                        elm['tr'].push([o.meta[i].name, tr, o.meta[i].count, o.meta[i].color]);
                    }
                    for (i = 0; i < elm['tr'].length; i++) {
                        var socialName = elm['tr'][i][0].replace(/ /g, '');
                        var socialScore = elm['tr'][i][1];
                        var socialCount = elm['tr'][i][2];
                        var socialColor = elm['tr'][i][3];
                        var newStarsCell = '<td style="font-size:16px;padding-left:8px;">'
                        if (socialName == "Yelp" || socialName == "TripAdvisor") {
                            newStarsCell += '<a href="http://www.' + socialName + '.com" target="_blank">' + starsCell + '</a>';
                        }
                        else {
                            newStarsCell += starsCell;
                        }
                        newStarsCell += '</td>';
                        //fix google plus social name
                        socialName = socialName.replace("GooglePlus", "Google+");

                        //if (!jQuery.MidasInsight.selectorExists('mi_widget_social_icon_small_' + socialName)) {
                        //   // newStarsCell = newStarsCell.replace('mi_widget_social_icon_small_@@@socialName">', '"><span class="mi_nosmalllogo">' + socialName.substring(0, 1) + '</span>');
                        //}
                        var textstars = '';
                        for (var si = 0; si < 5; si++) {
                            textstars += '<span style="' + (si > socialScore - 1 ? 'color:#ccc;' : socialColor ? 'color:' + socialColor : '') + '">&#9733;</span>';
                        }

                        newStarsCell = newStarsCell.replace(/@@@tr/g, socialScore).replace(/@@@socialName/g, socialName).replace(/@@@socialCount/g, socialCount).replace('data-char=""', 'data-char="' + socialName.substring(0, 1) + '"')
                            .replace(/@@@textstars/g, textstars);
                        starsPanel += newStarsCell

                    }
                    if (elm['tr'].length > 3)
                        for (i = 0; i < elm['tr'].length; i++) {
                            var socialName = elm['tr'][i][0].replace(/ /g, '');
                            var socialScore = elm['tr'][i][1];
                            var socialCount = elm['tr'][i][2];
                            var socialColor = elm['tr'][i][3];
                            var newStarsCell = '<td style="font-size: 16px;padding-left: 8px;">'
                            if (socialName == "Yelp" || socialName == "TripAdvisor") {
                                newStarsCell += '<a href="http://www.' + socialName + '.com" target="_blank">' + starsCell + '</a>';
                            }
                            else {
                                newStarsCell += starsCell;
                            }
                            newStarsCell += '</td>';
                            //fix google plus social name
                            socialName = socialName.replace("GooglePlus", "Google+");
                            var textstars = '';
                            for (var si = 0; si < 5; si++) {
                                textstars += '<span style="' + (si > socialScore - 1 ? 'color:#ccc;' : socialColor ? 'color:' + socialColor : '') + '">&#9733;</span>';
                            }
                            var newStarsCell = newStarsCell.replace(/@@@tr/g, socialScore).replace(/@@@socialName/g, socialName).replace(/@@@socialCount/g, socialCount).replace('data-char=""', 'data-char="' + socialName.substring(0, 1) + '"')
                                .replace(/@@@textstars/g, textstars);
                            starsPanel += newStarsCell

                        }
                    starsPanel += window.tempDictionary[window.MI_defaults.template].panel.starspanel.footer;

                    return starsPanel

            }
        }
        jQuery.MidasInsight.createTabsMenu = function(type, kfid, o) {
            var options = window.MI_defaults;
            var tabs = "";
            switch (type) {
                case "TABS":
                    if (window.MI_defaults.template == 'RASTA') {
                        var document={documentElement:[]};
                        if (options.tabs.length == 1) return '<div style="margin-right:10px;float:left;"></div>';
                        if (options.panelWidth < 450) {
                            tabs = '<table style="background-color: white!important;width:' + options.panelWidth + 'px;"><tbody><tr><td style="text-align: center;width:' + (options.panelWidth / 3) + 'px;"><div style="padding-left: 0!important;padding-right: 0!important;" class="MI_tab@@@rtlClass MI_tab_selected MI_strem_tab" ' + ('ontouchstart' in document.documentElement ? 'ontouchstart' : 'onclick') + '="jQuery.MidasInsight.showStream(\'@@@kfid\')" >@@@mentions</div></td><td style="text-align: center;width:' + (options.panelWidth / 3) + 'px;position:relative;" class="mi_centertab"><div class="MI_tab@@@rtlClass mi_photos_tab" ' + ('ontouchstart' in document.documentElement ? 'ontouchstart' : 'onclick') + '="jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false)" style="padding-left: 0!important;padding-right: 0!important;">&nbsp;&nbsp;&nbsp;&nbsp;@@@inArrayMentions&nbsp;&nbsp;&nbsp;@@@media</div></td><td style="text-align: center;width:' + (options.panelWidth / 3) + 'px;"><div class="MI_tab@@@rtlClass MI_stats_tab" ' + ('ontouchstart' in document.documentElement ? 'ontouchstart' : 'onclick') + '="jQuery.MidasInsight.MI_showStats(\'@@@kfid\',\'@@@kfid\')" style="padding-left: 0!important;padding-right: 0!important;">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;@@@feelter</div></td></tr></tbody></table>'
                        }
                        else {
                            tabs = '<table style="background-color: white!important;width:100%;"><tbody><tr><td style="text-align: center;width:' + (options.panelWidth / 3) + 'px;"><div class="MI_tab@@@rtlClass MI_tab_selected MI_strem_tab" ' + ('ontouchstart' in document.documentElement ? 'ontouchstart' : 'onclick') + '="jQuery.MidasInsight.showStream(\'@@@kfid\')">@@@mentions</div></td><td style="text-align: center;width:' + (options.panelWidth / 3) + 'px;position:relative;" class="mi_centertab"><div class="MI_tab@@@rtlClass mi_photos_tab" ' + ('ontouchstart' in document.documentElement ? 'ontouchstart' : 'onclick') + '="jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false)">&nbsp;&nbsp;&nbsp;&nbsp;@@@inArrayMentions&nbsp;&nbsp;&nbsp;@@@media</div></td><td style="text-align: center;width:' + (options.panelWidth / 3) + 'px;"><div class="MI_tab@@@rtlClass MI_stats_tab" ' + ('ontouchstart' in document.documentElement ? 'ontouchstart' : 'onclick') + '="jQuery.MidasInsight.MI_showStats(\'@@@kfid\',\'@@@kfid\')">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;@@@feelter</div></td></tr></tbody></table>'
                        }
                        tabs += '<div style="margin-right:10px;float:left;"></div>'
                        tabs = tabs.replace(new RegExp('&nbsp;&nbsp;&nbsp;&nbsp;\\|&nbsp;&nbsp;&nbsp;|&nbsp;+', 'gi'), '');
                        return tabs;
                    }
                    if (jQuery.inArray('addfeel', options.tabs) > -1 && document.location.href.toLowerCase().indexOf('.edmunds.com') == -1) // && !(jQuery.inArray('mentions', options.tabs) > -1 && jQuery.inArray('photos', options.tabs) > -1 && jQuery.inArray('stats', options.tabs) > -1))
                        tabs += '<div class="MI_tab@@@rtlClass MI_addfeel_tab" onclick="jQuery.MidasInsight.ShowAddSocialItem(\'@@@kfid\');jQuery(\'#mipct_scroll_@@@kfid\').removeClass(\'mi_blured\').fadeIn();jQuery(\'#mipct_tblabout_@@@kfid\').fadeOut();" style="padding-right:1px;margin-right:12px;text-align:center;" mi_data-tooltip="@@@comment"><div style="height: 9px;display:inline-block;top: 4px!important;margin-left:9px;opacity:0.5;background-color:gray;width:10px;color:white;line-height:9px;padding-top:1px;border-radius:12px;">+</div></div>'
                    if (jQuery.inArray('mentions', options.tabs) > -1)
                        tabs += '<div class="MI_tab@@@rtlClass MI_tab_selected MI_strem_tab" onclick="jQuery.MidasInsight.showStream(\'@@@kfid\')">@@@mentions</div>'
                    if (jQuery.inArray('photos', options.tabs > -1) && (response.photos.length > 7 || window.MI_defaults.template == 'RASTA')) // && photocount > 0)
                        tabs += '<div class="MI_tab@@@rtlClass mi_photos_tab" onclick="jQuery.MidasInsight.MI_GetPhotos(\'@@@kfid\',false)">&nbsp;&nbsp;&nbsp;&nbsp;@@@inArrayMentions&nbsp;&nbsp;&nbsp;@@@media</div>'
                    if (jQuery.inArray('facebook', options.tabs) > -1 && !(jQuery.inArray('mentions', options.tabs) > -1 && jQuery.inArray('photos', options.tabs) > -1 && jQuery.inArray('stats', options.tabs) > -1))
                        tabs += '<div class="MI_tab@@@rtlClass mi_friends_tab" onclick="jQuery.MidasInsight.MI_FriendsGet(\'@@@kfid\',\'@@@kfid\')">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;@@@facebook</div>'
                    if (jQuery.inArray('stats', options.tabs) > -1 && o.sentimentDistribution.length > 0)
                        tabs += '<div class="MI_tab@@@rtlClass MI_stats_tab" onclick="jQuery.MidasInsight.MI_showStats(\'@@@kfid\',\'@@@kfid\')">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;@@@feelter</div>'
                    tabs += '<div style="margin-right:10px;float:left;"></div>'
                    if (window.MI_defaults.template == 'RASTA') tabs = tabs.replace(new RegExp('&nbsp;&nbsp;&nbsp;&nbsp;\\|&nbsp;&nbsp;&nbsp;|&nbsp;+', 'gi'), '');
                    return tabs;
                case "SELECT":

                    tabs += window.tempDictionary[window.MI_defaults.template].panel.tabswrapper.header;
                    tabs += '<select class="mi_select_tabs" style="width:136px;-webkit-appearance:none;text-align:center;color:#59a3e8;font-weight:bold;background-color:transparent;outline:none;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmZWM2OTIxZi0zYzkyLTQxNGYtOTY3My1iOWVkY2I5N2UyMTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTc0Qjg4RjdFODA0MTFFNEI5NTlDOUZBRDczNDEzNTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTc0Qjg4RjZFODA0MTFFNEI5NTlDOUZBRDczNDEzNTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWNhYTk4ZDEtM2U1Yy00MzZmLWJmZGEtN2RhY2EwOWM3M2MzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA4MWY2YjljLWFmN2YtNDg2MS1hMWVhLTk5N2JjMzIyZjFhNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrmHLLsAAADDSURBVHjarNOxDcIwEIVhE0ViCFiGlq2uSsoMALtAxxyIAWjp4pNiZA6f7zk5S45sJ/71Ndmdp+c+hHAIvuPdL4t7nEfH8KmLj0+co2P0xrNbNpc4X05h4kcKs3rw0uZhHlcHNaVFHt6q/mpleKua8o0Mr1X/aEvhtWqSB6Vwq/pPq4Vb1VQ61MKouqithVE1aS9qYUutaq2wpabaRSusqataJKypybqEhKXa1KJhqSbkAhpOakjLo2/4dVn9QD+eBRgADho1k4aeJA8AAAAASUVORK5CYII=);background-size:10px;padding-right:10px;background-repeat:no-repeat;background-position-x:right;background-position-y:4px;" onchange="jQuery.MidasInsight.onTabSelect(this,\'' + kfid + '\')">'
                    if (jQuery.inArray('mentions', options.tabs) > -1)
                        tabs += '<option value="@@@mentions">@@@mentions</option>'
                    if (jQuery.inArray('photos', options.tabs) > -1 && response.photos.length > 7) // && photocount > 0)
                        tabs += '<option value="@@@media">@@@media</option>'
                    if (jQuery.inArray('facebook', options.tabs) > -1 && !(jQuery.inArray('mentions', options.tabs) > -1 && jQuery.inArray('photos', options.tabs) > -1 && jQuery.inArray('stats', options.tabs) > -1))
                        tabs += '<option value="@@@facebook">@@@facebook</option>'
                    if (jQuery.inArray('stats', options.tabs) > -1 && o.sentimentDistribution.length > 0)
                        tabs += '<option value="@@@feelter">@@@feelter</option>'
                    tabs += '</select>'
                        // tabs += '<div style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmZWM2OTIxZi0zYzkyLTQxNGYtOTY3My1iOWVkY2I5N2UyMTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTc0Qjg4RjdFODA0MTFFNEI5NTlDOUZBRDczNDEzNTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTc0Qjg4RjZFODA0MTFFNEI5NTlDOUZBRDczNDEzNTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWNhYTk4ZDEtM2U1Yy00MzZmLWJmZGEtN2RhY2EwOWM3M2MzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA4MWY2YjljLWFmN2YtNDg2MS1hMWVhLTk5N2JjMzIyZjFhNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrmHLLsAAADDSURBVHjarNOxDcIwEIVhE0ViCFiGlq2uSsoMALtAxxyIAWjp4pNiZA6f7zk5S45sJ/71Ndmdp+c+hHAIvuPdL4t7nEfH8KmLj0+co2P0xrNbNpc4X05h4kcKs3rw0uZhHlcHNaVFHt6q/mpleKua8o0Mr1X/aEvhtWqSB6Vwq/pPq4Vb1VQ61MKouqithVE1aS9qYUutaq2wpabaRSusqataJKypybqEhKXa1KJhqSbkAhpOakjLo2/4dVn9QD+eBRgADho1k4aeJA8AAAAASUVORK5CYII=);width: 10px;height: 10px;float: right;background-size: cover;"></div>'
                    tabs += window.tempDictionary[window.MI_defaults.template].panel.tabswrapper.footer;
                    return tabs

            }
        }




        jQuery.MidasInsight.drawBarChart = function(elm, o) {

            var p = '<div class="mi_linechartcaption mi_subtitle" style="margin-top:-18px;    font-size: 16px!important;">' + (o.sentiment / 10) + ' Score is made of<br/>@@@percent<span style="padding-top: 3px;font-size:10px;color:#858585;float:right;padding-right:10px;">illustrates the Feel Distribution in each sentiment group</span></div>';
            p += '<table width="100%" class="mi_bartable" border="0" height="100%" style="width: 249px;right: 0;float: right;    margin-top: -10px;"><tr height="100%">';
            var tot = 0;
            var max = 0;
            var colors = ['green', '#92c83e', 'orange', 'rgb(252, 140, 88)', 'red'];
            var names = ['Great', 'Good', 'Ok', 'Bad', 'Poor'];
            var values = [0, 0, 0, 0, 0];
            for (var i = 0; i < o.sentimentDistribution.length; i++) {
                if (typeof o.sentimentDistribution[i].COUNT != 'undefined') o.sentimentDistribution[i].count = o.sentimentDistribution[i].COUNT;
                tot += parseInt(o.sentimentDistribution[i].count);
                if (o.sentimentDistribution[i].count > max) max = Math.round(o.sentimentDistribution[i].count);
                values[5 - o.sentimentDistribution[i].sentiment] = o.sentimentDistribution[i].count;
            }

            var highest = 0,
                hi = 0;
            for (var i = 4; i >= 0; i--) {
                if (values[i] > highest) {
                    highest = values[i]
                    hi = i;
                }
            }
            var mos = Math.round(values[hi] * 100 / tot) + '% ' + names[hi];
            p = p.replace('@@@percent', '<div calss="mi_distpercent" style="font-size:26px;    margin-left: -1px;padding-top: 6px;color: #37B34A;">' + mos + '</div>');
            var p1 = '';
            for (var i = 4; i >= 0; i--) {
                if (window.MI_defaults.template == 'RASTA') {
                    p += '<td width="20%" valign="bottom" style="padding-top:18px;height:80px;vertical-align: bottom;" align="center"><div class="mi_bar" style="position:relative;height:15px;transition: height 0.5s cubic-bezier(0, 1.2, 1, 1.2);transition-delay:' + ((1 - values[i] / max) / 3) + 's;background-color:' + colors[i] + '!important;" target-height="' + (values[i] * 80 / (max * 1.5) + 15) + '"><div style="top:-15px;position: relative;white-space: ;">' + Math.round(values[i] * 100 / tot) + '%</div></div></td>';
                    p1 += '<td width="20%" valign="bottom"  align="center"><div style="top:5px;position: relative;white-space: ;color:#777;font-weight:700;">' + names[i] + '</div></td>';
                }
                else
                    p += '<td width="20%" valign="bottom" style="padding-top:18px;height:80px;vertical-align: bottom;" align="center"><div class="mi_bar" style="position:relative;height:15px;transition: height 0.5s cubic-bezier(0, 1.2, 1, 1.2);transition-delay:' + ((1 - values[i] / max) / 3) + 's;background-color:' + colors[i] + '!important;" target-height="' + (values[i] * 80 / (max * 1.5) + 15) + '"><div style="top:-15px;position: relative;white-space: ;">' + names[i] + ' - ' + Math.round(values[i] * 100 / tot) + '%</div></div></td>';
            }
            p += '</tr>' + (p1 != '' ? '<tr>' + p1 + '</tr>' : '') + '</table>';
            jQuery(elm).html(p);
            setTimeout(function() {
                jQuery('.mi_bar').each(function() {
                    jQuery(this).css('height', jQuery(this).attr('target-height') + 'px');
                })
            }, 200);
        }
        jQuery.MidasInsight.drawLineChart = function(elm, o, sent) {
            if (typeof o.volume == 'undefined' || o.volume.length < 4) {
                jQuery(elm).hide();
                return;
            }
            // Normalize data
            var colo = o.volume;
            var maxCount = Array.maxProp(colo, 'count');
            var maxYear = Array.maxProp(colo, 'year');
            var minYear = Array.minProp(colo, 'year');
            var firstmonth = colo[0].month;
            var firstyear = colo[0].year;
            var lastmonth = colo[colo.length - 1].month;
            var lastyear = colo[colo.length - 1].year;
            var fulldates = [];
            for (var y = firstyear; y <= lastyear; y++) {
                var tm = (y == lastyear) ? lastmonth : 12;
                var fm = (y == firstyear) ? firstmonth : 1;
                for (var m = fm; m <= tm; m++) {

                    var existed = false;
                    for (var i = 0; i < colo.length; i++) {
                        if (colo[i].year == y && colo[i].month == m) {
                            fulldates[fulldates.length] = colo[i];
                            existed = true;
                            break;
                        }
                    }
                    if (!existed)
                        fulldates[fulldates.length] = {
                            year: y,
                            month: m,
                            count: -maxCount / 2,
                            sentiment: 50
                        };
                }
            }
            var data = [];
            var lasth = 0;
            var lasths = 0;
            for (var i = 0; i < fulldates.length; i++) {
                var h = (fulldates[i].count * 100 / maxCount + 100) / 2;
                var nexth = (i < fulldates.length - 1) ? (fulldates[i + 1].count * 100 / maxCount + 100) / 2 : 90;
                var h1 = Math.round((h + lasth + lasth + nexth + nexth) / 5);

                var hs = (fulldates[i].sentiment * 1);
                var nexths = (i < fulldates.length - 1) ? (fulldates[i + 1].sentiment * 1) : 75;
                var hs1 = Math.round((hs + lasths + lasths + nexths + nexths) / 5);

                data[data.length] = {
                    x: elm.width() * i * 0.93 / fulldates.length,
                    y: sent ? hs1 : h1,
                    date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][fulldates[i].month] + ' ' + fulldates[i].year
                };
            }
            var lowest = 99999,
                heighest = -99999;
            var lowpoint, hipoint;
            var x = 0;
            var y = 0;
            var dotspace = 0;
            for (var i = 0; i < data.length - 1; i++) {
                var d = parseFloat(data[i + 1].x - data[i].x);
                var d1 = parseFloat(data[i + 1].y - data[i].y);
                d = d == 0 ? 1 : d;
                d1 = d1 == 0 ? 1 : d1;
                var step = Math.abs(d / d1);
                step = step == 0 ? 1 : step;
                step = step > 1 ? 1 : step;

                for (x = data[i].x; x < data[i + 1].x; x += step) {
                    y = (((data[i].y) * (data[i + 1].x - x)) +
                        (data[i + 1].y * (x - data[i].x))) / d;

                    y = (60 - y) * 0.9;
                    if (y < lowest && i > data.length / 5) {
                        lowest = y;
                        lowpoint = data[i];
                    }
                    if (y > heighest && i > data.length / 5) {
                        heighest = y;
                        hipoint = data[i]
                    }
                }
            }

            // add containers
            jQuery(elm).html('');
            jQuery('<div class="mi_linechartcaption mi_subtitle" style="margin-top:-18px;">&nbsp;&nbsp;&nbsp;&nbsp;' + (sent ? 'Popularity <span style="padding-top: 2px;font-size:10px;color:#858585;float:right;padding-right:10px;display:none;">shows how this Social Sentiment has changed over time</span>' : 'Volume  <span style="padding-top: 2px;font-size:10px;color:#858585;float:right;padding-right:10px;">the Social Feel by volume over time</span>') + '</div><div class="mi_linechartmidline"></div><div class="mi_linechardotscontainer"></div><div style="float:right;"></div></div><div class="mi_linechartbottom">&nbsp;&nbsp;&nbsp;&nbsp;' + firstyear + '<div style="float:right;">' + (new Date().toDateString()) + '&nbsp;&nbsp;&nbsp;&nbsp;</div>').appendTo(jQuery(elm));
            elm = jQuery(elm).children('.mi_linechardotscontainer');

            // draw line
            x = 0;
            var y = 0;
            var dotspace = 0;
            for (var i = 0; i < data.length - 1; i++) {
                var d = parseFloat(data[i + 1].x - data[i].x);
                var d1 = parseFloat(data[i + 1].y - data[i].y);
                d = d == 0 ? 1 : d;
                d1 = d1 == 0 ? 1 : d1;
                var step = Math.abs(d / d1);
                step = step == 0 ? 1 : step;
                step = step > 1 ? 1 : step;

                for (x = data[i].x; x < data[i + 1].x; x += step) {
                    y = (((data[i].y) * (data[i + 1].x - x)) +
                        (data[i + 1].y * (x - data[i].x))) / d;

                    y = (60 - y) * 0.9;
                    var cls = '';
                    if (x == data[i].x && dotspace-- == 0) {
                        cls = 'mi_chartdot mi_chartdot' + (sent ? 'sent' : 'vol');
                        dotspace = 5;
                    }
                    if (data[i] == lowpoint) {
                        lowpoint = false;
                        cls += ' mi_chartlinesent_big mi_chartdotlow'
                    }
                    if (data[i] == hipoint) {
                        hipoint = false;
                        cls += ' mi_chartlinesent_big mi_chartpointhi'
                    }

                    jQuery('<div data-date="' + data[i].date + '" class="mi_chartline ' + (sent ? 'mi_chartlinesent ' : 'mi_chartlinevol') + ' ' +
                            cls +
                            '" style="left:' + x + 'px;top:' + y + 'px;"></div>')
                        .appendTo(jQuery(elm));

                }
            }


            window['mi_chart_animdot_' + (sent ? 'sent' : 'vol')] = jQuery('<div class=" mi_chartdot mi_lastdot ' + (sent ? 'mi_chartlinelastdotsent' : 'mi_chartlinelastdotvol') + '" style="left:' +
                x + 'px;top:' + y + 'px;display:;"></div>').appendTo(jQuery(elm));

            var delay = 0.0;
            var p;
            jQuery(elm).children('.mi_chartline').each(function() {
                p = jQuery(this);
                if (jQuery.MidasInsight.ShowAnimations()) {
                    var sec = 4000.0;

                    setTimeout("window['mi_chart_animdot_" + (sent ? 'sent' : 'vol') + "'].css({left:'" +
                        p.css('left') +
                        "',top:'" +
                        p.css('top') +
                        "'});", -5 + delay);
                    delay += 4.0 * Math.max(0.1, ((sec - Math.min(sec, delay)) / sec));
                    p.delay(delay)
                        .fadeIn(0, function() {
                            p = jQuery(this);
                            if (p.is('.mi_chartdot')) {
                                p.delay(100)
                                    .animate({
                                        marginLeft: 0,
                                        marginTop: 0,
                                        width: 0.1,
                                        height: 0.1,
                                        borderRadius: '50%'
                                    }, 300, function() {
                                        jQuery(this).removeClass('mi_chartdot').removeClass('mi_chartdotvol').removeClass('mi_chartdotsent')
                                            //.css('border-color', (sent ? 'orange' : 'rgba(145,145,233,1)'))
                                            .hide()
                                            .show();
                                    });
                            }
                        });
                }
                else p.removeClass('mi_chartdotsent').removeClass('mi_chartdot').removeClass('mi_chartdotvol').show();
            });
        }



        jQuery.MidasInsight.updateGauge = function(elmid, ex, caller) {
            var elm = jQuery('#' + elmid);
            if (elm.text() == "") {
                jQuery(window.tempDictionary[window.MI_defaults.template].panel.gauge).appendTo(elm);
            }
            var paddingleft = 27;
            var paddingtop = 23;
            var score = ex;
            if (caller == 'gui') {
                elm.children('.mi_gradeselecthandlenerrow').not(":first")
                    .remove();
                score = Math.max(0, Math.min(100, Math.round(ex * 100 / 100 - 0)));
                for (var i = 0; i == 0 || i <= ex; i++)
                    jQuery.MidasInsight.updateGauge(elmid, i, "anim");

                //return;
                ex = (ex * elm.width() / 100);
            }
            else if (caller == 'anim') {
                ex = (ex * (elm.width()) / 170) + paddingleft;
            }
            else {
                elm.children('.mi_gradeselecthandlenerrow').not(":first")
                    .remove();

                for (var i = 0; i <= ex; i++) {
                    if (!jQuery.MidasInsight.ShowAnimations()) {
                        jQuery.MidasInsight.updateGauge(elmid, i, "anim");
                    }
                    else
                        setTimeout('jQuery.MidasInsight.updateGauge("' + elmid + '",' + i + ',"anim")', i * i / 15 + i * 3);
                }
            }



            if (Math.round(score) > 99)
                elm.children('.mi_gradeselectdigitsnerrow')
                .children('.mi_gradeselectdigitsnerrow_after')
                .css({
                    visibility: 'hidden',
                    marginRight: '-12px'
                });
            else elm.children('.mi_gradeselectdigitsnerrow')
                .children('.mi_gradeselectdigitsnerrow_after')
                .css({
                    visibility: '',
                    marginRight: '-15px'
                });

            if (caller != 'anim') {
                elm.children('.mi_gradeselectdigitsnerrow')
                    .children().first().html(Math.round(score));
                var scorestring = jQuery.MidasInsight.getScoreAsText(score);
                elm.children('.mi_gradeselecttext').html(scorestring);
                return;
            }

            var t = ex - paddingleft;
            var w = elm.width() - paddingleft * 2 - 1;
            var h = 75 - paddingtop;
            t -= w;
            var t1 = Math.cos(((t) / w) * Math.PI) * (w / 2) + (w / 2) + paddingleft;
            t = Math.sin((t / w) * Math.PI) * h + h + paddingtop;
            if (score > 99 && t > h) return;
            if (t > h + 15) {
                t = h + 15;
                t1 += 1;
            } //return;
            var size = (score / 8);
            var color = 'rgb(' + Math.round((100 - score) * 510 / 100) + ',' + Math.min(255 - (score - 75) * 7, Math.round((score - 25) * 1020 / 100)) + ',0)';
            var d = elm.children('.mi_gradeselecthandlenerrow').first().css({
                left: t1 - 8,
                top: t - 8,
                backgroundColor: color,
                color: color,
                //width: size + 2,
                //height: size + 2,
                display: 'inline'
            }).clone();
            d.prependTo(elm);
        }


        jQuery.MidasInsight.animateGaugeWidget = function(elmid, score, pos, show) {

            jQuery('[id="' + elmid + '"]').each(function() {
                if (this.innerHTML != '') return;
                var count = 0;
                var tr;
                var elm = jQuery(this); //jQuery('#' + elmid);
                if (elm.length == 0) return;
                if (!show) {
                    elm[0].count = 0;
                    elm[0].score = score;
                    elm[0].pos = pos;
                    //if (!(typeof (window.MI_defaults.selector) != 'undefined' && window.MI_defaults.selector == 'detect')) {
                    setTimeout('jQuery.MidasInsight.scrollWatch(\'' + elm[0].id + '\')', 1000);
                    setTimeout('jQuery.MidasInsight.scrollWatch(\'' + elm[0].id + '\')', 2000);
                    jQuery.MidasInsight.scrollWatch(elm[0].id);
                    return;
                    //}
                }

                var sscore = '';
                if (typeof score == 'undefined' || isNaN(score)) {
                    jQuery('[id="' + elmid + '"]').each(function() {
                        if (typeof score == 'undefined' || isNaN(score)) {
                            score = jQuery(this)[0].score;
                            pos = jQuery(this)[0].pos;
                        }
                    });
                }
                if (typeof score == 'undefined' || isNaN(score)) {
                    if ((typeof(window.MI_defaults.debug) != 'undefined' && window.MI_defaults.debug == 'true') ||
                        (typeof(window.MI_defaults.build) != 'undefined' && window.MI_defaults.build == 'true')) {
                        sscore = 'Calculating...';
                        score = 50;
                    }
                    else
                        return;
                }
                else
                    sscore = jQuery.MidasInsight.getScoreAsText(score);

                var options = jQuery.MidasInsight.ObjDictionary[elmid.substring(10)].options;
                var wtt = 'More Info&nbsp;';
                if (typeof window.langDictionary[window.MI_defaults.lang] != 'undefined' && typeof window.langDictionary[window.MI_defaults.lang].moreInfo != 'undefined') wtt = window.langDictionary[window.MI_defaults.lang].moreInfo;
                if (jQuery.MidasInsight.isMobileDevice()) wtt = '';
                if (typeof options.whatsThisText != 'undefined') wtt = options.whatsThisText;
                var wt = '<td align="center" class="mi_widget_after">' + wtt + '</td>';
                //t
                //var options = jQuery("[mi_kfid='" + elmid.substring(10) + "']")[0].MidasInsight.options;

                var wtin = options.whatsThisLocation == 'in';
                var oscore = score;
                score = '<span>' + (sscore == 'Calculating...' ? '' : score) + '</span>';
                if (window.MI_defaults.template == 'RASTA') {
                    var o = jQuery.MidasInsight.ObjDictionary[elmid.replace('mi_widget_', '')].response;
                    var iscore = (oscore == 'Calculating...' ? 50 : parseFloat(oscore));
                    var iu = Math.round(o.basedon * iscore / 100);
                    var il = Math.round(o.basedon * (100 - iscore) / 100);
                    if (iu > 999) iu = Math.round(iu / 1000) + 'k';
                    if (il > 999) il = Math.round(il / 1000) + 'k';
                    var wtt = 'Click to <span class="oi_color_1">f</span><span class="oi_color_3">e</span><span class="oi_color_4">e</span><span class="oi_color_6">l</span><span class="oi_color_8">t</span><span class="oi_color_9">e</span><span class="oi_color_10">r</span>';
                    if (document.location.href.toLowerCase().indexOf('.edmunds.com') > -1) wtt = 'See More';
                    if (typeof options.whatsThisText != 'undefined') wtt = options.whatsThisText;
                    jQuery(elm).html('<table cellspacing="0" cellpadding="0" style="font-weight: 600;width:120px"><tr><td style="max-width: 45px;width: 45px;"><div class="oi_gauge oi_gauge_small oi_gauge_' + Math.round(iscore / 10) + '" data-score="' + (iscore == 0 ? '?' : Math.round(iscore) / 10) + '" style="    box-shadow: 0 8px 3px -1px rgba(191, 191, 191, 0.47);"></div></td><td style="vertical-align:top;font-size: 10px;color: #' + (jQuery.inArray('darkbg', window.MI_defaults.panelLayout.flags) > -1 ? 'aaa' : '333') + ';"><div style="margin-top: -1px;font-size: 13px;margin-bottom: -1px;" class="oi_color_' + Math.round(iscore / 10) + '">' + jQuery.MidasInsight.getScoreAsText(iscore) + '</div><span style="color:#00A700;">â–²</span>' + iu + ' <span style="color:red;">â–¼</span>' + il + '<br/>' + wtt + '</td></tr></table>')
                        .parent().css('height', 42)
                        .parent().parent().css('min-width', 120)

                }
                else if (MI_defaults.buttonType == "DEFAULT") {
                    switch (pos) {
                        case 'bottom':
                        default:
                            jQuery(elm).html('<table cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><div class="mi_btn_frame"><table cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><div class="mi_btn_widget_gauge"></div><div style="position:absolute;right: 0px;width:100%;top:16px;color:#459623;text-align:center;font-size:15px !important;font-weight:bold;height: 14px;font-family: \'Source Sans Pro\';"> ' + score + '</div></td></tr><tr><td><div style="margin: 2px 2px 2px 2px !important;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAWCAYAAAB3/EQhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgyNUM0QzE2QkRBRTExRTRCQzU0REMwQUMyMjMyNzE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgyNUM0QzE3QkRBRTExRTRCQzU0REMwQUMyMjMyNzE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODI1QzRDMTRCREFFMTFFNEJDNTREQzBBQzIyMzI3MTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODI1QzRDMTVCREFFMTFFNEJDNTREQzBBQzIyMzI3MTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5oCTZUAAABCUlEQVR42uyYIU5EQRBEa/p3CEFwAMIJEASBI+tJQECw61AkBAVnIDgEepN1SC7AATAEHCgEAbMa83emhxpAcIZfW0klnXbvd/X8yaTb9z14Z1hy2wfSCYAtDFdv9LRETHKpxVunAmfzHFcslzFsrdE79CZ94VExqjkuBcD/65R+dk58nIAV6GnsOcfGT/D1tN4mrzj1pvA+RxWFr23yUBXhizK88OT7RexV4eex2HnRnZc+7WtSjr3qDc8a/EwUvm/w97zm7grCP3guZcrgH+D3hUNFnzzobtoz1iyiHnP1r1krJODJgPOus0f/a7zyAxxFxCHrbXqVHtpf4ItIL2a4S2YfrfEtwAARMHAb3bH8cAAAAABJRU5ErkJggg==);line-height:20px;background-size: 100% 100%; background-repeat: no-repeat;color:white;text-align:center;  height: 20px;min-width: 54px;font-size:16px;font-weight:bold;font-family: \'Source Sans Pro\', Alef;"> ' + sscore + '</div></td>' + (wtin ? wt : '') + '</tr></table></div></td></tr><tr>' + (wtin ? '' : wt) + '</tr></table>').css({
                                cursor: 'pointer',
                                opacity: 0
                            });
                            break;
                        case 'right':
                            jQuery(elm).html('<table cellpadding="0" cellspacing="0" border="0"><tr><td><div class="mi_btn_frame"><table cellpadding="0" cellspacing="0" border="0"><tr><td><div class="mi_btn_widget_gauge"><div style="position: relative;top: 12px;color:#459623;text-align:center;font-size:14px;font-weight:bold;height: 14px;font-family: \'Source Sans Pro\';">' + score + '</div></div></td><td valign="bottom" class="mi_widget_text" style="vertical-align:middle!important;"><div style="/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#b2ea50+0,489924+101 */background: #b2ea50; /* Old browsers */background: -moz-linear-gradient(top,  #b2ea50 0%, #489924 101%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#b2ea50), color-stop(101%,#489924)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #b2ea50 0%,#489924 101%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #b2ea50 0%,#489924 101%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #b2ea50 0%,#489924 101%); /* IE10+ */background: linear-gradient(to bottom,  #b2ea50 0%,#489924 101%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#b2ea50\', endColorstr=\'#489924\',GradientType=0 ); /* IE6-9 */color:white;text-align:center;height:26px;min-width: 54px;font-size:16px;font-weight:bold;font-family: \'Source Sans Pro\', Alef; /* Safari 3-4, iOS 1-3.2, Android 1.6- */-webkit-border-radius:4px;/* Firefox 1-3.6 */-moz-border-radius:4px;/* Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+ */border-radius:4px;line-height:24px;"> ' + sscore + '</div></td>' + (wtin ? wt : '') + '</tr></table></div></td></tr><tr>' + (wtin ? '' : wt) + '</tr></table>').css({
                                cursor: 'pointer',
                                opacity: 0
                            });
                            break;
                        case 'top':
                            jQuery(elm).html('<table cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><div class="mi_btn_frame"><table cellpadding="0" cellspacing="0" border="0"><tr><td><div style="margin: 2px 2px 2px 2px !important;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAWCAYAAAB3/EQhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgyNUM0QzE2QkRBRTExRTRCQzU0REMwQUMyMjMyNzE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgyNUM0QzE3QkRBRTExRTRCQzU0REMwQUMyMjMyNzE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODI1QzRDMTRCREFFMTFFNEJDNTREQzBBQzIyMzI3MTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODI1QzRDMTVCREFFMTFFNEJDNTREQzBBQzIyMzI3MTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5oCTZUAAABCUlEQVR42uyYIU5EQRBEa/p3CEFwAMIJEASBI+tJQECw61AkBAVnIDgEepN1SC7AATAEHCgEAbMa83emhxpAcIZfW0klnXbvd/X8yaTb9z14Z1hy2wfSCYAtDFdv9LRETHKpxVunAmfzHFcslzFsrdE79CZ94VExqjkuBcD/65R+dk58nIAV6GnsOcfGT/D1tN4mrzj1pvA+RxWFr23yUBXhizK88OT7RexV4eex2HnRnZc+7WtSjr3qDc8a/EwUvm/w97zm7grCP3guZcrgH+D3hUNFnzzobtoz1iyiHnP1r1krJODJgPOus0f/a7zyAxxFxCHrbXqVHtpf4ItIL2a4S2YfrfEtwAARMHAb3bH8cAAAAABJRU5ErkJggg==);line-height:20px;background-size: 100% 100%; background-repeat: no-repeat;color:white;text-align:center;  height: 20px;min-width: 54px;font-size:16px;font-weight:bold;font-family: \'Source Sans Pro\', Alef;"> ' + sscore + '</div></td>' + (wtin ? wt : '') + '</tr><tr><td align="center"><div class="mi_btn_widget_gauge"></div><div style="position:absolute;right: 0px;width:100%;top:39px;color:#459623;text-align:center;font-size:15px !important;font-weight:bold;height: 14px;font-family: \'Source Sans Pro\';"> ' + score + '</div></td></tr></table></div></td></tr><tr>' + (wtin ? '' : wt) + '</tr></table>').css({
                                cursor: 'pointer',
                                opacity: 0
                            });
                            break;
                        case 'left':
                            jQuery(elm).html('<table cellpadding="0" cellspacing="0" border="0"><tr><td><div class="mi_btn_frame"><table cellpadding="0" cellspacing="0" border="0"><tr><td valign="bottom" class="mi_widget_text" style="vertical-align:middle!important;"><div style="/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#b2ea50+0,489924+101 */background: #b2ea50; /* Old browsers */background: -moz-linear-gradient(top,  #b2ea50 0%, #489924 101%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#b2ea50), color-stop(101%,#489924)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #b2ea50 0%,#489924 101%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #b2ea50 0%,#489924 101%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #b2ea50 0%,#489924 101%); /* IE10+ */background: linear-gradient(to bottom,  #b2ea50 0%,#489924 101%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#b2ea50\', endColorstr=\'#489924\',GradientType=0 ); /* IE6-9 */color:white;text-align:center;height:26px;min-width: 54px;font-size:16px;font-weight:bold;font-family: \'Source Sans Pro\', Alef; /* Safari 3-4, iOS 1-3.2, Android 1.6- */-webkit-border-radius:4px;/* Firefox 1-3.6 */-moz-border-radius:4px;/* Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+ */border-radius:4px;line-height:24px;"> ' + sscore + '</div></td><td><div class="mi_btn_widget_gauge" style="padding-right: 3px;"><div style="position: relative;top: 12px;color:#459623;text-align:center;font-size:14px;font-weight:bold;font-family: \'Source Sans Pro\';">' + score + '</div></div></td>' + (wtin ? wt : '') + '</tr></table></div></td></tr></table>').css({
                                cursor: 'pointer',
                                opacity: 0
                            });
                            break;
                    }
                }
                else if (MI_defaults.buttonType == "MODERN") {
                    jQuery(elm).html('<table cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><div class="mi_btn_frame" style="margin-top:2px;border:0 !important;box-shadow:none;"><div class="mi_up_arrow" style="width: 0; height: 0; border-left: 15px solid transparent;border-right: 15px solid transparent;border-bottom: 10px solid #88d23a;position: absolute;top: 29px;right: 85px;"></div><table cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><div class="mi_btn_widget_gauge" style="width:187px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAE4gAAAAeCAYAAADAkfTGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMzRmZTcxNy0wNmNkLTM4NGYtYTRhYy0xZDhhODVhYTJkYzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjAyNEJCNkY3MzNBMTFFNTgxNzFBNUIzNUEzNjdGQjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjAyNEJCNkU3MzNBMTFFNTgxNzFBNUIzNUEzNjdGQjYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmFkOGI5YmItYzA5Yy1kZTQ5LThjZTMtN2M0YWJjNmU2NTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmMzNGZlNzE3LTA2Y2QtMzg0Zi1hNGFjLTFkOGE4NWFhMmRjMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi0YrHkAAH7FSURBVHja7L15sKRZdeB3TuZbauvqraoXml7EIkCIBsHIIFkMYizUkuXRgCUhAR5sNIqwx4H/kSemJzSEw+FgCFp/KDSBsSwHMmFkKRCLJDSDrFaPLBlpgBKiG5q11SxN791VXV1VXdurepnH98v3fZnnO985556b70F3dd0bUfXey/wyX77M+7tnPweJCOqqq6666qqrrrrqqquuuuqqq6666qqrrrrqqquuuuqqq6666qqrrrrqqquuuuqqq6666qqrrrrqqquuuuqqq6666qqrrrrqqquuuuqqq6666qqrrrrqqquuuuqqq6666nr616i+BXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddz4xVG8TVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVddddVVV1111VVXXXXVVVdddT1D1gr/ARG9a9fTv13p31r6N4baXK6up3dN079J+ncu/Tub/m1YFxLRRfOmVIbrqgxXfuuqq/JbGa6rrspw5beuym+VwZXhuirDld+66qr8VobrqqsyXPmtq/JbGa4M11UZrgzXVVdluPJbV+W38lsZrqsyXPmtq67Kb2W4rroqw5Xfuiq/VQZXhuuqDFd+66qr8lsZrquuynDlt67Kb2W4MlzXhc0w8huMTd9s9P0gmsnVVdczbG2mfydaAKrgqgzXVRmu/NZVV+W3MlxXXZXhym9dld/KcGW4rspw5beuuiq/leG66qoMV37rqvxWhuuqqzJcGa6rrspw5beuym+VwZXhuirDld+66qr8VobrqqsyXPmtq/JbZXBluK7KcOW3rroqv5XhuuqqDFd+66r8VobrquuCZNjrbNgQcGn6d0W34X/zN3/z+vvvv/+dp0+f/sPNzc07p9Ppfc3X9PMfNbc399f3vq6naa20e/Wydu/WpTDsrcp3XZXhC5ffynZdld9n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);"></div></td></tr><tr><td><div style="margin:0 auto;background-color:#88d23a;background-size: 100% 100%;width:127px; background-repeat: no-repeat;color:white;text-align:center;height: 42px;min-width: 54px;line-height:42px;font-size:20px;font-weight:bold;font-family: \'Source Sans Pro\', Alef; -moz-border-radius: 20px;-webkit-border-radius: 5px;-khtml-border-radius: 5px;border-radius: 5px;"> ' + sscore + '</div></td>' + (wtin ? wt : '') + '</tr></table></div></td></tr><tr>' + (wtin ? '' : wt) + '</tr></table>').css({
                        cursor: 'pointer',
                        opacity: 0
                    });
                    jQuery('.mi_cta_logo').css('margin-right', '-120px')

                }
                // update the documented position for mvement checks
                jQuery('[mi_kfid="' + elmid.replace('mi_widget_', '') + '"]').first().attr('mi_last_left', jQuery('[mi_kfid="' + elmid.replace('mi_widget_', '') + '"]').first().position().left);
                jQuery('[mi_kfid="' + elmid.replace('mi_widget_', '') + '"]').first().attr('mi_last_top', jQuery('[mi_kfid="' + elmid.replace('mi_widget_', '') + '"]').first().position().top);
                if (window.MI_defaults.template == 'RASTA') return;

                var target = oscore;
                var lastRun;
                var fpsAvg = 0;
                var fpsMin = 999;
                var fpsMax = 0;
                var fpsAvgCount = 0;
                jQuery(elm).attr('target', target).animate({
                    target: target
                }, {
                    duration: target * 7,
                    easing: 'easeOutSine', //'easeOutCirc',//'easeOutBounce',
                    step: function(now, fx) {
                        // speed / performance test
                        if (!lastRun) {
                            lastRun = new Date().getTime();
                        }
                        else {
                            fpsAvgCount++;
                            var delta = (new Date().getTime() - lastRun) / 1000;
                            lastRun = new Date().getTime();
                            var fps = 1 / delta;
                            if (fpsMax < fps) fpsMax = fps;
                            if (fpsMin > fps) fpsMin = fps;
                            fpsAvg = ((fpsAvg * (fpsAvgCount - 1)) + fps) / fpsAvgCount;
                        }

                        var t = jQuery(this).find('.mi_btn_widget_gauge');

                        jQuery(this).css({
                            opacity: Math.min(now / jQuery(this).attr('target') + 0.2, 1) //+1
                        });
                        if (MI_defaults.buttonType == "DEFAULT") {
                            t.css({
                                opacity: Math.min(now / jQuery(this).attr('target') + 0.2, 1) //+1
                                    ,
                                backgroundPosition: 1550 - ((Math.floor((now / 5)) * 72) + 18) + 'px 0px'
                            });
                        }
                        else if (MI_defaults.buttonType == "MODERN") {
                            t.css({
                                opacity: Math.min(now / jQuery(this).attr('target') + 0.2, 1) //+1
                                    ,
                                backgroundPosition: 5000 - ((Math.floor((now / 5)) * 240.6)) + 'px 0px'
                            });
                        }

                    },
                    complete: function() {
                        jQuery.MidasInsight.FPSAverage = 31; // fpsAvg; -- canceled - ineffective
                        MI_screenLog("Animation Frame rate " + fpsAvg);

                    }
                });

            });

        }

jQuery.MidasInsight.AddtoGallery = function(){}
jQuery.MidasInsight.isMobileDevice = function(){ return false;}

        jQuery.MidasInsight.timeSince = function(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval == 1 ? "last year" : ''; // interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 0) {
                return interval == 1 ? "a month ago" : interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 0) {
                return interval == 1 ? '<span class="mi_hl">yesterday</span>' : interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 0) {
                return interval == 1 ? '<span class="mi_hl">an hour ago</span>' : '<span class="mi_hl">' + interval + ' hours ago</span>';
            }
            interval = Math.floor(seconds / 60);
            if (interval > 0) {
                return interval == 1 ? '<span class="mi_hl">a minute ago</span>' : '<span class="mi_hl">' + interval + ' minutes ago</span>';
            }
            return '<span class="mi_hl">just now</span>'; // Math.floor(seconds) + " seconds";
        }

            var kfid=jQuery.MidasInsight.getIDfromNormalizedKeyPhrase(jQuery.MidasInsight.normalizeKeyPhrase(phrase));
            var p = window.tempDictionary[window.MI_defaults.template].panel.containerHtml
            .replace(/@@@kfid/g, kfid)
            .replace(/@@@layout/g, (window.MI_defaults.layout == 'inlinepanel' ? 'position:inline;' : ''))
            .replace('class="', (window.MI_defaults.layout == 'inlinepanel' ? 'class="mi_ininepanel ' : 'class="'))
            jQuery.MidasInsight.ObjDictionary[kfid]={};
            jQuery.MidasInsight.ObjDictionary[kfid].options=window.MI_defaults;
            jQuery.MidasInsight.ObjDictionary[kfid].response=json[Object.keys(json)[0]];
            p = p.replace('style="','style="display:block;').replace('</div>', jQuery.MidasInsight.createPanel(kfid,j)+'</div>');
            //p += jQuery.MidasInsight.createPanel(kfid, j[Object.keys(j)[0]])
            return p;
}
catch (e) {
    return 'js:' + '<br/>' + e + '<br/>' + e.stack.replace('\n', '<br/>')+ JSON.stringify(json) ;
}

    };

exports.jsfeelter = MI_MidasRoot;