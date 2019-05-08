const accountService = require('./account.service');
const checkAuth = require('../../helpers/checkAuth');

module.exports = ({
  Query: {
    account: (parent, query) => accountService.findOne(query),
    accounts: () => accountService.find(),
    check: (parent, query, context) => accountService.check(context),
  },

  Mutation: {
    signIn: (parent, { idToken }, context) => accountService.signIn(idToken, context),

    signOut: (parent, query, context) => accountService.signOut(context),

    updateSettings: async (parent, { _id, ...remainingDocument }) => {
      if (!checkAuth(context)) return null;
      const account = await accountService.findOne({ _id });

      if (!account) {
        throw new Error(`Couldn't find account with id ${id}`);
      }
      return accountService.updateSettings({ _id }, remainingDocument);
    },
  },
});
