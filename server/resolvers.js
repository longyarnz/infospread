export default {
  Query: {
    palettes: ({ Palette }, { options, limit, sort }) => Palette.get(options, limit, sort, Palette.disconnect),
    customers: ({ Customer }, { options, limit, sort }) => Customer.get(options, limit, sort, Customer.disconnect),
    audience: ({ Audience }, { options, limit, sort }) => Audience.get(options, limit, sort, Audience.disconnect),
    platforms: ({ Platform }, { options, limit, sort }) => Platform.get(options, limit, sort, Platform.disconnect)
  },
  Mutation: {
    CreatePalette: ({ Palette }, { palette }) => Palette.set(palette, Palette.disconnect),
    CreatePlatform: ({ Platform }, { platform }) => Platform.set(platform, Platform.disconnect),
    RegisterCustomer: ({ Customer }, { user }) => Customer.set(user, Customer.disconnect),
    RegisterAudience: ({ Audience }, { audience }) => Audience.set(audience, Audience.disconnect),
    UpdatePalette: ({ Palette }, { palette }) => {
      const { keyID } = palette;
      return Palette.reset({ keyID }, palette).then(async i => {
        if (i.nModified === 0) return null;
        palette = await Palette.find({ keyID }, Palette.disconnect);
        return palette[0];
      }); 
    },
    UpdatePlatform: ({ Platform }, { platform }) => {
      const { keyID } = platform;
      return Platform.reset({ keyID }, platform).then(async i => {
        if (i.nModified === 0) return null;
        platform = await Platform.find({ keyID }, Platform.disconnect);
        return platform[0];
      });
    },
    UpdateCustomer: ({ Customer }, { user }) => {
      const { keyID } = user;
      return Customer.reset({ _id: keyID }, user).then(i => {
        console.log(i);
        if (i.nModified === 0) return null;
        return Customer.find({ _id: keyID }, Customer.disconnect).then(res => res[0]);
      });
    },
    UpdateAudience: ({ Audience }, { audience }) => {
      const { keyID } = audience;
      return Audience.reset({ _id: keyID }, audience).then(async i => {
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
  Palette: {
    author: ({ author }, a, b, { rootValue }) => {
      console.log(author);
      const { Customer } = rootValue;
      return Customer.get({ _id: author }, Customer.disconnect).then(response => response[0]);
    }
  },
  Customer: {
    palettes: ({ palettes }, a, b, { rootValue }) => {
      const { Palette } = rootValue;
      return Palette.get({ _id: {$in: palettes }}, Palette.disconnect);
    }
  }
}