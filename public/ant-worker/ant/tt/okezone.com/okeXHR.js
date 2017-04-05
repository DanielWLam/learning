/* 
* @Author: daniel
* @Date:   2015-11-04 18:14:50
* @Last Modified by:   daniel
* @Last Modified time: 2015-11-13 16:38:18
*/

'use strict';
var logger = console,
    _ = require('underscore'),
    request = require('request'),
    cheerio = require('cheerio'),
    ua = require('../../../components/header/ua'),
    Grab = require('../../../components/grab/grab');

module.exports=function(task){
    var grab=new Grab(),
        flower=[],
        honey=[],
        done=task.done;

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
            'mainList[]':'li div.col-md-5 a[1]@href'
        })
        .data(function(data){
            var count=0;
            for(var i=0;i<data.mainList.length;i++){
                flower.push({
                    'url':data.mainList[i]
                })
            }
            var XHRUrl=task.url.replace(/\d+$/,'');
            for(var i=0;i<count;i++){
                flower.push({
                    'url':XHRUrl+((i+3)*4).toString()
                })
            }
        })
        .done(function(msg){
            task.harvest={
                author:'Daniel',
                tag:'i-id-news',
                honey:honey,
                flower:flower
            }
            done(null,task);
        })
}