/* 
 * @Author: daniel
 * @Date:   2015-11-06 10:52:23
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-11-06 11:46:43
 */

'use strict';
var http = require('http');
var url = require('url');

function start(route,handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        // route(handle,pathname);

        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        var content=route(handle,pathname);
        response.write(content);
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log('server is starting');
}

exports.start = start;