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

var _Customer = require('./Customer');

var _Customer2 = _interopRequireDefault(_Customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paletteSchema = new _mongoose.Schema({
  _id: { type: String, default: _uuid2.default.v4 },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  uri: { type: String, required: true },
  author: { type: String, required: true, ref: 'Customer' },
  createdAt: { type: Date, default: Date.now }
});

var Palette = _mongoose2.default.model('Palette', paletteSchema);

function loader(_ref) {
  var _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? 1000 : _ref$limit,
      _ref$sort = _ref.sort,
      sort = _ref$sort === undefined ? '-createdAt' : _ref$sort,
      _ref$populate = _ref.populate,
      populate = _ref$populate === undefined ? 'author' : _ref$populate;

  var find = function find(obj) {
    return Palette.find(JSON.parse(obj)).limit(limit).sort(sort).populate(populate).exec(Palette.disconnect).then(function (res) {
      return res.length > 1 ? [res] : res;
    });
  };
  return new _dataloader2.default(find);
}

Palette.get = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var limit = arguments[1];
  var sort = arguments[2];

  (0, _mongoDB2.default)();limit = loader({ limit: limit, sort: sort });
  return limit.load(JSON.stringify(options));
};

Palette.set = function (palettes) {
  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return this.create(palettes, this.disconnect).then(function (docs) {
    docs.forEach(function (_ref2) {
      var _id = _ref2._id,
          author = _ref2.author;

      _Customer2.default.reset({ _id: author }, { '$addToSet': { 'palettes': _id } });
    });
    return docs;
  });
};

Palette.reset = function (_id, items) {
  var _this = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'tags');
  if (!check) throw "'tags' object is present in the query";
  return new Promise(function (resolve) {
    _this.update(_id, items, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });
};

Palette.addTags = function (items) {
  var _this2 = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'tags');
  if (!check) throw "No 'tags' object in the query";
  var tags = items.tags,
      _id = items._id;

  tags = Array.isArray(tags) ? tags : [tags];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      if (Array.isArray(i)) throw 'Tags contain array';
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
    _this2.update({ _id: _id }, { $addToSet: { 'tags': { $each: tags } } }, function (err, docs) {
      if (err) throw err;
      console.log(docs);
      resolve(_this2.get({ _id: _id }));
    });
  });
};

Palette.removeTags = function (items) {
  var _this3 = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'tags');
  if (!check) return null;
  var tags = items.tags,
      _id = items._id;

  tags = Array.isArray(tags) ? tags : [tags];
  console.log(items);
  return new Promise(function (resolve) {
    _this3.update({ _id: _id }, { $pullAll: { tags: tags } }, function (err, docs) {
      if (err) throw err;
      console.log(docs);
      resolve(_this3.get({ _id: _id }));
    });
  });
};

Palette.erase = function (doc) {
  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return this.remove(doc, this.disconnect);
};

Palette.disconnect = function () {
  return _mongoose2.default.disconnect(function () {
    return console.log('Database Disconnected...');
  });
};

exports.default = Palette;
//# sourceMappingURL=Palette.js.map