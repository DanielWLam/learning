/* 
 * @Author: daniel
 * @Date:   2015-12-25 11:22:10
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-25 12:48:04
 */

'use strict';
var request = require('request');

function getChatResponse(req) {
        var url = 'http://sandbox.api.simsimi.com/request.p?key=6d25ff02-ed86-42e2-b46e-f2f14025491d&lc=en&ft=1.0&text=hi';
        request(url, function(err, res, body) {
            console.log(err);
            console.log(res.statusCode);
            console.log(body);
            res.send(body);
        })
    }
    // getChatResponse();
module.exports=[
    ['GET','/getChatResponse',getChatResponse]
]