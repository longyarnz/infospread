import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const platformSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: 'keyID' },
  title: { type: String, required: true },
  category: { type: String, required: true },
  src_file: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Platform = Mongoose.model('Platform', platformSchema);

Platform.get = function(options = {}, limit = 1000, sort = '', callback, populate = '', project = ''){
  connect();
  return Platform.find(options, project, { limit, sort, populate }, callback);
}

Platform.set = function(items, callback){
  connect();
  return Platform.create(items, callback);
}

Platform.reset = function(options, items, callback){
  connect();
  return Platform.update(options, items, callback);
}

Platform.erase = function(doc, callback){
  connect();
  return Platform.remove(doc, callback);
}

Platform.query = `
  query GetPlatforms {
    platforms {
      keyID
      title
      category
      tags
      author
      src_file
    }
  }
`;

Platform.disconnect = () => Mongoose.disconnect(() => console.info('Database Disconnected...'));

export default Platform;