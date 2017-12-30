'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function performUpdate(model, args) {
  var _this = this;

  var _args = args,
      _id = _args._id;

  return model.reset({ _id: _id }, args).then(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(i.nModified === 0)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', null);

            case 2:
              _context.next = 4;
              return model.find({ _id: _id }, model.disconnect);

            case 4:
              args = _context.sent;
              return _context.abrupt('return', args[0]);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

function search(model, tags, limit, sort) {
  tags = Array.isArray(tags) ? tags : [tags];
  tags = { tags: { $in: tags } };
  return model.get(tags, limit, sort);
}

exports.default = {
  Query: {
    onePalette: function onePalette(_ref2, _ref3) {
      var Palette = _ref2.Palette;
      var options = _ref3.options;
      return Palette.getOne(options);
    },
    oneCustomer: function oneCustomer(_ref4, _ref5) {
      var Customer = _ref4.Customer;
      var options = _ref5.options;
      return Customer.getOne(options);
    },
    onePlatform: function onePlatform(_ref6, _ref7) {
      var Platform = _ref6.Platform;
      var options = _ref7.options;
      return Platform.getOne(options);
    },
    oneViewer: function oneViewer(_ref8, _ref9) {
      var Viewer = _ref8.Viewer;
      var options = _ref9.options;
      return Viewer.getOne(options);
    },
    palettes: function palettes(_ref10, _ref11) {
      var Palette = _ref10.Palette;
      var options = _ref11.options,
          limit = _ref11.limit,
          sort = _ref11.sort;
      return Palette.get(options, limit, sort);
    },
    customers: function customers(_ref12, _ref13) {
      var Customer = _ref12.Customer;
      var options = _ref13.options,
          limit = _ref13.limit,
          sort = _ref13.sort;
      return Customer.get(options, limit, sort);
    },
    viewers: function viewers(_ref14, _ref15) {
      var Viewer = _ref14.Viewer;
      var options = _ref15.options,
          limit = _ref15.limit,
          sort = _ref15.sort;
      return Viewer.get(options, limit, sort);
    },
    platforms: function platforms(_ref16, _ref17) {
      var Platform = _ref16.Platform;
      var options = _ref17.options,
          limit = _ref17.limit,
          sort = _ref17.sort;
      return Platform.get(options, limit, sort);
    },
    SearchPalettes: function SearchPalettes(_ref18, _ref19) {
      var Palette = _ref18.Palette;
      var tags = _ref19.tags,
          limit = _ref19.limit,
          sort = _ref19.sort;
      return search(Palette, tags, limit, sort);
    }
  },
  Mutation: {
    AddTags: function AddTags(_ref20, _ref21) {
      var Palette = _ref20.Palette;
      var tags = _ref21.tags;
      return Palette.addTags(tags);
    },
    RemoveTags: function RemoveTags(_ref22, _ref23) {
      var Palette = _ref22.Palette;
      var tags = _ref23.tags;
      return Palette.removeTags(tags);
    },
    AddInterests: function AddInterests(_ref24, _ref25) {
      var Viewer = _ref24.Viewer;
      var interests = _ref25.interests;
      return Viewer.addInterests(interests);
    },
    RemoveInterests: function RemoveInterests(_ref26, _ref27) {
      var Viewer = _ref26.Viewer;
      var interests = _ref27.interests;
      return Viewer.removeInterests(interests);
    },
    CreatePalette: function CreatePalette(_ref28, _ref29) {
      var Palette = _ref28.Palette;
      var palettes = _ref29.palettes;
      return Palette.set(palettes);
    },
    CreatePlatform: function CreatePlatform(_ref30, _ref31) {
      var Platform = _ref30.Platform;
      var platforms = _ref31.platforms;
      return Platform.set(platforms);
    },
    CreateCustomer: function CreateCustomer(_ref32, _ref33) {
      var Customer = _ref32.Customer;
      var users = _ref33.users;
      return Customer.set(users);
    },
    CreateViewer: function CreateViewer(_ref34, _ref35) {
      var Viewer = _ref34.Viewer;
      var viewers = _ref35.viewers;
      return Viewer.set(viewers);
    },
    UpdatePalette: function UpdatePalette(_ref36, _ref37) {
      var Palette = _ref36.Palette;
      var palette = _ref37.palette;
      return performUpdate(Palette, palette);
    },
    UpdatePlatform: function UpdatePlatform(_ref38, _ref39) {
      var Platform = _ref38.Platform;
      var platform = _ref39.platform;
      return performUpdate(Platform, platform);
    },
    UpdateCustomer: function UpdateCustomer(_ref40, _ref41) {
      var Customer = _ref40.Customer;
      var user = _ref41.user;
      return performUpdate(Customer, user);
    },
    UpdateViewer: function UpdateViewer(_ref42, _ref43) {
      var Viewer = _ref42.Viewer;
      var viewer = _ref43.viewer;
      return performUpdate(Viewer, viewer);
    },
    RemoveEntries: function () {
      var _ref46 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref44, _ref45) {
        var Palette = _ref44.Palette,
            Customer = _ref44.Customer,
            Viewer = _ref44.Viewer,
            Platform = _ref44.Platform;
        var options = _ref45.options;
        var model, order, result, fields;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = void 0, order = void 0, result = {};
                _context2.t0 = regeneratorRuntime.keys(options);

              case 2:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 22;
                  break;
                }

                fields = _context2.t1.value;

                options = { _id: { $in: options[fields] } };
                _context2.t2 = fields;
                _context2.next = _context2.t2 === 'palette' ? 8 : _context2.t2 === 'customer' ? 10 : _context2.t2 === 'viewer' ? 12 : 14;
                break;

              case 8:
                model = Palette;
                return _context2.abrupt('break', 16);

              case 10:
                model = Customer;
                return _context2.abrupt('break', 16);

              case 12:
                model = Viewer;
                return _context2.abrupt('break', 16);

              case 14:
                model = Platform;
                return _context2.abrupt('break', 16);

              case 16:
                _context2.next = 18;
                return model.erase(options, model.disconnect);

              case 18:
                order = _context2.sent;

                result[fields] = order.result.ok > 0;
                _context2.next = 2;
                break;

              case 22:
                return _context2.abrupt('return', result);

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function RemoveEntries(_x2, _x3) {
        return _ref46.apply(this, arguments);
      }

      return RemoveEntries;
    }()
  }
};
//# sourceMappingURL=resolvers.js.map