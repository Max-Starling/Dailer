const ObjectID = require('mongodb').ObjectID;
const { wrapIdFields } = require('./wrapId');

module.exports = (collectionName, db, options = { additionalIdFields: [] }) => {
  const database = db || global.db;

  let idFields = ['_id'];
  if (typeof additionalIdFields === 'array') {
    idFields.push(...additionalIdFields);
  }

  const wrap = obj => wrapIdFields(obj, idFields);

  if (!database) {
    logError('DB is not connected!');
    return;
  }

  try {
    const collection = database.collection(collectionName);
    const service = { ...collection };
  
    service.find = async (query, projection) => {
      const result = await collection.find(wrap(query), projection).toArray();
      return result;
    }

    service.findOne = async (query, projection) => {
      const result = await collection.findOne(wrap(query), projection);
      return result;
    }

    service.create = async (document) => {
      try {
        const result = await collection.insertOne({
          _id: new ObjectID(),
          ...wrap(document),
        });
        return result.ops[0];
      } catch (e) {
        logError(e);
        return null;
      }
    };

    service.update = async (filter, update, options) => {
      try {
        const result = await collection.findOneAndUpdate(
          wrap(filter),
          { $set: update },
          {
            returnOriginal: false, 
            ...options,
          },
        );
        return result.value;
      } catch (e) {
        logError(e);
        return null;
      }
    };

    service.remove = async (query) => {
      const result = await collection.findOneAndDelete(wrap(query));
      return result.value;
    };

    return service;
  } catch (e) {
    logError(e);
    return null;
  }
};
