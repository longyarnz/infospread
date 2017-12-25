import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Dataloader from 'dataloader';

const platformSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: '_id' },
  title: { type: String, required: true },
  category: { type: String, required: true },
  src_file: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Platform = Mongoose.model('Platform', platformSchema);

function loader({ limit = 1000, sort = '-_id' }) {
  const find = obj => Platform.find(JSON.parse(obj)).limit(limit)
    .sort(sort).exec(Platform.disconnect).then(res => {
      return res.length > 1 ? [res] : res
    });
  return new Dataloader(find);
}

Platform.get = function(options = {}, limit = 1000, sort = '-_id'){
  connect(); limit = loader({ limit, sort });
  return limit.load(JSON.stringify(options));
}

Platform.set = function(items){
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.create(items, this.disconnect);
}

Platform.reset = function(options, platform){
  connect();
  loader({}).clear(JSON.stringify({}));
  return new Promise(resolve => {
    this.update(options, platform, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  })
}

Platform.erase = function(doc){
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.remove(doc, this.disconnect);
}

Platform.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Platform;