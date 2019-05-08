const Router = require('koa-router');

const router = new Router();

const defineRoutes = (app) => {
  app.use(router.routes());
};

module.exports = defineRoutes;
