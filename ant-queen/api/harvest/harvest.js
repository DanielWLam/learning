/* 
* @Author: daniel
* @Date:   2015-12-15 19:58:11
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 20:03:47
*/

'use strict';
var harvest=require('../../components/harvest/harvest');

function onSave(){
    harvest.save(data,function(){

    })
}
exports=[
    ['POST','/harvest/onSave',onSave]
];