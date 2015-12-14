var _ = require('underscore'),
    request = require('request'),

    log = require('../log/log'),

    conf = require('../../conf'),

    api,

    isInit = false;

function init() {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        secret = queen.secret;

    api = 'http://' + host + ':' + port + '/wa/log?secret=' + secret;

    isInit = true;
}

function send(data) {
    if (!isInit) {
        init();
    }

    var url = api;
    _.each(data, function (v, k) {
        url += '&' + k + '=' + v;
    });

    request({
        method: 'GET',
        uri: url,
    }, function (err, res, body) {
        if (err) {
            log.error('[WA_LOG_ERROR]', err, body);    
        }
    });
}
exports.send = send;
