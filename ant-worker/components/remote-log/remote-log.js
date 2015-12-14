var _ = require('underscore'),
    request = require('request'),

    conf = require('../../conf'),

    log = require('../../component_modules/log/log'),
    messageHub = require('../../component_modules/message-hub/message-hub'),

    ip = require('../ip/ip')(),

    isInit = false,

    logThrehold,
    debugApi,
    infoApi,
    warnApi,
    errorApi;

// 格式化日志
function formatLog(data) {
    var arr = [],
        log;
    _.each(data, function (o) {
        if (_.isString(o)) {
            arr.push(o);
        } else if (_.isObject(o)) {
            arr.push(JSON.stringify(o, null, 2));
        }
    });
    log = arr.join(' ');
    return log;
}

function init() {
    var queen = conf.queen,
        host = queen.host,
        port = queen.port,
        secret = queen.secret,
        api = 'http://' + host + ':' + port + '/log/';

    logThrehold = queen.logThrehold;
    debugApi = api + 'debug?secret=' + secret;
    infoApi = api + 'info?secret=' + secret;
    warnApi = api + 'warn?secret=' + secret;
    errorApi = api + 'error?secret=' + secret;

    isInit = true;
}

function debug(code) {
    if (!isInit) {
        init();
    }

    var args = Array.prototype.slice.call(arguments),
        message = formatLog(args);

    messageHub.emit('log.debug', message);

    log.debug(message);

    if (logThrehold !== 'info'
        && logThrehold !== 'warn'
        && logThrehold !== 'error') {
        request({
            method: 'PUT',
            uri: debugApi,
            body: {
                code: code,
                message: message,
                ip: ip
            },
            json: true
        }, function (err, res, body) {
        });
    }
}
exports.debug = debug;

function info(code) {
    if (!isInit) {
        init();
    }
    
    var args = Array.prototype.slice.call(arguments),
        message = formatLog(args);

    messageHub.emit('log.info', message);

    log.info(message);

    if (logThrehold !== 'warn'
        && logThrehold !== 'error') {
        request({
            method: 'PUT',
            uri: infoApi,
            body: {
                code: code,
                message: message,
                ip: ip
            },
            json: true
        }, function (err, res, body) {
        });
    }
}
exports.info = info;

function warn(code) {
    if (!isInit) {
        init();
    }
    
    var args = Array.prototype.slice.call(arguments),
        message = formatLog(args);

    messageHub.emit('log.warn', message);

    log.warn(message);

    if (logThrehold !== 'error') {
        request({
            method: 'PUT',
            uri: warnApi,
            body: {
                code: code,
                message: message,
                ip: ip
            },
            json: true
        }, function (err, res, body) {
        });
    }
}
exports.warn = warn;

function error(code) {
    if (!isInit) {
        init();
    }
    
    var args = Array.prototype.slice.call(arguments),
        message = formatLog(args);

    messageHub.emit('log.error', message);

    log.error(message);

    request({
        method: 'PUT',
        uri: errorApi,
        body: {
            code: code,
            message: message,
            ip: ip
        },
        json: true
    }, function (err, res, body) {
    });
}
exports.error = error;