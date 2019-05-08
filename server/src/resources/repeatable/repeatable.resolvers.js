const repeatableService = require('./repeatable.service');
const checkAuth = require('../../helpers/checkAuth');

module.exports = ({
  Query: {
    repeatables: (parent, query, context) => {
      const email = checkAuth(context);
      if (!email) return [];
      return repeatableService.find({ user: email });
    },
    repeatable: (parent, query, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      return repeatableService.findOne({ user: email, ...query });
    }
  },

  Mutation: {
    createRepeatable: async (parent, document, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      return repeatableService.create({
        ...document,
        startTime: (new Date()).toISOString(),
        status: 'active',
        user: email,
      });
    },

    updateRepeatable: async (parent, { _id, ...remainingDocument }, context) => {
      if (!checkAuth(context)) return null;
      const repeatable = await repeatableService.findOne({ _id });

      if (!repeatable) {
        throw new Error(`Couldn't find repeatable with id ${id}`);
      }
      return repeatableService.update({ _id }, remainingDocument);
    },

    deleteRepeatable: (parent, query, context) => {
      if (!checkAuth(context)) return null;
      return repeatableService.remove(query);
    },
  },
});
