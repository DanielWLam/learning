var koa = require('koa');
var app = koa();

app.use(function *(){
    this.body = 'Hello world!';
});

app.listen(3000,function(){
    console.log('Koa is listening to http://localhost:3000');
});