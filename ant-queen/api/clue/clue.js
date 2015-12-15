/* 
* @Author: daniel
* @Date:   2015-12-15 10:37:43
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-15 16:48:11
*/

'use strict';
var Clue=require('../../components/clue/clue');

function onCreate(req,res){
    var object={
        url:req.body.url,
        tag:req.body.tag,
        originial:req.body.originial,
        author:req.body.author
    }
    // Clue.create(object,function(err,result){
    //     if(err){
    //         res.send(null);
    //         return;
    //     }
    //     res.send(result);
    // })
}

function onGetList(req,res){
    var options={
        num:10,
        fromAnt:true
    }
    // Clue.create(options,function(err,result){
    //     if(err){
    //         res.send(null);
    //         return;
    //     }
    //     res.send(result);
    // });
    console.log('getting list...')
    var task={
        url:'http://www.otosia.com/berita/',
        done:function(err,result){
            console.log(result.harvest);
        }
    }
    return task;
}

module.exports=[
    ['put','/clue/onCreate',onCreate],
    ['get','/clue/onGetList',onGetList]
]