'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoDB = require('../mongoDB');

var _mongoDB2 = _interopRequireDefault(_mongoDB);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewerSchema = new _mongoose.Schema({
  _id: { type: String, default: _uuid2.default.v4 },
  _name: { type: String, required: true },
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  interests: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

var Viewer = _mongoose2.default.model('Viewer', viewerSchema);

function loader(_ref) {
  var _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? 1000 : _ref$limit,
      _ref$sort = _ref.sort,
      sort = _ref$sort === undefined ? '-createdAt' : _ref$sort;

  var find = function find(obj) {
    return Viewer.find(JSON.parse(obj)).limit(limit).sort(sort).exec(Viewer.disconnect).then(function (res) {
      return res.length > 1 ? [res] : res;
    });
  };
  return new _dataloader2.default(find);
}

Viewer.get = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-createdAt';

  (0, _mongoDB2.default)();limit = loader({ limit: limit, sort: sort });
  return limit.load(JSON.stringify(options));
};

Viewer.set = function (viewer) {
  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return Viewer.create(viewer, this.disconnect);
};

Viewer.addInterests = function (items) {
  var _this = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'interests');
  if (!check) throw "No 'interests' object in the query";
  var interests = items.interests,
      _id = items._id;

  interests = Array.isArray(interests) ? interests : [interests];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = interests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      if (Array.isArray(i)) throw 'Interests contain array';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log(items);
  return new Promise(function (resolve) {
    _this.update({ _id: _id }, { $addToSet: { 'interests': { $each: interests } } }, function (err, docs) {
      if (err) throw err;
      console.log(docs);
      resolve(_this.get({ _id: _id }));
    });
  });
};

Viewer.removeInterests = function (items) {
  var _this2 = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'interests');
  if (!check) return null;
  var interests = items.interests,
      _id = items._id;

  interests = Array.isArray(interests) ? interests : [interests];
  console.log(items);
  return new Promise(function (resolve) {
    _this2.update({ _id: _id }, { $pullAll: { interests: interests } }, function (err, docs) {
      if (err) throw err;
      console.log(docs);
      resolve(_this2.get({ _id: _id }));
    });
  });
};

Viewer.erase = function (doc) {
  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return Viewer.remove(doc, this.disconnect);
};

Viewer.reset = function (options, viewer) {
  var _this3 = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return new Promise(function (resolve) {
    _this3.update(options, viewer, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });
};

Viewer.disconnect = function () {
  return _mongoose2.default.disconnect(function () {
    return console.log('Database Disconnected...');
  });
};

exports.default = Viewer;
//# sourceMappingURL=Viewer.js.map