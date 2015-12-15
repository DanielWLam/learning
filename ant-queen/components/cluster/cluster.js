/* 
 * @Author: daniel
 * @Date:   2015-12-15 11:13:29
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 12:37:33
 */

'use strict';
var _ = require('underscore'),
    url = require('url'),
    uuid = require('uuid'),
    domain = require('../domain/domain'),
    conf = require('../../conf'),
    stat = require('../stat/stat'),
    mysql = require('../mysql/mysql');