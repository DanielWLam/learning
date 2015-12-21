/* 
 * @Author: daniel
 * @Date:   2015-12-21 11:01:27
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-21 19:36:11
 */

'use strict';
require.config({
    paths: {
        jquery: 'script/jqm/jquery-1.8.2.min',
        jqmconfig: 'plugin/jqm.config',
        jqm: 'script/jqm/jquery.mobile-1.1.0.min',
        underscore: 'script/underscore/underscore-amd',
        backbone: 'script/backbone/backbone-amd',
        text: 'plugin/text',
        plugin: 'plugin',
        templates: '../templates',
        modules: '../modules'
    }
});
require(['app'], function(app) {
    app.initialize();
})
