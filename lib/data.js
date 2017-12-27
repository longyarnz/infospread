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
  return data.map(function (_ref) {
    var customer = _ref.customer,
        palette = _ref.palette,
        platform = _ref.platform,
        viewer = _ref.viewer;

    return [_models.Customer.set(customer, _models.Customer.disconnect), _models.Palette.set(palette, _models.Palette.disconnect), _models.Platform.set(platform, _models.Platform.disconnect), _models.Viewer.set(viewer, _models.Viewer.disconnect)];
  });
};
//# sourceMappingURL=data.js.map