/* 
 * @Author: daniel
 * @Date:   2015-12-14 18:20:10
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-14 18:25:29
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
        url = 'http://' + host + ':' + port + '/api/clue/onGetList';

    request({
        method: 'GET',
        url: url,
        json: true
    }, function(err, res, clue) {
        if (err || !clue) {
            callback("服务器异常", null);
            return;
        }
        callback(null, clue.length > 0 ? clue : null);
    });
}
exports.fetch = fetch;