var fs = require('fs'),
    path = require('path'),

    _ = require('underscore'),
    swig = require('swig'),

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
        if (_p.indexOf('.html') > 0) {
            templateFiles.push(p.replace('.html', ''));
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
    parse(key, path + '.html');
}

// 解析模板资源
function parse(key, string) {
    if (key && string) {
        templates[key] = swig.compileFile(string);
    }
}

// 根据数据编译出模板资源
function compile(key, data) {
    init();

    var template = templates[key];
    
    if (!template) {
        return null;
    }

    return template({
                data: data
            });
}

exports.compile = compile;