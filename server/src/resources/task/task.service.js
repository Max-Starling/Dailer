const createService = require('../../helpers/createService');
const { collectionNames } = require('../constants');
const service = createService(collectionNames.TASK);

module.exports = service;
