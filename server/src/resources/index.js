const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const redisConfig = require('../config/redis');

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

const Cookies = require('cookies');

module.exports = (redisStore) => ({
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
  context: async (props) => {
    if (props.payload) {
      console.log('CON', props.payload);
      return ({
        ...props.connection.context,
      });
    } else {
      // console.log(props.ctx.session.email);
      
      if (typeof props.ctx.session === 'object') {
        return props.ctx;
      } else {
        warn('Session is missing');
        return null;
      }
    }
  },
  uploads: false,
  subscriptions: {
    path: '/graphql',
    onConnect: async (connectionParams, webSocket, context) => {
      try {
        const cookies = new Cookies(webSocket.upgradeReq, null, { keys: [redisConfig.key] });
        const cookie = cookies.get(redisConfig.key);
        console.log('onConnect', cookie);
        if (cookie) {
          const res = await redisStore.get(cookie);
          if (res && res.email) {
            return ({
              ...connectionParams,
              subscriber: res.email,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
      return connectionParams;
    },
    onDisconnect: (webSocket, context) => {
      console.log('onDisconnect');
    },
  },
  formatError: (err) => {
    console.log(err);
    return err;
  },
});
