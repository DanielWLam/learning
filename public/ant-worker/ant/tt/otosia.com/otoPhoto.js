/* 
 * @Author: daniel
 * @Date:   2015-11-04 11:03:49
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-11-13 16:39:40
 */

'use strict';
var logger = console,
    _ = require('underscore'),
    request = require('request'),
    cheerio = require('cheerio'),
    ua = require('../../../components/header/ua'),
    Grab = require('../../../components/grab/grab'),
    beeDate=require('../../../component_modules/date/date');
module.exports = function(task) {
    var grab = new Grab(),
        flower = [],
        honey = {},
        extend = {},
        done = task.done,
        crtPage = 0,
        finish = false,
        errorFlag = false,
        honey_data = {},
        honey_pages = [],
        page = {},
        imgSet = '<imageset>',
        domain = 'http://www.otosia.com';

    grab.config({
            headers: {
                'User-Agent': ua.get('pc')
            },
            qs: {
                gzip: true
            }
        })
        .get(task.url, {}, {
            'User-Agent': ua.get('pc'),
            gzip: true
        })
        .set({
            'title': 'head title',
            'summary': 'meta[name="description"]@content',
            'coverPic': 'meta[property="og:image"]@content',
            'page': '.OtoNavBox #navNum span',
            'keywords': 'meta[name="keywords"]@content',
            'image': '.OtoPhoto .OtoPhotoSub img@src',
            'test': '.OtoNavBox a:last-child@href'
        })
        .data(function(data) {
            if (crtPage == 0) {
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
                honey_data.contentType = 1;
                honey_data.getType = 1;
                honey_data.summary = data.summary;
                honey_data.sourcePublishTime = beeDate.updateTimezone(new Date(),'id').valueOf();
                honey_data.coverPic = data.coverPic;
                honey_data.totalPage = data.page.split(' ')[3];
                honey_data.keywords = data.keywords;
                honey_data.listType = 0;
                honey.data = honey_data;

                page.pageNumber = 1;
                imgSet += "<img src='" + data.image + "'>";
                page.originalUrl = task.url;
                page.createTime = beeDate.updateTimezone(new Date(),'id').valueOf();
                page.modifyTime = 0;

                // honey_pages.push(page);
            } else {
                if (!errorFlag) {
                    if (data.image) {
                        imgSet += "<img src='" + data.image + "'>";
                    }
                }


                if (finish) {
                    imgSet += '</imageset>';
                    page.content = imgSet;
                    honey_pages.push(page);
                    logger.info(data.page);

                    honey.pages = honey_pages;
                }
            }
        })
        .page('.OtoNavBox a:last-child@href', '.OtoNavBox #navNum span', function(url, limit) {
            var arr = limit.split(' ');
            var max = parseInt(arr[3]),
                cur = parseInt(arr[1]);

            crtPage++;

            if (errorFlag) {
                finish = true;
                return;
            }

            if (cur < max) {
                if (cur + 1 == max) {
                    finish = true;
                }
                logger.info(cur, max, domain + url);
                return domain + url;
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
                flower: flower
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
