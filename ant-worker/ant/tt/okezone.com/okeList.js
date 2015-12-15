/* 
 * @Author: daniel
 * @Date:   2015-11-04 16:25:07
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 10:24:42
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
        domain = "http://sports.okezone.com/motogp";

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
            'headline[]': '.template-pager-wrapper-sub .center .new-headline-thumb-sub a@href',
            'mainList[]': '.news-hardnews .list-berita li div.col-md-5 a[1]@href'
        })
        .data(function(data) {
            var count = 0; //0 means 2 pages totally, 1 means 3 pages totally.
            var XHRUrl = 'http://sports.okezone.com/more_subcanal/38/' + (8 + count * 4).toString();
            for (var i = 0; i < data.headline.length; i++) {
                flower.push({
                    'url': data.headline[i],
                    'data': {
                        categoryFirst: 'motogp'
                    }
                })
            }
            for (var i = 0; i < data.mainList.length; i++) {
                flower.push({
                    'url': data.mainList[i],
                    'data': {
                        categoryFirst: 'motogp'
                    }
                })
            }
            flower.push({
                'url': XHRUrl,
                'data': {
                    categoryFirst: 'motogp'
                }
            })

            _.each(flower, function(item) {
                extend.push({
                    url: item.url,
                    tags: [{
                        tag: 'motogp',
                        sourceUrl: task.url
                    }]
                })
            })
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
            }
            done(null, task);
        })
}