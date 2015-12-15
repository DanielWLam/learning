/* 
 * @Author: daniel
 * @Date:   2015-12-15 17:02:11
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 19:34:34
 */

'use strict';
var cluster=require('../../components/cluster/cluster');
function onFind(req, res) {
    console.log(req.query)
    var params = req.query,
        data = {
            id: params.id
        };
    cluster.find(data,function(items){
        res.send(items);
        // console.log(items)
    });
}
module.exports=[
    ['GET','/cluster/onFind',onFind]
];