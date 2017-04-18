const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const router = require('./router.js');

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('public'))
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
app.listen(3000, () => {
  console.log('Listening on port: 3000')
})