const Router = require('koa-router');
const router = new Router();

router.get('/list', function * (ctx, next) {
  console.log(123)
});

module.exports = router;