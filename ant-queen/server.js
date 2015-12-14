/* 
* @Author: daniel
* @Date:   2015-12-14 17:06:46
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-14 18:07:26
*/

'use strict';
var express=require('express'),
    conf=require('./conf'),
    middleware={
        bodyParser:require('body-parser'),
        cookieParser:require('cookie-parser'),
        multer:require('multer'),
        compress:require('compression')
    },
    app=express();

function init(){
    conf.init();

    app.use(middleware.bodyParser.json({
        limit: '10mb'
    }));
    // 处理 application/x-www-form-urlencoded 格式请求
    app.use(middleware.bodyParser.urlencoded({
        extended: true
    }));

    // 解析 multipart/form-data 格式请求
    //app.use(middleware.multer());

    // 解析请求中的 cookie
    app.use(middleware.cookieParser());

    // 启用压缩中间件
    app.use(middleware.compress());

    // 启用静态资源中间件
    app.use(express.static('public'));

    // 错误处理中间件
    // app.use(middleware.error);

    //设置跨域访问
    // Add headers
    // app.use(middleware.domain);

    // 启用API
    // app.use('/api', middleware.api());

    // 启用路由
    // app.use('/', middleware.router);

    var PORT=parseInt(process.env.LC_APP_PORT||4000, 10);
    app.listen(PORT,function(){
        console.log('Node app is running, port:',PORT);
    })
}
init();