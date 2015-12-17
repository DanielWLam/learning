/* 
 * @Author: daniel
 * @Date:   2015-12-15 17:02:11
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-17 16:55:23
 */

'use strict';
var cluster=require('../../components/cluster/cluster');
function onFind(req, res) {
    var params = req.params,
        qs=req.query,
        bid=qs.bid,
        data = {
            id: params.id
        };
    cluster.find(data,function(items){
        res.send(items);
    });
}
module.exports=[
    ['GET','/cluster/onFind',onFind]
];