const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const TaskSchema = require('./task/task.schema');
const TaskResolvers = require('./task/task.resolvers');

const schemaArray = [TaskSchema];
const resolverArray = [TaskResolvers];

module.exports = {
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolverArray)
};
