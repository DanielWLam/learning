/* 
 * @Author: daniel
 * @Date:   2015-12-15 19:43:43
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 19:57:25
 */

'use strict';
var mysql = require('../mysql/mysql');

function save(data, callback) {
    mysql.pool.query('INSERT INTO flower SET id=?', 
        [data.id],
        function(err, result) { 
            if(err) throw err;

            console.log(result)
        })
}
exports.save=save;