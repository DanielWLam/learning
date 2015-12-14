/* 
 * @Author: daniel
 * @Date:   2015-12-11 15:52:30
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-14 16:44:58
 */

'use strict';
var fs = require('fs'),
    _ = require('underscore'),
    path = require('path'),

    DEV_FILENAME = 'config.dev.json',
    PROD_FILENAME = 'config.json',

    logger = console;

function readJSON(filename) {
    var dir = __dirname + '/conf/',
        content,
        p = path.resolve(dir, filename),
        content = fs.readFileSync(p, "utf-8");
    return content ? JSON.parse(content) : null;
}

function init(){
    var prodConfig=readJSON(PROD_FILENAME),
        config=_.extend({},prodConfig);

    for(var key in config){
        exports[key]=config[key];
    }
}
exports.init=init;