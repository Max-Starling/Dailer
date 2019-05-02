const Router = require('koa-router');
const router = new Router();

// router.get('/hello', () => console.log('hello'));

const defineRoutes = (app) => {
  app.use(router.routes());
};

module.exports = defineRoutes;
