/* 
 * @Author: daniel
 * @Date:   2015-12-15 19:43:43
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-16 16:46:45
 */

'use strict';
var mysql = require('../mysql/mysql');

function save(data, callback) {
    var simgleTask=data.flower[0].url;
    console.log(simgleTask);
    var data={
        id:1,
        url:simgleTask,
        tag:'sport',
        bee:'test',
        ip:'test',
        weight:0,
        createAt:0,
        updateAt:0,
        expireAt:0
    }
    mysql.pool.query('INSERT INTO flower SET ?', 
        [data],
        function(err, result) { 
            if(err) throw err;
            callback(result)            
        })
}
exports.save=save;