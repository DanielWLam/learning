/* 
 * @Author: daniel
 * @Date:   2015-12-11 15:52:19
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 10:31:30
 */

'use strict';
var fs = require('fs'),
    path = require('path'),
    taskFiles = [],
    clueQueue=[],
    ants = {},
    clue=require('./api/clue/clue'),
    logger = console,
    schedule=require('node-schedule'),
    MAXCLUE=5;

function cronJob(){
    var rule= new schedule.RecurrenceRule(),
        time=[10,20,30,40,50,60];
    rule.second=time;
    schedule.scheduleJob(rule,function(){
        var crtClue=clueQueue.shift();
        if(typeof (crtClue)!='undefined'){
            run({
                oid:crtClue.objectId,
                eid:crtClue.eid,
                tag:crtClue.tag,
                url:crtClue.url,
                done:onTaskDone
            });
        }
        if(clueQueue.length<MAXCLUE){
            fetchClue();
        }else{
            logger.info('任务队列已满');
        }
    });
}

function fetchClue(){
    var fetch=clue.fetch;
    fetch(function(err,clues){
        if(err){
            logger.info(err);
            return;
        }
        if(!clues){
            logger.info("没有新任务");
            return;
        }
        clues.forEach(function(clue){
            clueQueue.push(clue);
            var crtClue=clueQueue.shift();
            run({
                oid:crtClue.objectId,
                tag:crtClue.tag,
                url:crtClue.url,
                done:onTaskDone
            });
        })
    })
}

function findTask(path) {
    var files = fs.readdirSync(path);

    files.forEach(function(item) {
        var tmpPath = path + '/' + item,
            stats = fs.statSync(tmpPath);
        if (stats.isDirectory()) {
            findTask(tmpPath);
        } else {
            taskFiles.push(tmpPath.replace(/.js/, ''))
        }
    })
}

function arragement() {
    taskFiles.sort();

    taskFiles.forEach(function(file) {

        var mod = require(file + '.js'),
            parts = file.split('/'),
            domain = parts[3],
            fileName = parts[4],
            ant = ants[domain];

        if (!ant || typeof(ant) == 'undefined') {
            ant = {};
        }
        ant[fileName] = mod;
        ants[domain] = ant;
    })
}

function getTopDomain(url) {
    var pattern = /[^./]\w+\.(com|net|io|cn)/;
    return url.match(pattern) ? url.match(pattern)[0] : null;
}

function init() {
    findTask('./ant');
    arragement();
}

function run(task) {
    var url=task.url,
        domain=getTopDomain(url),
        theAnt=ants[domain];
    

    if(!theAnt){
        logger.info('没有合适的工蚁');
        return;
    }

    var route=theAnt['_']().route,
        handleName;
    if(!route){
        logger.info('路由匹配出错');
        return;
    }

    for(var i=0;i<route.length;i++){
        if(url.match(route[i][0])){
            handleName=route[i][1];
            break;
        }
    }

    if(!handleName){
        logger.info('没有合适的处理器');
        return;
    }

    var handle=theAnt[handleName];

    handle(task);
}

module.exports={
    init:init,
    run:run
}