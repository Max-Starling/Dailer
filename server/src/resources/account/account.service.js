const createService = require('../../helpers/createService');
const { collectionNames } = require('../constants');
const service = createService(collectionNames.ACCOUNT);

service.updateSettings = async (filter, update) => {
  const updatedAccount = await service.update(filter, { settings: update });
  return updatedAccount.settings;
};

module.exports = service;
