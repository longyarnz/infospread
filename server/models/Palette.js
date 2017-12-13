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

function loader({limit = 1000, sort = '-keyID', populate = 'author'}) {
  const find = obj => Palette.find(JSON.parse(obj)).limit(limit)
    .sort(sort).populate(populate).exec(Palette.disconnect).then(res => {
      return res.length > 1 ? [res] : res
    });
  return new Dataloader(find);
}

Palette.get = function(options = {}, limit, sort){    
  connect(); limit = loader({ limit, sort });
  return limit.load(JSON.stringify(options));
}

Palette.set = function(palettes){
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.create(palettes, this.disconnect);
}

Palette.reset = function(options, items){
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.update(options, items, this.disconnect);
}

Palette.erase = function(doc){
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.remove(doc, this.disconnect);
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