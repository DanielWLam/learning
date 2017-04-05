/* 
* @Author: daniel
* @Date:   2015-12-15 15:36:21
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 15:36:30
*/

'use strict';
var express = require('express'),

    router = express.Router();

// 该路由使用的中间件
router.use(function (err, req, res, next) {
    if (res.status(500)) {
        res.send('Something broke!');
    } else {
        next();
    }
});

module.exports = router;