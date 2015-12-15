/* 
* @Author: daniel
* @Date:   2015-12-15 11:04:48
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 11:09:55
*/

'use strict';
var _=require('underscore'),
    mysql=require('mysql'),
    conf=require('../../conf');

function init(callback){
    var dbConf=conf.mysql,
    pool=mysql.createPool({
        connectionLimit:10,
        host : dbConf.host,
        port : dbConf.port,
        database : dbConf.database,
        user : dbConf.user,
        password : dbConf.password
    });
    exports.pool=pool;
    callback(null,pool);
}
exports.init=init;