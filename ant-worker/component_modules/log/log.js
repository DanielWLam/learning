var log4js = require('log4js'),

    conf = require('../../conf'),

    isInit = false,

    mode,
    level,

    log,
    maxSize,
    backups,

    appenders,

    app;

function init() {
    mode = conf.mode;
    level = 'INFO';

    log = conf.log;

    if (log) {
        maxSize = log.maxSize;
        backups = log.backups;
    }

    appenders = [
        {
            type: 'file',
            category: 'app',
            filename: 'private/log/app.log',
            maxLogSize: maxSize || 1024000000,
            backups: backups || 10
        }
    ];

    // 开发环境下采用开发配置
    if (mode !== 'production') {
        appenders.push({
            type: 'console'
        });

        level = 'DEBUG';
    }

    // 配置 log4js
    log4js.configure({
        appenders: appenders,
        replaceConsole: true
    });

    // 配置单个日志
    app = log4js.getLogger('app');
    app.setLevel(level);

    isInit = true;
}

function debug() {
    var args = Array.prototype.slice.apply(arguments);
    
    if (!isInit) {
        init();
    }

    app.debug.apply(app, args);
}
exports.debug = debug;

function info() {
    var args = Array.prototype.slice.apply(arguments);

    if (!isInit) {
        init();
    }

    app.info.apply(app, args);
}
exports.info = info;

function warn() {
    var args = Array.prototype.slice.apply(arguments);

    if (!isInit) {
        init();
    }

    app.warn.apply(app, args);
}
exports.warn = warn;

function error() {
    var args = Array.prototype.slice.apply(arguments);

    if (!isInit) {
        init();
    }

    app.error.apply(app, args);
}
exports.error = error;