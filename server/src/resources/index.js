const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const AccountSchema = require('./account/account.schema');
const RepeatableSchema = require('./repeatable/repeatable.schema');
const TaskSchema = require('./task/task.schema');

const schemaArray = [AccountSchema, TaskSchema, RepeatableSchema];

const AccountResolvers = require('./account/account.resolvers');
const RepeatableResolvers = require('./repeatable/repeatable.resolvers');
const TaskResolvers = require('./task/task.resolvers');

const resolversArray = [AccountResolvers, TaskResolvers, RepeatableResolvers];

module.exports = {
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
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
