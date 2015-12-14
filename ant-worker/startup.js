/* 
 * @Author: daniel
 * @Date:   2015-12-11 15:52:12
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-14 17:03:08
 */

'use strict';

var commander = require('commander'),
    cluster = require('cluster'),
    os = require('os'),
    ant = require('./ant'),
    conf = require('./conf'),
    cpus = os.cpus().length,
    maxClusterCount = cpus * 2,
    logger = console;

function start(){
    commander.version('0.0.1')
            .option('-u,--url <url>','url')
            .parse(process.argv);
    //打印当前的进程号
    logger.info('pid:', process.pid);
    
    conf.init();
    ant.init(); 
    if(!commander.url&&cluster.isMaster){
        for(var i=0;i<1;i++){
            cluster.fork();
        }
        cluster.on('exit',function(){
            console.log('An worker process died,restarting...');
            cluster.fork();
        });
    }
    if(commander.url){
        var task={};
        task.url=commander.url;
        task.done=function(err,result){
            console.log(result.harvest);
        }
        ant.run(task);
    }
    if(!cluster.isMaster){
        ant.run();
    }
}
start();