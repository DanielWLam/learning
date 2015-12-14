var _ = require('underscore'),
    request = require('request'),
    uuid = require('uuid'),

    log = require('../../component_modules/log/log'),
    stat = require('../../component_modules/stat/stat'),

    conf = require('../../conf');

function fetch(biz, callback) {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        secret = queen.secret,
        bid = biz ? biz.bid : null,
        url = 'http://' + host + ':' + port + '/task/create';

    request({
        method: 'GET',
        url: url,
        qs: {
            secret: secret,
            bid: bid
        },
        timeout: 10000,
        json: true
    }, function (err, res, task) {
        if (err || !res || res.statusCode !== 200 || !task) {
            log.error('{{FETCH_TASK_ERROR}}', err, res && res.statusCode, task);
            stat.tick('task', 'create', 'error');
            callback(err || (res && res.statusCode), null, bid);
            return;
        }

        if (_.isArray(task)) {
            task = task[0];
        }

        stat.tick('task', 'create', 'ok');
        callback(null, task, bid);
    });
}
exports.fetch = fetch;