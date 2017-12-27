import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Dataloader from 'dataloader';

const viewerSchema = new Schema({
  _id: { type: String, default: UUID.v4 },
  _name: { type: String, required: true }, 
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  interests: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Viewer = Mongoose.model('Viewer', viewerSchema);

function loader({ limit = 1000, sort = '-createdAt' }) {
  const find = obj => Viewer.find(JSON.parse(obj)).limit(limit)
    .sort(sort).exec(Viewer.disconnect).then(res => {
      return res.length > 1 ? [res] : res
    });
  return new Dataloader(find);
}

Viewer.get = function(options = {}, limit = 1000, sort = '-createdAt'){
  connect(); limit = loader({ limit, sort });
  return limit.load(JSON.stringify(options));
}

Viewer.set = function(viewer){
  connect();
  loader({}).clear(JSON.stringify({}));
  return Viewer.create(viewer, this.disconnect);
}

Viewer.erase = function(doc){
  connect();
  loader({}).clear(JSON.stringify({}));
  return Viewer.remove(doc, this.disconnect);
}

Viewer.reset = function (options, viewer) {
  connect();
  loader({}).clear(JSON.stringify({}));
  return new Promise(resolve => {
    this.update(options, viewer, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  })
}

Viewer.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Viewer;