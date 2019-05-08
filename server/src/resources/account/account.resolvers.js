const accountService = require('./account.service');
const checkAuth = require('../../helpers/checkAuth');

module.exports = ({
  Query: {
    account: (parent, query) => accountService.findOne(query),
    currentAccount: (parent, query, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      return accountService.findOne({ email });
    },
    accounts: () => accountService.find(),
    check: (parent, query, context) => accountService.check(context),
  },

  Mutation: {
    signIn: (parent, { idToken }, context) => accountService.signIn(idToken, context),

    signOut: (parent, query, context) => accountService.signOut(context),

    updateSettings: async (parent, update, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      const account = await accountService.findOne({ email });

      if (!account) {
        throw new Error(`Couldn't find account ${email}`);
      }
      return accountService.updateSettings({ email }, update);
    },
  },
});
