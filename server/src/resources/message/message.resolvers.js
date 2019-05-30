// const { withFilter } = require('apollo-server-koa');
const PubSub = require('graphql-subscriptions').PubSub;
const checkAuth = require('../../helpers/checkAuth');
const messageService = require('./message.service');

const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

module.exports = ({
  Query: {
    messages: (parent, query, context) => {
      const email = checkAuth(context);
      if (!email) return [];
      return messageService.find();
    },
  },

  Mutation: {
    createMessage: async (parent, document, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      const message = await messageService.create({
        ...document,
        time: (new Date()).toISOString(),
        sender: email,
      });
      pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
      return message;
    },
  },

  Subscription: {
    messageAdded: {
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator(MESSAGE_ADDED),
      //   (payload, variables) => {
      //    return !!payload.messageAdded;
      //   },
      // ),
      subscribe: (_, args) => pubsub.asyncIterator(MESSAGE_ADDED),
    }
  },
});
