import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const platformSchema = new Schema({
  _id: { type: String, default: UUID.v4 },
  title: { type: String, required: true },
  category: { type: String, required: true },
  uri: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Platform = Mongoose.model('Platform', platformSchema);

Platform.get = function (options = {}, limit = 1000, sort = '-createdAt') {
  connect();
  return this.find(options, null, { limit, sort }, this.disconnect);
}

Platform.getOne = function (_id) {
  connect();
  return this.findById(_id, this.disconnect);
}

Platform.set = function(items){
  connect();
  return this.create(items, this.disconnect);
}

Platform.reset = function(options, platform){
  connect();
  return new Promise(resolve => {
    this.update(options, platform, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  })
}

Platform.erase = function(doc){
  connect();
  return this.remove(doc, this.disconnect);
}

Platform.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Platform;