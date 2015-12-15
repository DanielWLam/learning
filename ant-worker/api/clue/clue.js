/* 
 * @Author: daniel
 * @Date:   2015-12-14 18:20:10
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 17:50:34
 */

'use strict';
var _ = require('underscore'),
    request = require('request'),
    conf = require('../../conf'),
    logger = console;

function fetch(callback) {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        url = 'http://' + host + ':' + port + '/api/cluster/onFind';

console.log(host,port);

    request({
        method: 'GET',
        url: url,
        json: true
    }, function(err, res, clue) {
        console.log(url)
        console.log(clue);
        console.log('++++++');
        if (err || !clue) {
            callback("服务器异常", null);
            return;
        }
        callback(null, clue.length > 0 ? clue : null);
    });
}
exports.fetch = fetch;