var _ = require('underscore'),
    request = require('request'),

    md5 = require('../md5/md5'),

    log = require('../log/log'),

    MAX = 100,
    EXPIRE_TIME = 1 * 3600 * 1000,

    // key: {
    //     expireAt: time,
    //     list: []
    // }
    proxies = {};

// options: {
//     api:
//     secret,
//     na:
//     stable:
// }
function req(options, callback) {
    var api = options.api,
        secret = options.secret,
        na = options.na,
        stable = options.stable,
        max = MAX,
        ts = Date.now(),
        sign = md5(ts + secret),
        params = {
            ts: ts,
            sign: sign,
            max: max,
            na: na,
            stable: stable
        };

    request({
        method: 'GET',
        url: api,
        qs: params,
        json: true
    }, function (err, res, body) {
        if (err || !body) {
            log.error('{{FREE_GATE_REQ_ERROR}}', err, body);
            callback(err);
        } else {
            var data = body.data,
                proxies = data && data.proxies;
            callback(err, proxies);
        }
    });
}
exports.req = req;

// options: {
//     api:
//     secret,
//     max:
//     na:
//     stable:
// }
function get(options, callback) {
    var api = options.api,
        secret = options.secret,
        max = options.max || 10,
        na = options.na || 'cn',
        stable = options.stable || true,
        key = md5(na + stable),
        data,
        list;

    if (data = proxies[key]) {
        if (Date.now() < data.expireAt) {
            list = data.list;
            callback(_.initial(list, list.length - max));
            return;
        }
    }

    if (!list) {
        req({
            api: api,
            secret: secret,
            na: na,
            stable: stable,
            max: max
        }, function (err, list) {
            proxies[key] = {
                expireAt: Date.now() + EXPIRE_TIME,
                list: list || []
            };
            callback(list ? _.initial(list, list.length - max) : []);
        })
    }
}
exports.get = get;