import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Customer from './Customer';

const paletteSchema = new Schema({
  _id: { type: String, default: UUID.v4 },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  uri: { type: String, required: true },
  author: { type: String, required: true, ref: 'Customer' },
  createdAt: { type: Date, default: Date.now }
});

const Palette = Mongoose.model('Palette', paletteSchema);

Palette.get = function (options = {}, limit = 1000, sort = '-createdAt'){    
  connect();
  return this.find(options, null, { limit, sort, populate: 'author' }, this.disconnect);
}

Palette.getOne = function (_id){    
  connect();
  return this.findById(_id, null, { populate: 'author' }, this.disconnect);
}

Palette.set = function(palettes){
  connect();
  return this.create(palettes, this.disconnect).then(docs => {
    if (Array.isArray(docs)) {
      docs.forEach(({ _id, author }) => {
        Customer.reset({ _id: author }, {'$addToSet': {'palettes': _id}});
      });
    }
    return docs;
  });
}   

Palette.reset = function(_id, items){
  connect();
  const check = hasOwnProperty.call(items, 'tags');
  if (!check) throw "'tags' object is present in the query";
  return new Promise(resolve => {
    this.update(_id, items, (err, docs) => {
      if (err) throw err;
      resolve(docs);
      this.disconnect();
    });
  });
}

Palette.addTags = function(items){
  connect();
  const check = hasOwnProperty.call(items, 'tags');
  if (!check) throw "No 'tags' object in the query";
  let { tags, _id } = items;
  tags = Array.isArray(tags) ? tags : [ tags ];
  for (const i of tags) {
    if (Array.isArray(i)) throw 'Tags contain array';
  }
  return new Promise(resolve => {
    this.update({ _id }, {$addToSet: {'tags': {$each: tags}}}, (err, docs) => {
      if (err) throw err;
      console.log(docs);
      resolve(this.getOne(_id));
      this.disconnect();
    });
  });
}

Palette.removeTags = function(items){
  connect();
  const check = hasOwnProperty.call(items, 'tags');
  if (!check) return null;
  let { tags, _id } = items;
  tags = Array.isArray(tags) ? tags : [ tags ];
  console.log(items);
  return new Promise(resolve => {
    this.update({ _id }, {$pullAll: {tags}}, (err, docs) => {
      if (err) throw err;
      console.log(docs);
      resolve(this.getOne(_id));
      this.disconnect();
    });
  });
}

Palette.erase = function(doc){
  connect();
  return this.remove(doc, this.disconnect);
}

Palette.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Palette;