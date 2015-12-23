/* 
* @Author: daniel
* @Date:   2015-12-21 11:14:11
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-21 12:33:23
*/

'use strict';
define(['jquery'],function($){
    document.firstPage=true;
    $(document).on("mobileinit",function(){
        $.mobile.ajaxEnabled=false;
        $.mobile.linkBindingEnabled=false;
        $.mobile.hashListeningEnabled=false;
        $.mobile.pushStateEnabled=false;
        $.mobile.defaultPageTransition='slide';
        $('div[data-role="page"]').on('pagehide',function(event,ui){
            $(event.currentTarget).remove();
        });
    });
});