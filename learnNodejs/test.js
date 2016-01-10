var express=require('express');
var bodyparser=require('body-parser');
var path=require('path');

var app=express();
// app.createServer();
app.use(bodyparser);
app.use(express.static(path.join(__dirname,'public')));
app.all('/',function(req,res){
    res.send(req.body.title+req.body.text);
});
app.listen(3000);