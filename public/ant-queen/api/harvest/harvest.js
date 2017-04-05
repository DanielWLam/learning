/* 
 * @Author: daniel
 * @Date:   2015-12-15 19:58:11
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-18 11:11:14
 */

'use strict';
var harvest = require('../../components/harvest/harvest');

function onCreate(req, res) {
    var task = req.body;
    harvest.save(task, function(items) {
        res.send(items);
    })
}

function onSave(req, res) {
    var task = req.body;
    harvest.saveHoney(task, function(items) {
        res.send(items);
    })
}
module.exports = [
    ['PUT', '/harvest/onCreate', onCreate],
    ['PUT', '/harvest/onSave', onSave]
];