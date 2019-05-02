const ObjectID = require('mongodb').ObjectID;
const { wrapIdFields } = require('./wrapId');

module.exports = (collectionName, db, options = { additionalIdFields: [] }) => {
  const database = db || global.db;

  if (!database) {
    logError('DB is not connected!');
    return;
  }

  try {
    const collection = database.collection(collectionName);
    const service = { ...collection };
  
    service.find = async (query, projection) => {
      const result = await collection.find(wrapIdFields(query), projection).toArray();
      return result;
    }

    service.findOne = async (query, projection) => {
      const result = await collection.findOne(wrapIdFields(query), projection);
      return result;
    }

    service.create = async (document) => {
      try {
        const result = await collection.insertOne({
          _id: new ObjectID(),
          ...wrapIdFields(document),
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
          wrapIdFields(filter),
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
      const result = await collection.findOneAndDelete(wrapIdFields(query));
      return result.value;
    };

    return service;
  } catch (e) {
    logError(e);
    return null;
  }
};
