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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var platformSchema = new _mongoose.Schema({
  _id: { type: String, default: _uuid2.default.v4 },
  title: { type: String, required: true },
  category: { type: String, required: true },
  uri: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

var Platform = _mongoose2.default.model('Platform', platformSchema);

Platform.get = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-createdAt';

  (0, _mongoDB2.default)();
  return this.find(options, null, { limit: limit, sort: sort }, this.disconnect);
};

Platform.getOne = function (_id) {
  (0, _mongoDB2.default)();
  return this.findById(_id, this.disconnect);
};

Platform.set = function (items) {
  (0, _mongoDB2.default)();
  return this.create(items, this.disconnect);
};

Platform.reset = function (options, platform) {
  var _this = this;

  (0, _mongoDB2.default)();
  return new Promise(function (resolve) {
    _this.update(options, platform, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });
};

Platform.erase = function (doc) {
  (0, _mongoDB2.default)();
  return this.remove(doc, this.disconnect);
};

Platform.disconnect = function () {
  return _mongoose2.default.disconnect(function () {
    return 'Database Disconnected...';
  });
};

exports.default = Platform;
//# sourceMappingURL=Platform.js.map