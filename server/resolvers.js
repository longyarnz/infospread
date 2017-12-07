export default {
  Query: {
    palettes: ({ Palette }, { options, limit, sort }) => Palette.get(options, limit, sort, Palette.disconnect),
    customers: ({ Customer }, { options, limit, sort }) => Customer.get(options, limit, sort, Customer.disconnect),
    audience: ({ Audience }, { options, limit, sort }) => Audience.get(options, limit, sort, Audience.disconnect),
    platforms: ({ Platform }, { options, limit, sort }) => Platform.get(options, limit, sort, Platform.disconnect)
  },
  Mutation: {
    CreatePalette: ({ Palette }, { palette }) => {
      return Palette.set(palette, Palette.disconnect)
    },
    UpdatePalette: ({ Palette }, { palette }) => {
      const { keyID } = palette;
      return Palette.reset({ keyID }, palette).then(async i => {
        if (i.nModified === 0) return null;
        palette = await Palette.find({ keyID }, Palette.disconnect);
        return palette[0];
      }); 
    },
    CreatePlatform: ({ Platform }, { platform }) => {
      return Platform.set(platform, Platform.disconnect)
    },
    UpdatePlatform: ({ Platform }, { platform }) => {
      const { keyID } = platform;
      return Platform.reset({ keyID }, platform).then(async i => {
        if (i.nModified === 0) return null;
        platform = await Platform.find({ keyID }, Platform.disconnect);
        return platform[0];
      });
    },
    RegisterCustomer: ({ Customer }, { customer }) => {
      return (Customer.set(customer, Customer.disconnect))[0]
    },
    UpdateCustomer: ({ Customer }, { customer }) => {
      const { keyID } = customer;
      return Customer.reset({ keyID }, customer).then(async i => {
        if (i.nModified === 0) return null;
        customer = await Customer.find({ keyID }, Customer.disconnect);
        return customer[0];
      });
    },
    RegisterAudience: ({ Audience }, { audience }) => {
      return Audience.set(audience, Audience.disconnect)
    },
    UpdateAudience: ({ Audience }, { audience }) => {
      const { keyID } = audience;
      return Audience.reset({ keyID }, audience).then(async i => {
        if (i.nModified === 0) return null;
        audience = await Audience.find({ keyID }, Audience.disconnect);
        return audience[0];
      });
    },
    RemoveEntries: async ({ Palette, Customer, Audience, Platform }, order) => {
      let model, options;
      for (const fields in order){
        options = order[fields];
        switch (fields) {
        case 'palette':
          model = Palette;  
          break;
        case 'customer':
          model = Customer;  
          break;
        case 'audience':
          model = Audience;  
          break;        
        default:
          model = Platform;
          break;
        }    
        options = await model.erase(options, model.disconnect);
        options = options.result.n;
      }    
      return options > 0;
    }
  },
  Palette: obj => obj,
  author: ({ author }, a, b, info) => {
    console.log([ author, info ]);

  }
}