/* 
 * @Author: daniel
 * @Date:   2015-11-06 10:52:17
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-11-06 11:28:41
 */

'use strict';
var server = require('./server');
var route = require('./route');
var requestHandlers=require('./requestHandlers');

var handle={};
handle["/"]=requestHandlers.start;
handle["/start"]=requestHandlers.start;
handle["/upload"]=requestHandlers.upload;

server.start(route.route,handle);