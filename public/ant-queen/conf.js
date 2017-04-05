/* 
 * @Author: daniel
 * @Date:   2015-12-14 17:06:53
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 16:32:30
 */

'use strict';
var fs = require('fs'),
    _ = require('underscore'),
    path = require('path'),

    PROD_FILENAME = 'config.prod.json',

    logger = console;

function readJSON(filename) {
    var dir = __dirname + '/conf/',
        content,
        p = path.resolve(dir, filename),
        content = fs.readFileSync(p, 'utf-8');

    return content ? JSON.parse(content) : null;
}

function init() {
    var prodConfig = readJSON(PROD_FILENAME),
        config = _.extend({}, prodConfig);

    for (var key in config) {
        exports[key] = config[key];
    }
}
exports.init = init;