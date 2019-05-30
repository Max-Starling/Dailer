const { ApolloServer } = require('apollo-server-koa');
const createServer = require('http').createServer;
const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser-graphql');
const defineRoutes = require('./defineRoutes');
const connectDB = require('./helpers/connectDB');
const redisConfig = require('./config/redis');
const RedisStore = require('koa-redis');
const cors = require('@koa/cors');
const SubscriptionServer = require('subscriptions-transport-ws').SubscriptionServer;
const execute = require('graphql').execute;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const subscribe = require('graphql').subscribe;
require('./helpers/logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config');

const app = new Koa();

app.keys = [redisConfig.key];

const redisStore = new RedisStore({ ...redisConfig });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  key: redisConfig.secret,
  maxAge: redisConfig.maxAge,
  store: redisStore,
}, app));

app.on('error', (err, ctx) => {
  logError('server error', err);
  log(err);
});

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

defineRoutes(app);

connectDB(() => {
  const GraphQLConfig = require('./resources');
  const server = new ApolloServer(GraphQLConfig);
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  const WS_PORT = 5000;
  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  app.listen({ port: config.port }, () => {
    warn(`Server listening on "${config.apiUrl}" in "${process.env.NODE_ENV}" mode`);
    warn(`Connected to GraphQL: "${config.apiUrl}${server.graphqlPath}"`);

    websocketServer.listen(WS_PORT, () => {
      warn(`Websocket Server is now running on http://localhost:${WS_PORT}`);
      const subscriptionServer = SubscriptionServer.create(
        {
          schema: makeExecutableSchema({ typeDefs: GraphQLConfig.typeDefs, resolvers: GraphQLConfig.resolvers }),
          execute,
          subscribe,
        },
        {
          server: websocketServer,
          path: '/graphql',
        },
      );
    });
  });
});

module.exports = app;
