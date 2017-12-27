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

Palette.reset = function (options, items) {
  var _this = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'tags');
  var tags = null;
  console.log(check);
  if (check) {
    tags = items.tags;
    delete items.tags;
    console.log(items);
  }
  if (tags && Object.keys(items).length > 1) return new Promise(function (resolve) {
    _this.update(options, { $set: { items: items }, $addToSet: { 'tags': { $each: tags } } }, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });else if (tags && Object.keys(items).length === 1) return new Promise(function (resolve) {
    _this.update(options, { $addToSet: { 'tags': { $each: tags } } }, function (err, docs) {
      if (err) throw err;
      console.log('no');
      resolve(docs);
    });
  });else return [null];
};

Palette.removeTags = function (options, items) {
  var _this2 = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  var check = hasOwnProperty.call(items, 'tags');
  var tags = null;
  console.log(check);
  if (check) {
    tags = items.tags;
    delete items.tags;
    console.log(items);
  }
  if (tags && Object.keys(items).length > 1) return new Promise(function (resolve) {
    _this2.update(options, { $set: { items: items }, $addToSet: { 'tags': { $each: tags } } }, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });else if (tags && Object.keys(items).length === 1) return new Promise(function (resolve) {
    _this2.update(options, { $addToSet: { 'tags': { $each: tags } } }, function (err, docs) {
      if (err) throw err;
      console.log('no');
      resolve(docs);
    });
  });else return [null];
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