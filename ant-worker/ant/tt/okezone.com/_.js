/* 
* @Author: daniel
* @Date:   2015-11-04 16:19:04
* @Last Modified by:   daniel
* @Last Modified time: 2015-11-04 18:36:24
*/

'use strict';
var route=[
    [/sports.okezone.com\/motogp/,'okeList'],
    [/sports.okezone.com\/more_subcanal\/38/,'okeXHR'],
    [/sports.okezone.com\/read/,'okeDetail']
]
module.exports=function(){
    return{
        route:route
    };
}