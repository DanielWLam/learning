/* 
 * @Author: daniel
 * @Date:   2015-12-18 17:41:03
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-18 18:02:45
 */

'use strict';
require(["max", "./js/jquery-1.11.3.js"], function(str) {
    $("#button1").on('click',function(){
        var $a=$('#text1').val(),
            $m=str.OrE($a);
            $('#tip').show().html('The number is :'+$m);
    })
})