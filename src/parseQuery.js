const presets = {
  onePalette: `
    query onePalette($options: String!){
      onePalette(options: $options){
        _id
        title
        category
        uri
        tags
        author{
          _id
          _name
          email
          phone
        }
      }
    }
  `,
  oneViewer: `
    query oneViewer($options: String!){
      oneViewer(options: $options){
        _id
        _name
        email
        sex
        phone
        interests
      }
    }
  `,
  oneCustomer: `
    query OnePalette($options: String!){
      oneCustomer(options: $options){
        _id
        _name
        email
        phone
        palettes{
          _id
          title
          category
          uri
          tags
        }
      }
    }
  `,
  onePlatform: `
    query OnePlatform($options: String!){
      onePlatform(options: $options){
        _id
        title
        category
        uri
      }
    }
  `,
  getPalettes: `
    query GetPalettes($limit: Int, $sort: String, $options: UpdatePaletteInput){
      palettes(limit: $limit, sort: $sort, options: $options) {
        _id
        title
        category
        uri
        tags
        author{
          _id
          _name
          email
          phone
        }
      }
    }
  `,
  getPlatforms: `
    query GetPlatforms($limit: Int, $sort: String, $options: UpdatePlatformInput) {
      platforms (limit: $limit, sort: $sort, options: $options){
        _id
        title
        category
        uri
      }
    }
  `,
  getViewers: `
    query GetViewers($limit: Int, $sort: String, $options: UpdateViewerInput){
      viewers(limit: $limit, sort: $sort, options: $options) {
        _id
        _name
        email
        phone
        interests
      }
    }
  `,
  getCustomers: `
    query GetCustomers($limit: Int, $sort: String, $options: UpdateCustomerInput){
      customers(limit: $limit, sort: $sort, options: $options){
        _id
        _name
        email
        phone
        palettes{
          _id
          title
          category
          uri
          tags
        }
      }
    }
  `,
  addPalettes: `
    mutation AddPalettes($options: [CreatePaletteInput!]){
      CreatePalette(palettes: $options){
        _id
      }
    }
  `,
  addPlatform: `
    mutation AddPlatform($options: [CreatePlatformInput!]){
      CreatePlatform(platforms: $options){
        _id
      }
    }
  `,
  addCustomer: `
    mutation AddCustomer($options: CreateCustomerInput!){
      CreateCustomer(users: $options){
        _id
      }
    }
  `,
  addViewer: `
    mutation AddViewer($options: CreateViewerInput!){
      CreateViewer(viewers: $options){
        _id
      }
    }
  `,
  updateCustomer: `
    mutation UpdateCustomer($options: UpdateCustomerInput!){
      UpdateCustomer(user: $options){
        _id
      }
    }
  `,
  updatePalette: `
    mutation UpdatePalette($options: UpdatePaletteInput!){
      UpdatePalette(palette: $options){
        _id
      }
    }
  `,
  updatePlatform: `
    mutation UpdatePlatform($options: UpdatePlatformInput!){
      UpdatePlatform(platform: $options){
        _id
      }
    }
  `,
  updateViewer: `
    mutation UpdateViewer($options: UpdateViewerInput!){
      UpdateViewer(viewer: $options){
        _id
      }
    }
  `,
  addTags: `
    mutation addTags($options: TagsInput!){
      AddTags(tags: $options){
        _id
        tags
      }
    }
  `,
  removeTags: `
    mutation removeTags($options: TagsInput!){
      RemoveTags(tags: $options){
        _id
        tags
      }
    }
  `,
  addInterests: `
    mutation addInterests($options: InterestsInput!){
      AddInterests(interests: $options){
        _id
        interests
      }
    }
  `,
  removeInterests: `
    mutation removeInterests($options: InterestsInput!){
      RemoveInterests(interests: $options){
        _id
        interests
      }
    }
  `,
  searchPalettes: `
    query searchPalettes($options: [String!], $limit: Int, $sort: allFields){
      SearchPalettes(limit: $limit, sort: $sort, tags: $options){
        _id
        title
        category
        uri
        tags
        author{
          _id
          _name
          email
          phone
        }
      }
    }
  `,
  removeDocs: `
    mutation DeleteDocument($options: DeleteInput!){
      RemoveEntries(options: $options){
        palette
        platform
        viewer
        customer
      }
    }
  `
}

export default (req, res, next) => {
  try {
    const num = req.body.query.search(/introspection/i);
    if (num > -1) res.end("Invalid Query");
  }
  catch (err) {
    res.end("Invalid Query");
  }
  if (presets.hasOwnProperty(req.body.query)){
    req.body.query = presets[req.body.query];
    next();
  }
  else res.end("Invalid Query");
}