const ObjectID = require('mongodb').ObjectID;

module.exports = (collectionName, db) => {
  const database = db || global.db;

  if (!database) {
    logError('DB is not connected!');
    return;
  }

  try {
    const collection = database.collection(collectionName);
    const service = { ...collection };
  
    service.find = async (query, projection) => {
      const result = await collection.find(query, projection).toArray();
      console.log(result);
      return result;
    }

    service.findOne = async (query, projection) => {
      const result = await collection.findOne(query, projection);
      return result;
    }

    service.create = async (document) => {
      // console.log(collection);
      console.log('doc', document);
      try {
        const result = await collection.insertOne({
          _id: new ObjectID(),
          ...document,
        });
        // console.log(result);
        console.log('res', result.ops[0]);
        return result.ops[0];
      } catch (e) {
        logError(e);
        return null;
      }
    };

    service.update = async (filter, update, options) => {
      try {
        const result = await collection.findOneAndUpdate(
          filter,
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
      const result = await collection.findOneAndDelete(query);
      return result.value;
    };

    return service;
  } catch (e) {
    logError(e);
    return null;
  }
};
