var fs = require('fs'),
    path = require('path'),
    
    _ = require('underscore'),
    express = require('express'),

    logger = console,

    apiDir = '../api',

    router = express.Router(),

    apiFiles = [],
    apis = [];

function fetchApi(p) {
    var _p = path.resolve(__dirname, p),
        stats = fs.statSync(_p);

    if (stats.isFile()) {
        apiFiles.push(p.replace('.js', ''));
    } else {
        var files = fs.readdirSync(_p);
        files.forEach(function (file) {
            fetchApi(p + '/' + file);
        });
    }
}

module.exports = function (options) {
    var method, path, callback;

    fetchApi(apiDir);

    apiFiles.forEach(function (path) {
        var apiArray = require(path);
        if (_.isArray(apiArray)) {
            apiArray.forEach(function (o) {
                apis.push(o);
            });
        }
    });

    var fixApi = [],
        argApi = [];

    _.each(apis, function (api) {
        if (api[1].indexOf(':') > -1) {
            argApi.push(api);
        } else {
            fixApi.push(api);
        }
    });

    argApi.sort(function (a, b) {
        var i1 = a[1].indexOf(':'),
            i2 = b[1].indexOf(':');
        return i1 < i2;
    });

    apis = [];
    _.each(fixApi, function (api) {
        apis.push(api);
    });
    _.each(argApi, function (api) {
        apis.push(api);
    });
    
    apis.forEach(function (api) {
        method = api[0].toLowerCase();
        path = api[1];
        callback = api[2];
        router[method](path, callback);
        logger.info('Handling API', method, path);
    });

    router.options = options || {};
    return router;
};