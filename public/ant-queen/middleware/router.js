/* 
 * @Author: daniel
 * @Date:   2015-12-15 15:21:19
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 16:34:30
 */

'use strict';
var express = require('express'),

    router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// 定义网站主页的路由
router.get('/', function(req, res) {
    res.send('info-contractor home page');
});

// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About Me?');
});

module.exports = router