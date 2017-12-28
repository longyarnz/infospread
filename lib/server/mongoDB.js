'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
  var uriDB = 'mongodb://info:voissapp@127.0.0.1:27017/info_spread';
  _mongoose2.default.connect(uriDB, { useMongoClient: true }, function (err) {
    _assert2.default.equal(err, null);
    console.log('Database Connected...');
  });
  _mongoose2.default.Promise = _bluebird2.default;
  return callback ? callback : _mongoose2.default;
};
//# sourceMappingURL=mongoDB.js.map