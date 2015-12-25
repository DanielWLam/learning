/* 
 * @Author: daniel
 * @Date:   2015-12-25 09:59:32
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-25 10:17:29
 */

'use strict';

function createXHR() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
        var versions = ['MSXML2 .XMLHttp.6.0', 'MSXML2 .XMLHttp.3.0', 'MSXML2 .XMLHttp'],
            i,
            len;
        for (var i = 0, len = versions.length; i < len; i++) {
            try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
            } catch (e) {
                console.log(e);
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else{
        throw new Error('no xhr object available.');
    }
}

var xhr=createXHR();
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
            console.log(xhr.responseText);
        }else{
            console.log('unsuccessful: '+xhr.status);
        }
    }
};
xhr.open('GET','http://sandbox.api.simsimi.com/request.p?key=6d25ff02-ed86-42e2-b46e-f2f14025491d&lc=en&ft=1.0&text=hi',true);

xhr.send(null);