/* 
* @Author: daniel
* @Date:   2015-12-18 17:47:37
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-18 18:00:33
*/

'use strict';
define(["json"],function(data){
    var html=function(y){
        if(data.OddOrEven(y)){
            return "Odd";
        }else{
            return "Even";
        }
    }
    return{
        OrE:html
    };
});