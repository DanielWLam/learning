/* 
* @Author: daniel
* @Date:   2015-11-06 11:30:42
* @Last Modified by:   daniel
* @Last Modified time: 2015-11-06 11:41:10
*/

'use strict';
function start(){
    console.log('i am start');
    return "Hello start";
}
function upload(){
    console.log('i am upload');
    return "Hello upload";
}

exports.start=start;
exports.upload=upload;