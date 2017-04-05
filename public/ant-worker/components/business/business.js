var fs = require('fs'),
    path = require('path'),

    _ = require('underscore'),
    async = require('async'),
    request = require('request'),

    log = require('../../component_modules/log/log'),

    conf = require('../../conf'),
    
    // 本地可用的业务列表
    businessList = [],
    currentIndex = 0;

function updateActive(callback) {
    var queenConf = conf.queen,
        host = queenConf.host,
        port = queenConf.port,
        secret = queenConf.secret,
        allowBids = queenConf.allowBids,
        api = queenConf.api.business.list,
        url = 'http://' + host + ':' + port + api,
        list = [];

    if (allowBids && allowBids.length > 0) {
        _.each(allowBids, function (bid) {
            list.push({
                bid: bid
            });
        });
        businessList = list;
        callback(null, businessList);
    } else {
        request({
            method: 'GET',
            url: url,
            qs: {
                secret: secret
            },
            json: true
        }, function (err, res, body) {
            if (err || !res || res.statusCode !== 200 || !body) {
                log.error('{{GET_BUSINESS_ERROR}}', err, res && res.statusCode, body);
                return;
            }
            try {
                businessList = body.data;
                callback(null, businessList);
            } catch (e) {
                log.error('{{PARSE_BUSINESS_ERROR}}', e);
                if (callback) {
                    callback(e);
                }
            }
        });
    }
}

function update() {
    updateActive(function () {
        currentIndex = Math.round(businessList.length * Math.random());
    });
}
exports.update = update;

function next() {
    var count = businessList.length;
    if (count <= 0) {
        return null;
    }

    if (currentIndex < count - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    return businessList[currentIndex];
}
exports.next = next;