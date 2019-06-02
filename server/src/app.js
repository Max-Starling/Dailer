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
require('./helpers/logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config');

const app = new Koa();

app.keys = [redisConfig.key];

const redisStore = new RedisStore({
  ...redisConfig,
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  key: redisConfig.key,
  maxAge: redisConfig.maxAge,
  store: redisStore,
}, app));

app.on('error', (err, ctx) => {
  logError('server error', err);
  log(err);
});

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}));

defineRoutes(app);

connectDB(async () => {
  const GraphQLConfig = require('./resources')(redisStore);
  const apolloServer = new ApolloServer(GraphQLConfig);
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
  });

  app.listen({ port: config.port }, () => {
    warn(`Server listening on "${config.apiUrl}" in "${process.env.NODE_ENV}" mode`);
    warn(`Connected to GraphQL: "${config.apiUrl}${apolloServer.graphqlPath}"`);
  });

  const WS_PORT = 5000;
  const websocketServer = createServer(app);

  apolloServer.installSubscriptionHandlers(websocketServer);

  websocketServer.listen(WS_PORT, () => {
    warn(`Websocket Server is now running on http://localhost:${WS_PORT}`);
  });
});

module.exports = app;
