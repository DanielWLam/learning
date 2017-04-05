/* 
 * @Author: daniel
 * @Date:   2015-12-15 19:43:43
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-18 16:00:26
 */

'use strict';
var mysql = require('../mysql/mysql');

function save(data, callback) {
  var resultData = [];
  var errFlag = 0;
  // mysql.init(function(err, result) {
  //     if(err) {
  //         console.log(err);
  //     }

  // })
  for (var i = 0, len = data.harvest.flower.length; i < len; i++) {
    var simgleTask = data.harvest.flower[i].url;
    var row = {};
    row.url = simgleTask;

    mysql.pool.query('INSERT INTO flower SET ?', row, function(err, result) {
      if (err) {
        errFlag = 1;
        throw err;
      }
      resultData.push(result);
    })
  }
  if (errFlag == 0) {
    callback(resultData);
  }
}
// save(testData,function(){console.log(123)})
exports.save = save;


function saveHoney(data, callback) {
  var resultData = [];
  var errFlag = 0;
  var row = {};
  row.data=data.harvest.honey;

  var test=JSON.stringify(row.data);

  mysql.pool.query('INSERT INTO honey SET data = ?', [test], function(err, result) {
    if (err) {
      errFlag = 1;
      throw err;
    }
    resultData.push(result);
  })
  if (errFlag == 0) {
    callback(resultData);
  }
}

exports.saveHoney = saveHoney;