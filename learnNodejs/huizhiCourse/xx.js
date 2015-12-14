/* 
 * @Author: daniel
 * @Date:   2015-12-11 16:17:48
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-11 18:29:13
 */

'use strict';
var fs = require('fs');
var url = require('url');
var childProcess=require('child_process');

var child=childProcess.spawn('ls');
child.stdout.on('data',function(data){
    console.log(data);
})