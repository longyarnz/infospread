'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('./server/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var data = _lodash2.default.times(10, function (i) {
    var name = _faker2.default.name,
        phone = _faker2.default.phone,
        internet = _faker2.default.internet,
        random = _faker2.default.random,
        company = _faker2.default.company,
        commerce = _faker2.default.commerce,
        image = _faker2.default.image,
        u = random.uuid(),
        a = company.bsNoun(),
        x = name.firstName(i),
        b = company.bsNoun(),
        y = name.lastName(i),
        c = company.bsNoun(),
        z = random.uuid(),
        customer = {
      _id: u,
      _name: x + ' ' + y,
      sex: i % 2 === 0 ? 'MALE' : 'FEMALE',
      email: internet.email(x, y),
      phone: parseInt(phone.phoneNumber("2348#########"), 10),
      palettes: [z]
    },
        palette = {
      _id: z,
      title: company.catchPhraseNoun(),
      caption: company.catchPhraseDescriptor(),
      category: commerce.department(),
      tags: [a, b, c],
      uri: image.imageUrl(),
      author: u
    },
        platform = {
      title: company.catchPhraseNoun(),
      category: commerce.department(),
      uri: image.imageUrl()
    },
        viewer = {
      _name: x + ' ' + y,
      sex: i % 2 === 0 ? 'MALE' : 'FEMALE',
      email: internet.email(x, y),
      phone: parseInt(phone.phoneNumber("2348#########"), 10),
      interests: [a, b, c]
    };

    return { customer: customer, palette: palette, platform: platform, viewer: viewer };
  });
  return data.map(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var customer = _ref.customer,
          palette = _ref.palette,
          platform = _ref.platform,
          viewer = _ref.viewer;
      var a, b, c, d;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              a = _models.Customer.set(customer, _models.Customer.disconnect), b = _models.Palette.set(palette, _models.Palette.disconnect), c = _models.Platform.set(platform, _models.Platform.disconnect), d = _models.Viewer.set(viewer, _models.Viewer.disconnect);
              return _context.abrupt('return', { a: a, b: b, c: c, d: d });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
};
//# sourceMappingURL=data.js.map