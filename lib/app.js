'use strict';

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _parseQuery = require('./parseQuery');

var _parseQuery2 = _interopRequireDefault(_parseQuery);

var _models = require('./server/models');

var rootValue = _interopRequireWildcard(_models);

var _schema = require('./server/schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./server/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphqlTools = require('graphql-tools');

var _clearConsole = require('react-dev-utils/clearConsole');

var _clearConsole2 = _interopRequireDefault(_clearConsole);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PORT = process.env.PORT,
    HOST = '0.0.0.0';
var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _schema2.default, resolvers: _resolvers2.default });
var App = (0, _express2.default)();
var storage = _multer2.default.diskStorage({
  destination: _path2.default.join(__dirname, 'images/'),
  filename: function filename(req, file, cb) {
    var prefix = Date.now().toString().slice(0, 8);
    return cb(null, prefix + '_' + file.originalName);
  }
});
App.use(_express2.default.static('build'));
App.use(_express2.default.static('images'));
App.get('/populate', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _data2.default)();

          case 2:
            data = _context.sent;
            return _context.abrupt('return', res.json(data));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
App.get('/api/palettes', function (req, res) {
  rootValue.Palette.get({}).then(function (palettes) {
    rootValue.Palette.disconnect();
    res.json(palettes);
  });
});
App.get('/api/customers', function (req, res) {
  rootValue.Customer.get({}).then(function (customers) {
    rootValue.Customer.disconnect();
    res.json(customers);
  });
});
App.get('/api/viewers', function (req, res) {
  rootValue.Viewer.get({}).then(function (viewers) {
    rootValue.Viewer.disconnect();
    res.json(viewers);
  });
});
App.get('/api/platforms', function (req, res) {
  rootValue.Platform.get({}).then(function (platforms) {
    rootValue.Platform.disconnect();
    res.json(platforms);
  });
});
App.post('/upload', (0, _multer2.default)({ storage: storage }).any(), function (req, res) {
  return res('OK');
});
App.post('/spread', _bodyParser2.default.json({ extended: true }), _parseQuery2.default, (0, _expressGraphql2.default)({ schema: schema, rootValue: rootValue, pretty: true }), function (req, res) {
  console.log(req);
  res.send("yes");
});
App.listen(PORT, HOST, function () {
  (0, _clearConsole2.default)();
  console.log('Server Listening at http://' + HOST + ':' + PORT);
});
//# sourceMappingURL=app.js.map