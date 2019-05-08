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
  context: async (props) => {
    const ctx = props.ctx;
    if (typeof ctx.session === 'object') {
      return props.ctx;
    } else {
      warn('Session is missing');
      return null;
    }
  },
};
