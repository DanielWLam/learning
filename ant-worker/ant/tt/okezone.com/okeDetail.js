/* 
 * @Author: daniel
 * @Date:   2015-11-04 18:31:45
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 10:24:16
 */

'use strict';
var logger = console,
    _ = require('underscore'),
    request = require('request'),
    cheerio = require('cheerio'),
    ua = require('../../../components/header/ua'),
    Grab = require('../../../components/grab/grab'),
    beeDate = require('../../../component_modules/date/date');

var monthMap = {
    'Januari': 'January',
    'Februari': 'February',
    'Maret': 'March',
    'April': 'April',
    'Mei': 'May',
    'Juni': 'June',
    'Juli': 'July',
    'Agustus': 'August',
    'September': 'September',
    'Oktober': 'October',
    'November': 'November',
    'Desember': 'December'
};

module.exports = function(task) {
    var grab = new Grab(),
        honey = {},
        flower = [],
        extend = [],
        done = task.done,
        crtPage = 0,
        finish = false,
        errorFlag = false,
        honey_pages = [];

    function getTimeStamp(str) {
        //Kamis, 5 November 2015 - 06:04 wib
        if (typeof str !== 'string') {
            return '';
        }

        var arr = str.split(' '),
            year = arr[3],
            tmpMonth = arr[2],
            date = arr[1],
            time = arr[5];
        var month = monthMap[tmpMonth] || '';
        var timeStr = year + '/' + month + '/' + date + ' ' + time;
        return Date.parse(new Date(timeStr));

    }

    grab.config({
            headers: {
                'User-Agent': ua.get('pc')
            },
            qs: {
                gzip: true
            }
        })
        .get(task.url)
        .set({
            'summary': 'meta[name="description"]@content',
            'title': '.abmenu .titles h1',
            'date': '.abmenu .meta-post .tgl',
            'coverPic': '.abmenu .detail-page .detail-img img@src',
            'content': '.detail-content .detail-img #contentx/html()',
            'relatedAdd[]': '.meta-bottom-content .col-md-6 .berita-terkait-wrap ul li a@href',
            'relatedText[]': '.meta-bottom-content .col-md-6 .berita-terkait-wrap ul li a',
            'pagnation': '.paging',
            'pageNum': '.paging .ofvalue'
        })
        .data(function(data) {
            var page = {};
            if (crtPage == 0) {
                var honey_data = {},
                    honey_relatedNews = [],
                    relate = [];

                var flowerData = {};
                if (task.data && typeof(task.data) != 'undefined') {
                    try {
                        flowerData = JSON.parse(task.data);
                    } catch (e) {
                        console.log(e)
                    }
                }
                if (flowerData && flowerData.categoryFirst) {
                    honey_data.categoryFirst = flowerData.categoryFirst;
                } else {
                    honey_data.categoryFirst = 'motogp';
                }
                honey_data.originalUrl = task.url;
                honey_data.title = data.title;
                honey_data.articleFrom = 'okezone';
                honey_data.belongSite = 'okezone';
                honey_data.language = 'id';
                honey_data.contentType = 0;
                if (data.summary) {
                    honey_data.summary = data.summary;
                }
                honey_data.sourcePublishTime = getTimeStamp(data.date);
                honey_data.sourcePublishTimeLabel = data.date;
                honey_data.coverPic = data.coverPic;
                honey_data.getType = 0;
                if (data.pagnation) {
                    honey_data.totalPage = data.pageNum.split(' / ')[1];
                } else {
                    honey_data.totalPage = 1;
                }
                honey_data.listType = 0
                honey.data = honey_data;
                // 如果task.data包含了related字段，则不将相关新闻录入relatedNews与flower数组
                if (!(task.data && typeof(task.data) != 'undefined' && task.data.match(/related/))) {
                    for (var i = 0; i < data.relatedAdd.length; i++) {
                        var relatedNew = {};
                        relatedNew.id = data.relatedAdd[i];
                        relatedNew.title = data.relatedText[i];
                        relatedNew.contentType = 0;
                        relatedNew.coverPic = '';
                        relatedNew.originalUrl = data.relatedAdd[i];
                        honey_relatedNews.push(relatedNew);
                        flower.push({
                            'url': relatedNew.originalUrl,
                            'data': {
                                categoryFirst: honey_data.categoryFirst + '_related'
                            }
                        })
                    }
                }
                honey.relatedNews = honey_relatedNews;
                _.each(flower, function(item) {
                    extend.push({
                        url: item.url,
                        tags: [{
                            tag: honey_data.categoryFirst + '_related',
                            sourceUrl: task.url
                        }]
                    })
                })

                if (honey_data.totalPage == 1) {
                    page.pageNumber = 1
                    page.content = data.content.replace(/\<script[\w\W]*<\/script>/g, '').replace(/\201C|\201D|\uFFFD|\uFFFE/g, '"');
                    page.originalUrl = task.url;
                    page.createTime = beeDate.updateTimezone(new Date(), 'id').valueOf();
                    page.modifyTime = 0;
                    honey_pages.push(page);
                    honey.pages = honey_pages;
                } else {
                    page.pageNumber = 1;
                    page.originalUrl = task.url;
                    page.createTime = beeDate.updateTimezone(new Date(), 'id').valueOf();
                    page.modifyTime = 0;
                    page.content = data.content.replace(/\<script[\w\W]*<\/script>/g, '').replace(/\201C|\201D|\uFFFD|\uFFFE/g, '"');
                    honey_pages.push(page);
                }
            } else {
                page.pageNumber = data.pageNum.split(' / ')[0];
                page.originalUrl = task.url;
                page.createTime = beeDate.updateTimezone(new Date(), 'id').valueOf();
                page.modifyTime = 0;
                logger.info(data.content);

                page.content = data.content.replace(/\<script[\w\W]*<\/script>/g, '').replace(/\201C|\201D|\uFFFD|\uFFFE/g, '"');
                honey_pages.push(page);

                if (finish) {
                    honey.pages = honey_pages;
                }
            }
        })
        .page('.paging .next a@href', '.paging .ofvalue', function(url, limit) {
            var arr = limit.split(' / ');
            var max = parseInt(arr[1]),
                cur = parseInt(arr[0]);

            crtPage++;

            if (errorFlag) {
                finish = true;
                return;
            }

            if (cur < max) {
                if (cur + 1 == max) {
                    finish = true;
                }
                return url;
            }
        })
        .catch(Grab.NetworkError, function(err, context, next) {
            errorFlag = true;
            next();
        })
        .error(function(err) {
            console.error('[ERROR] Grab', msg);
            done(msg, task);
        })
        .done(function(msg) {
            task.harvest = {
                author: 'Daniel',
                tag: 'i-id-news',
                honey: honey,
                flower: flower,
                extend: extend
            };
            task.log = {
                'site': 'okezone',
                'source': 'okezone',
                'categoryFirst': honey.data.categoryFirst,
                'categorySecond': '',
                'language': 'id',
                'seed': ''
            };
            done(null, task);
        })
}