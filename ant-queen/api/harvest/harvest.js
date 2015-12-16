/* 
* @Author: daniel
* @Date:   2015-12-15 19:58:11
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-16 19:56:04
*/

'use strict';
var harvest=require('../../components/harvest/harvest');

function onCreate(req,res){
    var params = req.params,
        qs=req.query,
        task=qs.data;

    harvest.save(task,function(items){
        res.send(items);
    })
}
exports=[
    ['POST','/harvest/onCreate',onCreate]
];