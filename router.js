const Router = require('koa-router');
const router = new Router();

router.get('/', function (ctx, next) {
  ctx.redirect('./public')
  // ctx.body = 'hello world'
});

router.get('/list', function (ctx, next) {
  ctx.body = 'hhhhh'
});

module.exports = router;