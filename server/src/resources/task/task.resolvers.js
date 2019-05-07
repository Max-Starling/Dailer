const taskService = require('./task.service');

const isAuthorized = context => context && context.email;

module.exports = ({
  Query: {
    tasks: (parent, query, context) => {
      if (!isAuthorized(context)) return [];
      return taskService.find();
    },
    task: (parent, query) => {
      if (!isAuthorized(context)) return null;
      return taskService.findOne(query);
    }
  },

  Mutation: {
    createTask: async (parent, document, context) => {
      if (!isAuthorized(context)) return null;
      return taskService.create({
        ...document,
        startTime: (new Date()).toISOString(),
        status: 'active'
      });
    },

    updateTask: async (parent, { _id, ...remainingDocument }, context) => {
      if (!isAuthorized(context)) return null;
      const task = await taskService.findOne({ _id });

      if (!task) {
        throw new Error(`Couldn't find task with id ${id}`);
      }
      return taskService.update({ _id }, remainingDocument);
    },

    deleteTask: (parent, query, context) => {
      if (!isAuthorized(context)) return null;
      return taskService.remove(query);
    },
  },
});
