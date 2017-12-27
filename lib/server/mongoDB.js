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
  var uriDB = 'mongodb://PowerUser:addingValue@infospread-shard-00-00-inwmw.mongodb.net:27017,infospread-shard-00-01-inwmw.mongodb.net:27017,infospread-shard-00-02-inwmw.mongodb.net:27017/infospread?ssl=true&replicaSet=Infospread-shard-0&authSource=admin';
  _mongoose2.default.connect(uriDB, { useMongoClient: true }, function (err) {
    _assert2.default.equal(err, null);
    console.log('Database Connected...');
  });
  _mongoose2.default.Promise = _bluebird2.default;
  return callback ? callback : _mongoose2.default;
};
//# sourceMappingURL=mongoDB.js.map