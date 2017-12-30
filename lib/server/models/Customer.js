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

var customerSchema = new _mongoose.Schema({
  _id: { type: String, default: _uuid2.default.v4 },
  _name: { type: String, required: true },
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  palettes: [{ type: String, default: '', ref: 'Palette' }],
  createdAt: { type: Date, default: Date.now }
});

var Customer = _mongoose2.default.model('Customer', customerSchema);

Customer.get = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-createdAt';

  (0, _mongoDB2.default)();
  return this.find(options, null, { limit: limit, sort: sort, populate: 'palettes' }, this.disconnect);
};

Customer.getOne = function (_id) {
  (0, _mongoDB2.default)();
  return this.findById(_id, null, { populate: 'palettes' }, this.disconnect);
};

Customer.set = function (customer) {
  (0, _mongoDB2.default)();
  return this.create(customer, this.disconnect);
};

Customer.erase = function (doc) {
  (0, _mongoDB2.default)();
  return this.remove(doc, this.disconnect);
};

Customer.reset = function (options, customer) {
  var _this = this;

  (0, _mongoDB2.default)();
  return new Promise(function (resolve) {
    _this.update(options, customer, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });
};

Customer.disconnect = function () {
  return _mongoose2.default.disconnect(function () {
    return 'Database Disconnected...';
  });
};

exports.default = Customer;
//# sourceMappingURL=Customer.js.map