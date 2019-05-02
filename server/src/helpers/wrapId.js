const ObjectID = require('mongodb').ObjectID;

module.exports.wrapId = id => ObjectID(id);

module.exports.wrapIdFields = (object = {}, idFields = ['_id']) => {
  const result = {};
  Object.keys(object).forEach((key) => {
    result[key] = idFields.includes(key)
      ? ObjectID(object[key])
      : object[key];
  });
  return result;
};
