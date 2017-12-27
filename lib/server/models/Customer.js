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

function loader(_ref) {
  var limit = _ref.limit,
      sort = _ref.sort,
      _ref$populate = _ref.populate,
      populate = _ref$populate === undefined ? 'palettes' : _ref$populate;

  var find = function find(obj) {
    return Customer.find(JSON.parse(obj)).limit(limit).sort(sort).populate(populate).exec(Customer.disconnect).then(function (res) {
      return res.length > 1 ? [res] : res;
    });
  };
  return new _dataloader2.default(find);
}

Customer.get = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-createdAt';

  (0, _mongoDB2.default)();limit = loader({ limit: limit, sort: sort });
  return limit.load(JSON.stringify(options));
};

Customer.set = function (customer) {
  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return this.create(customer, this.disconnect);
};

Customer.erase = function (doc) {
  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return this.remove(doc, this.disconnect);
};

Customer.reset = function (options, customer) {
  var _this = this;

  (0, _mongoDB2.default)();
  loader({}).clear(JSON.stringify({}));
  return new Promise(function (resolve) {
    _this.update(options, customer, function (err, docs) {
      if (err) throw err;
      resolve(docs);
    });
  });
};

Customer.disconnect = function () {
  return _mongoose2.default.disconnect(function () {
    return console.log('Database Disconnected...');
  });
};

exports.default = Customer;
//# sourceMappingURL=Customer.js.map