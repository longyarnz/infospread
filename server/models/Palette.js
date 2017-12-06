import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const paletteSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: 'keyID' },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  src_file: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Palette = Mongoose.model('Palette', paletteSchema);

Palette.get = function(options = {}, limit = 1000, sort = '', callback, populate = '', project = ''){
  connect();
  return Palette.find(options, project, { limit, sort, populate }, callback);
}

Palette.set = function(items, callback){
  connect();
  return Palette.create(items, callback);
}

Palette.reset = function(options, items, callback){
  connect();
  return Palette.update(options, items, callback);
}

Palette.erase = function(doc, callback){
  connect();
  return Palette.remove(doc, callback);
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

Palette.disconnect = () => Mongoose.disconnect(() => console.info('Database Disconnected...'));

export default Palette;