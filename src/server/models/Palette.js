import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Dataloader from 'dataloader';
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

function loader({limit = 1000, sort = '-createdAt', populate = 'author'}) {
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
  return this.create(palettes, this.disconnect).then(docs => {
    docs.forEach(({ _id, author }) => {
      Customer.reset({ _id: author }, {'$addToSet': {'palettes': _id}});
    });
    return docs;
  });
}   

Palette.reset = function(options, items){
  connect();
  loader({}).clear(JSON.stringify({}));
  const check = hasOwnProperty.call(items, 'tags');
  let tags = null;
  console.log(check);
  if(check) {
    tags = items.tags;
    delete items.tags;
    console.log(items);
  }
  if(tags && Object.keys(items).length > 1) return new Promise(resolve => {
    this.update(options, {$set: { items }, $addToSet: {'tags': {$each: tags}}}, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  });
  else if(tags && Object.keys(items).length === 1) return new Promise(resolve => {
    this.update(options, {$addToSet: {'tags': {$each: tags}}}, (err, docs) => {
      if (err) throw err;
      console.log('no');
      resolve(docs);
    });
  });
  else return [null];
}

Palette.removeTags = function(options, items){
  connect();
  loader({}).clear(JSON.stringify({}));
  const check = hasOwnProperty.call(items, 'tags');
  let tags = null;
  console.log(check);
  if(check) {
    tags = items.tags;
    delete items.tags;
    console.log(items);
  }
  if(tags && Object.keys(items).length > 1) return new Promise(resolve => {
    this.update(options, {$set: { items }, $addToSet: {'tags': {$each: tags}}}, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  });
  else if(tags && Object.keys(items).length === 1) return new Promise(resolve => {
    this.update(options, {$addToSet: {'tags': {$each: tags}}}, (err, docs) => {
      if (err) throw err;
      console.log('no');
      resolve(docs);
    });
  });
  else return [null];
}

Palette.erase = function(doc){
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.remove(doc, this.disconnect);
}

Palette.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Palette;