/* 
 * @Author: daniel
 * @Date:   2015-12-21 11:01:23
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-21 18:39:30
 */

'use strict';
define(['jquery', 'underscore', 'backbone','router'], function ($, _, Backbone,Router) {
    var init = function() {
        var router=new Router();
        Backbone.history.start();
    };
    return {
        initialize: init
    }
});
