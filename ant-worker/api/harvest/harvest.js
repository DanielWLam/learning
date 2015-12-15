/* 
* @Author: daniel
* @Date:   2015-12-15 19:40:03
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 20:02:38
*/

'use strict';

var request=require('request'),
    conf=require('../../conf');

function create(task,callback){
    var queen=conf.queen,
        host=conf.host,
        port=conf.port,
        url='http://'+host+':'+port+'/api/harvest/onCreate';

    request({
        method:'POST',
        url:url,
        json:true,
        body:task
    },function(err,res,body){

    })
}
exports.create=create;