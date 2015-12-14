var _ = require('underscore'),
    request = require('request'),
    Promise = require('bluebird'),

    conf = require('../../conf');

function get(na, callback) {
    var options;

    if (_.isString(na)) {
        options = {
            na: na
        };
    } else if (_.isObject(na)) {
        options = na;
    }

    return new Promise(function (resolve, reject) {
        var queen = conf.queen,
            host = queen.host,
            port = queen.port,
            secret = queen.secret,
            api = queen.api.proxy;

        options.secret = secret;

        request({
            method: 'GET',
            url: 'http://' + host + ':' + port + api,
            qs: options,
            json: true
        }, function (err, res, body) {
            if (err) {
                reject(err);
                return;
            }
            var list = body.list,
                count = body.count,
                index = Math.round(Math.random() * (count - 1)),
                proxy = list[index],
                proxyUrl;

            if (!proxy) {
                resolve(null);
                return;
            }

            proxyUrl = proxy.host + ':' + proxy.port;

            if (proxy.username && proxy.password) {
                proxyUrl = proxy.username + ':' + proxy.password + '@' + proxyUrl;
            }

            proxyUrl = proxy.protocol + '://' + proxyUrl;
            
            resolve(proxyUrl);
        });
    });
}
exports.get = get;