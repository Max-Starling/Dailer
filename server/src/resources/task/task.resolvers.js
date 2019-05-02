const taskService = require('./task.service');

module.exports = ({
  Query: {
    tasks: () => taskService.find(),
    task: (parent, query) => taskService.findOne(query),
  },

  Mutation: {
    createTask: async (parent, document) =>
      taskService.createTask({
        ...document,
        startTime: (new Date()).toISOString(),
        status: 'active'
      }),

    updateTask: async (parent, { _id, ...remainingDocument }) => {
      const task = await taskService.findOneTask({ _id });

      if (!task) {
        throw new Error(`Couldn't find task with id ${id}`);
      }
      return taskService.updateTask({ _id }, remainingDocument);
    },

    deleteTask: (parent, query) => taskService.remove(query),
  },
});
