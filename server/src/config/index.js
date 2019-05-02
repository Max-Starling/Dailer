const port = parseInt(process.env.PORT, 10) || 4000;

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    apiUrl: `http://localhost:${port}`,
    port,
    dbUrl: 'mongodb://localhost:27017',
    dbName: 'starling'
  }
};

module.exports = config[env];
