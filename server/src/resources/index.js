const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const AccountSchema = require('./account/account.schema');
const AccountResolvers = require('./account/account.resolvers');
const TaskSchema = require('./task/task.schema');
const TaskResolvers = require('./task/task.resolvers');

const schemaArray = [AccountSchema, TaskSchema];
const resolverArray = [AccountResolvers, TaskResolvers];

module.exports = {
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolverArray),
  context: async ({ ctx }) => {
    // console.log(ctx.session.email);
    console.log('sess', ctx.session.email);
    if (typeof ctx.session === 'object') {
      const { email } = ctx.session;
      if (!email) {
        warn('User is unauthorized');
      }
      return { email };
    } else {
      if (!email) {
        warn('Session is missing');
      }
      return null;
    }
  },
};
