function performUpdate(model, args){
  const { keyID } = args;
  return model.reset({ _id: keyID }, args).then(async i => {
    if (i.nModified === 0) return null;
    args = await model.find({ _id: keyID }, model.disconnect);
    return args[0];
  });
}


export default {
  Query: {
    palettes: ({ Palette }, { options, limit, sort }) => Palette.get(options, limit, sort, Palette.disconnect, 'author'),
    customers: ({ Customer }, { options, limit, sort }) => Customer.get(options, limit, sort, Customer.disconnect, 'palettes'),
    audience: ({ Audience }, { options, limit, sort }) => Audience.get(options, limit, sort, Audience.disconnect),
    platforms: ({ Platform }, { options, limit, sort }) => Platform.get(options, limit, sort, Platform.disconnect)
  },
  Mutation: {
    CreatePalette: ({ Palette }, { palettes }) => Palette.set(palettes, Palette.disconnect),
    CreatePlatform: ({ Platform }, { platforms }) => Platform.set(platforms, Platform.disconnect),
    RegisterCustomer: ({ Customer }, { users }) => Customer.set(users, Customer.disconnect),
    RegisterAudience: ({ Audience }, { viewers }) => Audience.set(viewers, Audience.disconnect),
    UpdatePalette: ({ Palette }, { palette }) => performUpdate(Palette, palette),
    UpdatePlatform: ({ Platform }, { platform }) => performUpdate(Platform, platform),
    UpdateCustomer: ({ Customer }, { user }) => performUpdate(Customer, user),
    UpdateAudience: ({ Audience }, { viewer }) => performUpdate(Audience, viewer),
    RemoveEntries: async ({ Palette, Customer, Audience, Platform }, { options }) => {
      let model, order, result = {};
      for (const fields in options){
        console.log(fields);
        options = {_id: {$in: options[fields]}};
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
        order = await model.erase(options, model.disconnect);
        result[fields] = order.result.ok > 0;
      }    
      return result;
    }
  }
}