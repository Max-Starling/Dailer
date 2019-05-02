const monk = require('monk');
const config = require('./config');
const createService = require('./helpers/createService');

const connectionUrl = `${config.dbUrl}/${config.dbName}`;

const db = monk(`${connectionUrl}`, { connectTimeoutMS: 15000 });

db.on('error-opening', (err) => {
  logError(err, 'Failed to connect to the MongoDB on start');
  throw err;
});

db.on('open', () => warn(`Connected to MongoDB: ${connectionUrl}`));

db.on('close', err => err
  ? logError(err, `Lost connection with MongoDB: ${connectionUrl}`)
  : warn(`Closed connection with MongoDB: ${connectionUrl}`)
);

db.on('connected', err => err
  ? logError(err)
  : warn(`Connected to MongoDB: ${connectionUrl}`)
);

db.createService = collectionName => createService(collectionName, db);

module.exports = db;
