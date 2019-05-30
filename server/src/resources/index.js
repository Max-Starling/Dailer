const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const AccountSchema = require('./account/account.schema');
const RepeatableSchema = require('./repeatable/repeatable.schema');
const TaskSchema = require('./task/task.schema');
const MessageSchema = require('./message/message.schema');

const schemaArray = [AccountSchema, MessageSchema, TaskSchema, RepeatableSchema];

const AccountResolvers = require('./account/account.resolvers');
const RepeatableResolvers = require('./repeatable/repeatable.resolvers');
const TaskResolvers = require('./task/task.resolvers');
const MessageResolvers = require('./message/message.resolvers');

const resolversArray = [AccountResolvers, MessageResolvers, TaskResolvers, RepeatableResolvers];

module.exports = {
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
  context: async (props) => {
    if (props.connection) {
      return ({
        ...props.connection.context,
      });
    } else {
      if (typeof props.ctx.session === 'object') {
        return props.ctx;
      } else {
        warn('Session is missing');
        return null;
      }
    }
  },
  uploads: false,
  subscriptions: { // for SubscriptionClient
    path: '/graphql',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('onConnect', context);
    },
    onDisconnect: (webSocket, context) => {
      console.log('onDisconnect', context);
    },
  },
};
