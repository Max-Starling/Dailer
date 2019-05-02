const { wrapIdFields } = require('../../helpers/wrapId');

// const db = require('../../db');
// const service = db.createService('task');

const createService = require('../../helpers/createService');
const service = createService('task');

service.findTask = query => service.find(wrapIdFields(query, ['_id']));

service.findOneTask = query => service.findOne(wrapIdFields(query, ['_id']));

service.createTask = document => service.create(wrapIdFields(document, ['_id']));

service.updateTask = (query, document) => service.update(wrapIdFields(query, ['_id']), wrapIdFields(document, ['_id']));

module.exports = service;
