const Router = require('koa-router');
const router = new Router();

router.post('/login', async (ctx) => {
  const { email } = ctx.request.body;
  console.log('login', ctx.session.isNew, email);
  if (ctx.session.isNew && email) {
    ctx.session.email = email;
    ctx.body = `logged in with ${email}`;
  } else {
    ctx.body = 'already logged in';
  }
});

router.post('/logout', async (ctx) => {
  console.log('logout', ctx.session.email);
  ctx.session = null;
  ctx.body = "logged out";
});

const defineRoutes = (app) => {
  app.use(router.routes());
};

module.exports = defineRoutes;
