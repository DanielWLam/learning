/* 
* @Author: daniel
* @Date:   2015-11-06 11:17:48
* @Last Modified by:   daniel
* @Last Modified time: 2015-11-06 11:41:32
*/

'use strict';
function route(handle,pathname){
    console.log('about to route a request for '+ pathname);
    if(typeof handle[pathname]==='function'){
        return handle[pathname]();
    }else{
        console.log('no request handler found for '+pathname);
        return "404 not found";
    }
}

exports.route=route;