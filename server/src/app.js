const { ApolloServer } = require('apollo-server-koa');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser-graphql');
const defineRoutes = require('./defineRoutes');
require('./helpers/logger');
const connectDB = require('./helpers/connectDB');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config');

const app = new Koa();

app.on('error', (err, ctx) => {
  logError('server error', err);
});

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

defineRoutes(app);

connectDB(() => {
  const GraphQLConfig = require('./resources');
  const server = new ApolloServer(GraphQLConfig);
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: config.port }, () => {
    warn(`Server listening on "${config.apiUrl}" in "${process.env.NODE_ENV}" mode`);
    warn(`Connected to GraphQL: "${config.apiUrl}${server.graphqlPath}"`);
  });
});

module.exports = app;
