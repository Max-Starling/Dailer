const Router = require('koa-router');
const googleConfig = require('./config/google');
const { OAuth2Client } = require('google-auth-library');

const router = new Router();

const oAuth2Client = new OAuth2Client(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

router.post('/login', async (ctx) => {
  let email;
  try {
    const { idToken } = ctx.request.body;
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: googleConfig.clientId,
    });
    email = ticket.getPayload().email;
  } catch (e) {
    logError(e);
  }
  console.log('login', ctx.session.isNew, email);
  if (ctx.session.isNew && email) {
    ctx.session.email = email;
    ctx.body = `logged in with ${email}`;
  } else {
    ctx.body = 'already logged in';
  }
});

router.get('/check', async (ctx) => {
  ctx.body = { isAuthorized: !!ctx.session.email };
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
