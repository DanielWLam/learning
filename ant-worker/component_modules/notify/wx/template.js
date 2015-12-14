var fs = require('fs'),
    path = require('path'),

    _ = require('underscore'),

    hasInited = false,

    templateFiles = [],
    templates = {};

// 初始化
function init() {
    if (!hasInited) {
        // 查找模板资源
        find(__dirname + '/template');

        // 逐个加载模板
        _.each(templateFiles, function (path) {
            load(path);
        });

        hasInited = true;
    }
}

// 查找模板资源
function find(p) {
    var _p = path.resolve(__dirname, p),
        stats = fs.statSync(_p);

    if (stats.isFile()) {
        if (_p.indexOf('.js') > 0) {
            templateFiles.push(p.replace('.js', ''));
        }
    } else {
        var files = fs.readdirSync(_p);
        files.forEach(function (file) {
            find(p + '/' + file);
        });
    }
}

// 装载模板资源
function load(path) {
    var parts = path.split('/'),
        key = parts[parts.length - 1];
    templates[key] = require(path);
}

// 根据数据编译出模板资源
function compile(key, data) {
    init();

    var template = templates[key],
        result = {};
    
    if (!template) {
        return null;
    }

    _.each(template, function (value, key) {
        if (_.isString(value) ||
            _.isNumber(fn)) {
            result[key] = {
                value: value
            };
        } else if (_.isFunction(value)) {
            var o = value(data);
            if (_.isString(o) ||
                _.isNumber(o)) {
                result[key] = {
                    value: o
                };
            } else {
                result[key] = o;
            }
        } else {
            result[key] = value;
        }
    });

    return result;
}

exports.compile = compile;