const createService = require('../../helpers/createService');
const { collectionNames } = require('../constants');
const service = createService(collectionNames.MESSAGE);

module.exports = service;
