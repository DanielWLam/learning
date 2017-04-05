/* 
* @Author: daniel
* @Date:   2015-12-14 17:06:46
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 18:01:38
*/

'use strict';
var express = require('express'),

    conf = require('./conf'),

    mysql=require('./components/mysql/mysql'),

    middleware = {
        bodyParser: require('body-parser'),
        cookieParser: require('cookie-parser'),
        multer: require('multer'),
        compress: require('compression'),
        domain: require('./middleware/domain'),
        api: require('./middleware/api'),
        router: require('./middleware/router'),
        error: require('./middleware/error')
    },

    app = express();

function init() {

    // 开启配置文件
    conf.init();

    // 定时任务
    // var cron = require('./cron');
    // cron.cronJob();

    // 处理 application/json 格式请求
    app.use(middleware.bodyParser.json({
        limit: '10mb'
    }));
    // 处理 application/x-www-form-urlencoded 格式请求
    app.use(middleware.bodyParser.urlencoded({
        extended: true
    }));

    // 解析 multipart/form-data 格式请求
    // app.use(middleware.multer);

    // 解析请求中的 cookie
    app.use(middleware.cookieParser());

    // 启用压缩中间件
    app.use(middleware.compress());

    // 启用静态资源中间件
    app.use(express.static('public'));

    // 错误处理中间件
    app.use(middleware.error);

    //设置跨域访问
    // Add headers
    app.use(middleware.domain);

    // 启用API
    app.use('/api', middleware.api());

    // 启用路由
    app.use('/', middleware.router);

    mysql.init(function(err, result) {
        if(err) {
            console.log(err);
        }

    });

    // LeanEngine 运行时会分配端口并赋值到该变量。
    var PORT = parseInt(process.env.LC_APP_PORT || 4000);

    app.listen(PORT, function() {
        console.log('Node app is running, port:', PORT);
    });
}

init();