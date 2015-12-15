/* 
* @Author: daniel
* @Date:   2015-12-15 10:41:03
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 11:01:53
*/

'use strict';
var Q=require('q'),
    conf=require('../../conf'),
    monitor=require('../monitor/monitor');

function create(object,callback){
    var clue=new Clue();
    clue.save(object,{
        clue.save(object,{
            success:function(result){
                callback(null,result);
            },
            error:function(error){
                callback('保存失败',null);
            }
        });
    });
}
exports.create=create;

function search(id,callback){
    var query=new 
}