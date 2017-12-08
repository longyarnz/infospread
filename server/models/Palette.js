import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Dataloader from 'dataloader';

const paletteSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: 'keyID' },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  src_file: { type: String, required: true },
  author: { type: String, required: true, ref: 'Customer' },
  createdAt: { type: Date, default: Date.now }
});

const Palette = Mongoose.model('Palette', paletteSchema);

Palette.get = function(options = {}, limit = 1000, sort = '', callback, populate = '', select = ''){
  connect();
  return this.find(options).limit(limit).sort(sort).populate(populate).select(select).exec(callback);
}

Palette.set = function(palettes, callback){
  connect();
  return this.create(palettes, callback);
}

Palette.reset = function(options, items, callback){
  connect();
  return this.update(options, items, callback);
}

Palette.erase = function(doc, callback){
  connect();
  return this.remove(doc, callback);
}

Palette.query = `query GetPalettes {
  items {
    keyID
    title
    category
    tags
    author
    description
    src_file
  }
}`;

Palette.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Palette;