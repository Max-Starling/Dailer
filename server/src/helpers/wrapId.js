const ObjectID = require('mongodb').ObjectID;

module.exports.wrapId = id => ObjectID(id);

exports.wrapIdFields = wrapIdFields = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(wrapIdFields)
  }

  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      if (key === '_id' && obj._id) {
        if (obj._id.$in) {
          obj._id.$in = obj._id.$in.map(exports.wrapId)
        } else if (obj._id.$nin) {
          obj._id.$nin = obj._id.$nin.map(exports.wrapId)
        } else if (obj._id.$ne) {
          obj._id.$ne = exports.wrapId(obj._id.$ne)
        } else {
          obj._id = exports.wrapId(obj._id)
        }
      } else {
        obj[key] = wrapIdFields(obj[key]);
      }
    })
  }

  return obj;
}