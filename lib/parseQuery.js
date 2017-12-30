"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var presets = {
  onePalette: "\n    query onePalette($options: String!){\n      onePalette(options: $options){\n        _id\n        title\n        category\n        uri\n        tags\n        author{\n          _id\n          _name\n          email\n          phone\n        }\n      }\n    }\n  ",
  oneViewer: "\n    query oneViewer($options: String!){\n      oneViewer(options: $options){\n        _id\n        _name\n        email\n        sex\n        phone\n        interests\n      }\n    }\n  ",
  oneCustomer: "\n    query OnePalette($options: String!){\n      oneCustomer(options: $options){\n        _id\n        _name\n        email\n        phone\n        palettes{\n          _id\n          title\n          category\n          uri\n          tags\n        }\n      }\n    }\n  ",
  onePlatform: "\n    query OnePlatform($options: String!){\n      onePlatform(options: $options){\n        _id\n        title\n        category\n        uri\n      }\n    }\n  ",
  getPalettes: "\n    query GetPalettes($limit: Int, $sort: String, $options: UpdatePaletteInput){\n      palettes(limit: $limit, sort: $sort, options: $options) {\n        _id\n        title\n        category\n        uri\n        tags\n        author{\n          _id\n          _name\n          email\n          phone\n        }\n      }\n    }\n  ",
  getPlatforms: "\n    query GetPlatforms($limit: Int, $sort: String, $options: UpdatePlatformInput) {\n      platforms (limit: $limit, sort: $sort, options: $options){\n        _id\n        title\n        category\n        uri\n      }\n    }\n  ",
  getViewers: "\n    query GetViewers($limit: Int, $sort: String, $options: UpdateViewerInput){\n      viewers(limit: $limit, sort: $sort, options: $options) {\n        _id\n        _name\n        email\n        phone\n        interests\n      }\n    }\n  ",
  getCustomers: "\n    query GetCustomers($limit: Int, $sort: String, $options: UpdateCustomerInput){\n      customers(limit: $limit, sort: $sort, options: $options){\n        _id\n        _name\n        email\n        phone\n        palettes{\n          _id\n          title\n          category\n          uri\n          tags\n        }\n      }\n    }\n  ",
  addPalettes: "\n    mutation AddPalettes($options: [CreatePaletteInput!]){\n      CreatePalette(palettes: $options){\n        _id\n      }\n    }\n  ",
  addPlatform: "\n    mutation AddPlatform($options: [CreatePlatformInput!]){\n      CreatePlatform(platforms: $options){\n        _id\n      }\n    }\n  ",
  addCustomer: "\n    mutation AddCustomer($options: CreateCustomerInput!){\n      CreateCustomer(users: $options){\n        _id\n      }\n    }\n  ",
  addViewer: "\n    mutation AddViewer($options: CreateViewerInput!){\n      CreateViewer(viewers: $options){\n        _id\n      }\n    }\n  ",
  updateCustomer: "\n    mutation UpdateCustomer($options: UpdateCustomerInput!){\n      UpdateCustomer(user: $options){\n        _id\n      }\n    }\n  ",
  updatePalette: "\n    mutation UpdatePalette($options: UpdatePaletteInput!){\n      UpdatePalette(palette: $options){\n        _id\n      }\n    }\n  ",
  updatePlatform: "\n    mutation UpdatePlatform($options: UpdatePlatformInput!){\n      UpdatePlatform(platform: $options){\n        _id\n      }\n    }\n  ",
  updateViewer: "\n    mutation UpdateViewer($options: UpdateViewerInput!){\n      UpdateViewer(viewer: $options){\n        _id\n      }\n    }\n  ",
  addTags: "\n    mutation addTags($options: TagsInput!){\n      AddTags(tags: $options){\n        _id\n        tags\n      }\n    }\n  ",
  removeTags: "\n    mutation removeTags($options: TagsInput!){\n      RemoveTags(tags: $options){\n        _id\n        tags\n      }\n    }\n  ",
  addInterests: "\n    mutation addInterests($options: InterestsInput!){\n      AddInterests(interests: $options){\n        _id\n        interests\n      }\n    }\n  ",
  removeInterests: "\n    mutation removeInterests($options: InterestsInput!){\n      RemoveInterests(interests: $options){\n        _id\n        interests\n      }\n    }\n  ",
  searchPalettes: "\n    query searchPalettes($options: [String!], $limit: Int, $sort: allFields){\n      SearchPalettes(limit: $limit, sort: $sort, tags: $options){\n        _id\n        title\n        category\n        uri\n        tags\n        author{\n          _id\n          _name\n          email\n          phone\n        }\n      }\n    }\n  ",
  removeDocs: "\n    mutation DeleteDocument($options: DeleteInput!){\n      RemoveEntries(options: $options){\n        palette\n        platform\n        viewer\n        customer\n      }\n    }\n  "
};

exports.default = function (req, res, next) {
  try {
    var num = req.body.query.search(/introspection/i);
    if (num > -1) res.end("Invalid Query");
  } catch (err) {
    res.end("Invalid Query");
  }
  if (presets.hasOwnProperty(req.body.query)) {
    req.body.query = presets[req.body.query];
    next();
  } else res.end("Invalid Query");
};
//# sourceMappingURL=parseQuery.js.map