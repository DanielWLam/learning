/* 
 * @Author: daniel
 * @Date:   2015-11-03 15:25:06
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-16 15:25:28
 */

'use strict';
var logger = console,
    _ = require('underscore'),
    request = require('request'),
    cheerio = require('cheerio'),
    ua = require('../../../components/header/ua'),
    Grab = require('../../../components/grab/grab');

module.exports = function(task) {
    var grab = new Grab(),
        flower = [],
        honey = {},
        extend = [],
        done = task.done,
        domain = 'http://www.otosia.com',
        crtpage = 0,
        finish = false;

    grab
        .get(task.url)
        .set({
            'headNewsLeft': '.OtoMid .iBoxTop .iBoxTopL a@href',
            'headNewsRight[]': '.OtoMid .iBoxTop .iBoxTopR .iBoxTopRItem a@href',
            'articleList[]': '.article-index-box .artbox-text h2 a@href',
            'page2': '.pgCtnD .posr a@href'
        })
        .data(function(data) {
            //-------------SET THE CATOGARYFIRST DATA
            var catFirst = '';
            if (task.url.match(/\/berita/)) {
                catFirst = 'automotive';
            }
            //-------------FINISH SET THE CATOGARYFIRST DATA

            //--------------START PUSH THE LIST INTO FLOWER
            //--------------PUSH CATFIRST INTO FLOWER
            if (data.headNewsLeft) {
                if (!data.headNewsLeft.match(/otosia.com/)) {
                    flower.push({
                        'url': domain + data.headNewsLeft,
                        data: {
                            'catogaryFirst': catFirst
                        }
                    })
                } else {
                    flower.push({
                        'url': data.headNewsLeft,
                        data: {
                            'catogaryFirst': catFirst
                        }
                    })
                }
            }

            if (data.headNewsRight) {
                for (var i = 0, length = data.headNewsRight.length; i < length; i++) {
                    if (!data.headNewsRight[i].match(/otosia.com/)) {
                        flower.push({
                            'url': domain + data.headNewsRight[i],
                            data: {
                                'catogaryFirst': catFirst
                            }
                        })
                    } else {
                        flower.push({
                            'url': data.headNewsRight[i],
                            data: {
                                'catogaryFirst': catFirst
                            }
                        })
                    }
                }
            }

            for (var i = 0, length = data.articleList.length; i < length; i++) {
                if (!data.articleList[i].match(/otosia.com/)) {
                    flower.push({
                        'url': domain + data.articleList[i],
                        data: {
                            'catogaryFirst': catFirst
                        }
                    })
                } else {
                    flower.push({
                        'url': data.articleList[i],
                        data: {
                            'catogaryFirst': catFirst
                        }
                    })
                }
            }
            //--------------FINISH PUSH CATFIRST INTO FLOWER
            //--------------FINISH PUSH THE LIST INTO FLOWER
            if (!task.url.match(/(index\d+)/)) {
                flower.push({
                    'url': 'http://www.otosia.com/berita/' + data.page2
                })
            }

            _.each(flower, function(item) {
                extend.push({
                    url: item.url,

                    tags: [{
                        tag: 'automotive',
                        sourceUrl: task.url
                    }]
                })
            })
        })
        .done(function(msg) {
            task.harvest = {
                author: 'Daniel',
                tag: 'i-id-news',
                honey: honey,
                flower: flower,
                extend: extend
            };
            task.done(null, task);
        })
}