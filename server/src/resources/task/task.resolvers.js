const taskService = require('./task.service');
const checkAuth = require('../../helpers/checkAuth');

module.exports = ({
  Query: {
    tasks: (parent, query, context) => {
      const email = checkAuth(context);
      if (!email) return [];
      return taskService.find({ user: email });
    },
    task: (parent, query, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      return taskService.findOne({ user: email, ...query });
    }
  },

  Mutation: {
    createTask: async (parent, document, context) => {
      const email = checkAuth(context);
      if (!email) return null;
      return taskService.create({
        ...document,
        createdOn: (new Date()).toISOString(),
        user: email,
      });
    },

    updateTask: async (parent, { _id, ...remainingDocument }, context) => {
      if (!checkAuth(context)) return null;
      const task = await taskService.findOne({ _id });

      if (!task) {
        throw new Error(`Couldn't find task with id ${id}`);
      }
      return taskService.update({ _id }, remainingDocument);
    },

    deleteTask: (parent, query, context) => {
      if (!checkAuth(context)) return null;
      return taskService.remove(query);
    },
  },
});
