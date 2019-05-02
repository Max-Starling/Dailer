const ObjectID = require('mongodb').ObjectID;

module.exports.wrapId = id => ObjectID(id);

exports.wrapIdFields = wrapIdFields = (obj, idFields = ['_id']) => {
  if (Array.isArray(obj)) {
    return obj.map(wrapIdFields)
  }

  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      if (idFields.includes(key) && obj[key]) {
        if (obj[key].$in) {
          obj[key].$in = obj[key].$in.map(exports.wrapId)
        } else if (obj[key].$nin) {
          obj[key].$nin = obj[key].$nin.map(exports.wrapId)
        } else if (obj[key].$ne) {
          obj[key].$ne = exports.wrapId(obj[key].$ne)
        } else {
          obj[key] = exports.wrapId(obj[key])
        }
      } else {
        obj[key] = wrapIdFields(obj[key]);
      }
    })
  }

  return obj;
}