/* 
* @Author: daniel
* @Date:   2015-12-15 15:36:01
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 15:36:03
*/

'use strict';
module.exports = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}