/* 
 * @Author: daniel
 * @Date:   2015-12-15 10:41:03
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 17:51:31
 */

'use strict';
var _ = require('underscore'),
    async = require('async'),
    uuid = require('uuid'),
    conf = require('../../conf'),
    mysql = require('../mysql/mysql'),
    cluster = require('../cluster/cluster');

function newTask(task) {
    var _flower = task.flower,
        _cluster = task.cluster,
        url;

    task.id = uuid.v4();
    task.createAt = Date.now();

    if (_flower) {
        url = _flower.url;
        task.bid = _flower.bid;
        task.weight = _flower.weight;
        task.cid = _flower.cid;
        task.fid = _flower.id;
        // task.data = _flower.data;

        task.flower = {
            url: url
        };
    }
    if (_cluster) {
        url = _cluster.url;
        task.weight = _cluster.weight;
        task.bid = _cluster.bid;
        task.cid = _cluster.id;

        task.cluster = {
            url: url
        };
    }

    stat.tick(url, 'task', 'create');

    return task;             
}

function create(params, callback) {
    var task;

    // 先取 cluster
    cluster.pop(params, function (err, cluster) {
        if (!err && cluster) {
            task = newTask({
                cluster: cluster
            });

            insert(task, callback);

        // 没有 cluster ，取 flower
        } else {
            flower.pop(params, function (err, flower) {
                if (!err && flower) {
                    task = newTask({
                        flower: flower
                    });

                    insert(task, callback);

                // cluster 和 flower 都没有,  ╮(╯▽╰)╭，返回错误咯
                } else {
                    callback(err);
                }
            });
        }
    });
}
exports.create = create;