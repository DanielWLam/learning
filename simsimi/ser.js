/* 
 * @Author: daniel
 * @Date:   2015-12-25 12:50:34
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-25 13:17:19
 */

'use strict';
/* 
 * @Author: daniel
 * @Date:   2015-12-14 17:06:46
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-15 18:01:38
 */

'use strict';
var express = require('express'),
    request = require('request'),
    app = express();


// express.static(root,index);
app.use(express.static('./'));
app.get('/getChatResponse', function(req, res) {
    var url = 'http://sandbox.api.simsimi.com/request.p?key=6d25ff02-ed86-42e2-b46e-f2f14025491d&lc=en&ft=1.0&text=hi';
    var response = res;
    request(url, function(err, res, body) {
        response.send(body);
    })
});

app.listen(8000, function() {
    console.log('listen port: 8000');
});