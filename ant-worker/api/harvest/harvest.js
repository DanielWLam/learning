/* 
 * @Author: daniel
 * @Date:   2015-12-15 19:40:03
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-18 11:10:53
 */

'use strict';

var request = require('request'),
    conf = require('../../conf');

function create(task, callback) {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        url = 'http://' + host + ':' + port + '/api/harvest/onCreate';

    request({
        method: 'PUT',
        url: url,
        json: true,
        body: task
    }, function(err, res, body) {
        if (err || !body) {
            console.log(err)
            callback("服务器异常", null);
            return;
        }
        callback(null, body.length > 0 ? body : null);
    })
}
exports.create = create;

function saveHoney(task, callback) {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        url = 'http://' + host + ':' + port + '/api/harvest/onSave';

    request({
        method: 'PUT',
        url: url,
        json: true,
        body: task
    }, function(err, res, body) {
        if (err || !body) {
            console.log(err)
            callback("服务器异常", null);
            return;
        }
        callback(null, body.length > 0 ? body : null);
    })
}
exports.saveHoney = saveHoney;