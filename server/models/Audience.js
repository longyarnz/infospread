import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const audienceSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: 'keyID' },
  _name: { type: String, required: true }, 
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  interests: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Audience = Mongoose.model('Audience', audienceSchema, { collectionName: 'audience'});

Audience.get = function(options = {}, limit = 100, sort = '', callback, populate = '', project = ''){
  connect();
  return Audience.find(options, project, { limit, sort, populate }, callback);
}

Audience.set = function(audience, callback){
  connect();
  return Audience.create(audience, callback);
}

Audience.erase = function(doc, callback){
  connect();
  return Audience.remove(doc, callback);
}

Audience.reset = function (options, audience, callback) {
  connect();
  return Audience.update(options, audience, callback);
}

Audience.query = `
  query GetAudience{
    audience{
      keyID
      _name
      email
      phone
      interests
    }
  }
`;

Audience.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Audience;