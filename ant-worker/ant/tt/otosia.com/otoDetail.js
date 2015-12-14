/* 
 * @Author: daniel
 * @Date:   2015-11-03 17:56:14
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-01 14:17:56
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
    'Januari':'January',
    'Februari':'February',
    'Maret':'March',
    'April':'April',
    'Mei':'May',
    'Juni':'June',
    'Juli':'July',
    'Agustus':'August',
    'September':'September',
    'Oktober':'October',
    'November':'November',
    'Desember':'December' 
};


module.exports = function(task) {
    var grab = new Grab(),
        flower = [],
        honey = {},
        extend = [],
        done = task.done,
        domain = 'http://www.otosia.com';

    function getTimeStamp(str) {
        //Rabu, 04 November 2015 08:15
        if (typeof str !== 'string') {
            return "";
        }
        var arr = str.split(' ');
        var year = arr[3],
            idMonth = arr[2],
            date = arr[1],
            time = arr[4];

        var month = monthMap[idMonth] || '';
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
            'title': '#mobart-detail h1.OtoDetailT',
            'iframeArr[]': '#mobart-detail .OtoDetailNews iframe@src',
            'summary': 'meta[name="description"]@content',
            'date': '#mobart-detail .newsdetail-schedule',
            'coverPic': 'meta[property="og:image"]@content',
            'keywords': 'meta[name="keywords"]@content',
            'content': '#mobart-detail .OtoDetailNews/html()',
            'rNAddress[]': '.terkait-box2 ul li a@href',
            'rNTitle[]': '.terkait-box2 ul li a div',
            'rNCoverPic[]': '.terkait-box2 ul li a img@src',
            'relatePhotoUrl': '.relatedPhoto a:first-child@href'
        })
        .data(function(data) {
            var honey_data = {},
                honey_pages = [],
                page = {},
                honey_relatedNews = [],
                hasVideo = false,
                videoSrc = '';

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
            } else if (task.url.match(/\/berita/)) {
                honey_data.categoryFirst = 'automotive';
            }

            honey_data.originalUrl = task.url;
            honey_data.title = data.title;
            honey_data.articleFrom = 'otosia';
            honey_data.belongSite = 'otosia';
            honey_data.language = 'id';

            try {
                if (data.iframeArr) {
                    for (var i = 0; i < data.iframeArr.length; i++) {
                        if (data.iframeArr[i].match(/youtube/) || data.iframeArr[i].match(/facebook.com\/plugins/)) {
                            hasVideo = true;
                            videoSrc = data.iframeArr[i];
                        }
                    }
                }
            } catch (ex) {
                console.log(ex);
            }

            if (hasVideo) {
                honey_data.contentType = 2;
                honey_data.getType = 2;
            } else {
                honey_data.contentType = 0;
                honey_data.getType = 0;
            }

            honey_data.summary = data.summary;
            honey_data.sourcePublishTime = getTimeStamp(data.date);
            honey_data.sourcePublishTimeLabel = data.date;
            honey_data.coverPic = data.coverPic;
            honey_data.totalPage = 1;
            honey_data.keywords = data.keywords;
            honey_data.listType = 0;
            honey.data = honey_data;

            page.pageNumber = 1
            page.content = data.content.replace(/\<p\>\<div class=\"relatedContentBox\"[\w\W]*/g, '').replace(/<!--[\w\W]*-->/g, '').replace(/\201C|\201D|\uFFFD|\uFFFE/g, '"');
            page.originalUrl = task.url;
            page.createTime = beeDate.updateTimezone(new Date(), 'id').valueOf();
            page.modifyTime = 0;
            honey_pages.push(page);
            honey.pages = honey_pages;

            // 如果task.data包含了related字段，则不将相关新闻录入relatedNews与flower数组
            if (!(task.data && typeof(task.data) != 'undefined' && task.data.match(/related/))) {
                for (var i = 0; i < data.rNAddress.length; i++) {
                    if (!data.rNAddress[i].match(/otosia.com/)) {
                        data.rNAddress[i] = 'http://www.otosia.com' + data.rNAddress[i];
                    }
                    var relatedNew = {};
                    relatedNew.id = data.rNAddress[i];
                    relatedNew.title = data.rNTitle[i];
                    relatedNew.contentType = 0;
                    relatedNew.coverPic = data.rNCoverPic[i];
                    relatedNew.originalUrl = data.rNAddress[i];

                    honey_relatedNews.push(relatedNew);

                    flower.push({
                        'url': data.rNAddress[i],
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
        })
        .done(function(msg) {
            task.harvest = {
                author: "Daniel",
                tag: 'i-id-news',
                honey: honey,
                flower: flower,
                extend: extend
            }
            task.log = {
                'site': 'otosia',
                'source': 'otosia',
                'categoryFirst': honey.data.categoryFirst,
                'categorySecond': '',
                'language': 'id',
                'seed': ''
            };
            done(null, task);
        })
}
