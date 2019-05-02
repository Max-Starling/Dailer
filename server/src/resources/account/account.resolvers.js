const accountService = require('./account.service');

module.exports = ({
  Query: {
    account: (parent, query) => accountService.findOne(query),
    accounts: () => accountService.find(),
  },

  Mutation: {
    updateSettings: async (parent, { _id, ...remainingDocument }) => {
      const task = await accountService.findOne({ _id });

      if (!task) {
        throw new Error(`Couldn't find task with id ${id}`);
      }
      return accountService.updateSettings({ _id }, remainingDocument);
    },
  },
});
