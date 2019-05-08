const { OAuth2Client } = require('google-auth-library');
const createService = require('../../helpers/createService');
const googleConfig = require('../../config/google');
const { collectionNames } = require('../constants');
const checkAuth = require('../../helpers/checkAuth');

const service = createService(collectionNames.ACCOUNT);

const oAuth2Client = new OAuth2Client(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

const defaultUser = {
  email: null,
  settings: {
    mode: 'light',
  },
};

service.signIn = async (idToken, ctx) => {
  let email;
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: googleConfig.clientId,
    });
    email = ticket.getPayload().email;
  } catch (e) {
    logError(e);
  }

  if (ctx.session.isNew && email) {
    ctx.session.email = email;
    log(`signed in ${email}`);
  } else {
    log(`already signed in ${ctx.session.email}`);
  }

  try {
    const user = await service.findOne({ email });
    if (!user) {
      await service.create({
        ...defaultUser,
        email, 
      });
    }
  } catch (e) {
    logError(e);
  }
  return email;
};

service.check = ctx => !!checkAuth(ctx, false);

service.signOut = async (ctx) => {
  const email = ctx.session.email;
  ctx.session = null;
  log(`signed out ${email}`);
  return email;
};

service.updateSettings = async (filter, update) => {
  const updatedAccount = await service.update(filter, { settings: update });
  return updatedAccount.settings;
};

module.exports = service;
