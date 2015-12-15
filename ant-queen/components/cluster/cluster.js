/* 
 * @Author: daniel
 * @Date:   2015-12-15 17:02:43
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 19:33:35
 */

'use strict';
var mysql = require('../mysql/mysql');

function find(data, callback) {
    // mysql.init(function(err, result) {
    //     if(err) {
    //         console.log(err);
    //     }

    // })
    // console.log(callback.toString());
    mysql.pool.query('SELECT * FROM cluster',
        function(err, result) {
            if(err) throw err;

            callback(result);
        }
    );
}
// find({id:1},function(){
//     console.log('success');
// })
exports.find = find;