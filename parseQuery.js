const presets = {
  onePalette: `
    query OnePalette($options: String!){
      onePalette(options: $options){
        keyID
        title
        category
        src_file
        tags
        author{
          keyID
          _name
          email
          phone
        }
      }
    }
  `,
  oneViewer: `
    query OneViewer($options: String!){
      oneViewer(options: $options){
        keyID
        _name
        email
        phone
        interests
      }
    }
  `,
  oneCustomer: `
    query OnePalette($options: String!){
      oneCustomer(options: $options){
        keyID
        _name
        email
        phone
        palettes{
          keyID
          title
          category
          src_file
          tags
        }
      }
    }
  `,
  onePlatform: `
    query OnePlatform($options: String!){
      onePlatform(options: $options){
        keyID
        title
        category
        src_file
      }
    }
  `,
  getPalettes: `
    query GetPalettes($limit: Int, $sort: String, $options: UpdatePaletteInput){
      palettes(limit: $limit, sort: $sort, options: $options) {
        keyID
        title
        category
        src_file
        tags
        author{
          keyID
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
        keyID
        title
        category
        src_file
      }
    }
  `,
  getAudience: `
    query GetAudience($limit: Int, $sort: String, $options: UpdateAudienceInput){
      audience(limit: $limit, sort: $sort, options: $options) {
        keyID
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
        keyID
        _name
        email
        phone
        palettes{
          keyID
          title
          category
          src_file
          tags
        }
      }
    }
  `,
  addPalettes: `
    mutation AddPalettes($options: [CreatePaletteInput!]){
      CreatePalette(palettes: $options){
        keyID
        author
      }
    }
  `,
  addPlatform: `
    mutation AddPlatform($options: [CreatePlatformInput!]){
      CreatePlatform(platforms: $options){
        keyID
        title
      }
    }
  `,
  addCustomer: `
    mutation AddCustomer($options: CreateCustomerInput!){
      RegisterCustomer(users: $options){
        keyID
        _name
      }
    }
  `,
  addAudience: `
    mutation AddAudience($options: CreateAudienceInput!){
      RegisterAudience(viewers: $options){
        keyID
        _name
      }
    }
  `,
  updateCustomer: `
    mutation UpdatePlatform($options: UpdatePlatformInput!){
      UpdatePlatform(platform: $options){
        keyID
        title
      }
    }
  `,
  updatePalette: `
    mutation UpdatePalette($options: UpdatePaletteInput!){
      UpdatePalette(palette: $options){
        keyID
        title
      }
    }
  `,
  updatePlatform: `
    mutation UpdatePlatform($options: UpdatePlatformInput!){
      UpdatePlatform(platform: $options){
        keyID
        title
      }
    }
  `,
  updateAudience: `
    mutation UpdateAudience($options: UpdateAudienceInput!){
      UpdateAudience(audience: $options){
        keyID
        _name
      }
    }
  `,
  removeDocs: `
    mutation DeleteDocument($options: DeleteInput!){
      RemoveEntries(options: $options){
        palette
        platform
        audience
        customer
      }
    }
  `
}

export default (req, res, next) => {
  try {
    const num = req.body.query.search(/introspection/i);
    if (num > -1) res.end();
  }
  catch (err) {
    res.end();
  }
  if (presets.hasOwnProperty(req.body.query)){
    req.body.query = presets[req.body.query];
    next();
  }
  else res.end();
}