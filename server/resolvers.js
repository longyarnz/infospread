// import Faker from 'faker';
import UUID from 'uuid';
export default {
  Query: {
    palettes: ({ Palette }, { options, limit, sort }) => Palette.get(options, limit, sort, Palette.disconnect),
    customers: ({ Customer }, { options, limit, sort }) => Customer.get(options, limit, sort, Customer.disconnect),
    audience: ({ Audience }, { options, limit, sort }) => Audience.get(options, limit, sort, Audience.disconnect),
    platforms: ({ PLatform }, { options, limit, sort }) => PLatform.get(options, limit, sort, PLatform.disconnect)
  },
  Mutation: {
    CreatePalette: async ({ Palette }, { palette }) => {
      const keyID = UUID.v4();
      palette.keyID = keyID;
      return Palette.set(palette, Palette.disconnect)
    }
  }
// 		MakeRegularOrder: async ({ Invoice, User }, { client, invoice }) => {
// 	    let check, invoice_number;
// 	    do{
// 	      invoice_number = Faker.random.number({min: 100000, max: 199999});
// 	      check = await Invoice.numerate({ invoice_number });
// 	      client.invoice = invoice.invoice_number = invoice_number;
// 	    }
// 	    while(check > 0);
// 	    return User.set(client, User.disconnect).then(({ keyID }) => {
// 	      invoice.user = keyID;
// 	      return Invoice.set(invoice, Invoice.disconnect)
// 	      .then(async () => {
// 	      	let invoice = await Invoice.get({}, 1, '-createdAt', Invoice.disconnect, 'user');
// 	      	invoice = invoice[0];
// 	      	return { client, invoice, keyID }
// 	      });
// 	    });
// 	  },
// 		CreateItems: async ({ Item }, { items }) => {
// 	    let keyID = await Item.get({}, 1, '-keyID', Item.disconnect);
// 	    keyID = keyID[0].keyID;
// 	    items.forEach(item => { item.keyID = ++keyID });
// 	    return Item.set(items, Item.disconnect);
// 	  },
// 		UpdateItems: ({ Item }, { items }) => {
// 	    const { keyID } = items;
// 	    return Item.reset({ keyID }, items).then(async i => {
// 	    	if (i.nModified === 0) return [];
// 	      items = await Item.find({ keyID }, Item.disconnect);
// 	      return items;
// 	    }); 
// 	  },
// 		RemoveEntries: async ({ Item, Invoice, Client, User }, order) => {
// 	    let model, options, all, response = {};
// 	    for (const fields in order){
// 	      all = false;
// 	      options = order[fields];
// 	      switch(fields){
// 	        case 'allUsers': all = true; fields = 'user';
// 	        case 'user': model = User; break;
// 	        case 'allInvoices': all = true; fields = 'invoice';
// 	        case 'invoice': model = Invoice; break;
// 	        case 'allClients': all = true; fields = 'client';
// 	        case 'client': model = Client; break;
// 	        case 'allItems': all = true; fields = 'item';
// 	        default: model = Item;
// 	      }      
// 	      options = all ? await model.erase({}, model.disconnect) : await model.erase({$or: options}, model.disconnect);
// 	      response[fields] = options.result.n;
// 	    }    
// 	    return response;
// 	  }
// 	}
}