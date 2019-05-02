const mongo = require('mongodb').MongoClient;
const config = require('../config');
const isFunction = require('./isFunction');

module.exports = async (resolve, reject, force = true) => {
  let database = global.db;

  if (database && !force) {
    if (isFunction(resolve)) {
      return resolve(database);
    }
    return database;
  }

  try {
    const client = await mongo.connect(config.dbUrl, { useNewUrlParser: true });
    database = client.db(config.dbName);
    global.db = database;
    warn(`Connected to MongoDB: "${config.dbUrl}"`);
    if (isFunction(resolve)) {
      resolve(database);
    }
    return database;
  } catch (err) {
    logError(err);
    // throw err;
    if (isFunction(reject)) {
      reject(err);
    }
    return err;
  }
};
