const Koa = require('koa');
const app = new Koa();
var Router = require('koa-router');

// var app = new Koa();
var router = new Router();

router.get('/', function (ctx, next) {
  ctx.body = 'hello world'
});

router.get('/list', function (ctx, next) {
  ctx.body = 'hhhhh'
});


app
  .use(router.routes())
  .use(router.allowedMethods());
// middleware
// X-Response-Time
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   ctx.set('X-Response-Time', `${ms} ms`);
// });

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}`);
// });

// app.use(ctx => {
//   ctx.body = 'hello world'
// });

app.listen(3000)