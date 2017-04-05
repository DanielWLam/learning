/* 
 * @Author: daniel
 * @Date:   2015-12-18 17:47:37
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-21 10:32:30
 */

'use strict';
define(function() {
    var max = function(x, y) {
        if (x > y) {
            return x;
        } else {
            return y;
        }
    }
    return {
        Max: max
    };
});