var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser());
// app.use(express.static('public'));
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})
app.all('/', function(req, res) {
    res.send(req.body.title + req.body.text);
});
app.listen(3000);