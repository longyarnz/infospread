function performUpdate(model, args){
  const { _id } = args;
  return model.reset({ _id }, args).then(async i => {
    if (i.nModified === 0) return null;
    args = await model.find({ _id }, model.disconnect);
    return args[0];
  });
}


export default {
  Query: {
    onePalette: ({ Palette }, { options }) => Palette.get({_id: options}),
    oneCustomer: ({ Customer }, { options }) => Customer.get({_id: options}),
    onePlatform: ({ Platform }, { options }) => Platform.get({_id: options}),
    oneViewer: ({ Viewer }, { options }) => Viewer.get({_id: options}),
    palettes: ({ Palette }, { options, limit, sort }) => Palette.get(options, limit, sort),
    customers: ({ Customer }, { options, limit, sort }) => Customer.get(options, limit, sort),
    viewers: ({ Viewer }, { options, limit, sort }) => Viewer.get(options, limit, sort),
    platforms: ({ Platform }, { options, limit, sort }) => Platform.get(options, limit, sort)
  },
  Mutation: {
    CreatePalette: ({ Palette }, { palettes }) => Palette.set(palettes),
    CreatePlatform: ({ Platform }, { platforms }) => Platform.set(platforms),
    CreateCustomer: ({ Customer }, { users }) => Customer.set(users),
    CreateViewer: ({ Viewer }, { viewers }) => Viewer.set(viewers),
    UpdatePalette: ({ Palette }, { palette }) => performUpdate(Palette, palette),
    UpdatePlatform: ({ Platform }, { platform }) => performUpdate(Platform, platform),
    UpdateCustomer: ({ Customer }, { user }) => performUpdate(Customer, user),
    UpdateViewer: ({ Viewer }, { viewer }) => performUpdate(Viewer, viewer),
    RemoveEntries: async ({ Palette, Customer, Viewer, Platform }, { options }) => {
      let model, order, result = {};
      for (const fields in options){
        options = {_id: {$in: options[fields]}};
        switch (fields) {
        case 'palette':
          model = Palette;  
          break;
        case 'customer':
          model = Customer;  
          break;
        case 'viewer':
          model = Viewer;  
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