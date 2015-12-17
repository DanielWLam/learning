/* 
* @Author: daniel
* @Date:   2015-12-15 19:58:11
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-17 17:05:50
*/

'use strict';
var harvest=require('../../components/harvest/harvest');

function onCreate(req,res){
    var  task=req.body;
    harvest.save(task,function(items){
        res.send(items);
    })
}
module.exports=[
    ['PUT','/harvest/onCreate',onCreate]
];