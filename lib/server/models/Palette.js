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

Palette.get = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-createdAt';

  (0, _mongoDB2.default)();
  return this.find(options, null, { limit: limit, sort: sort, populate: 'author' }, this.disconnect);
};

Palette.getOne = function (_id) {
  (0, _mongoDB2.default)();
  return this.findById(_id, null, { populate: 'author' }, this.disconnect);
};

Palette.set = function (palettes) {
  (0, _mongoDB2.default)();
  return this.create(palettes, this.disconnect).then(function (docs) {
    if (Array.isArray(docs)) {
      docs.forEach(function (_ref) {
        var _id = _ref._id,
            author = _ref.author;

        _Customer2.default.reset({ _id: author }, { '$addToSet': { 'palettes': _id } });
      });
    }
    return docs;
  });
};

Palette.reset = function (_id, items) {
  var _this = this;

  (0, _mongoDB2.default)();
  var check = hasOwnProperty.call(items, 'tags');
  if (!check) throw "'tags' object is present in the query";
  return new Promise(function (resolve) {
    _this.update(_id, items, function (err, docs) {
      if (err) throw err;
      resolve(docs);
      _this.disconnect();
    });
  });
};

Palette.addTags = function (items) {
  var _this2 = this;

  (0, _mongoDB2.default)();
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

  return new Promise(function (resolve) {
    _this2.update({ _id: _id }, { $addToSet: { 'tags': { $each: tags } } }, function (err) {
      if (err) throw err;
      resolve(_this2.getOne(_id));
      _this2.disconnect();
    });
  });
};

Palette.removeTags = function (items) {
  var _this3 = this;

  (0, _mongoDB2.default)();
  var check = hasOwnProperty.call(items, 'tags');
  if (!check) return null;
  var tags = items.tags,
      _id = items._id;

  tags = Array.isArray(tags) ? tags : [tags];
  return new Promise(function (resolve) {
    _this3.update({ _id: _id }, { $pullAll: { tags: tags } }, function (err, docs) {
      if (err) throw err;
      resolve(_this3.getOne(_id));
      _this3.disconnect();
    });
  });
};

Palette.erase = function (doc) {
  (0, _mongoDB2.default)();
  return this.remove(doc, this.disconnect);
};

Palette.disconnect = function () {
  return _mongoose2.default.disconnect(function () {
    return 'Database Disconnected...';
  });
};

exports.default = Palette;
//# sourceMappingURL=Palette.js.map