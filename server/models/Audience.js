import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Dataloader from 'dataloader';

const audienceSchema = new Schema({
  _id: { type: String, default: UUID.v4 },
  _name: { type: String, required: true }, 
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  interests: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Audience = Mongoose.model('Audience', audienceSchema, 'audience');

function loader({ limit = 1000, sort = '-_id' }) {
  const find = obj => Audience.find(JSON.parse(obj)).limit(limit)
    .sort(sort).exec(Audience.disconnect).then(res => {
      return res.length > 1 ? [res] : res
    });
  return new Dataloader(find);
}

Audience.get = function(options = {}, limit = 1000, sort = '-_id'){
  connect(); limit = loader({ limit, sort });
  return limit.load(JSON.stringify(options));
}

Audience.set = function(audience){
  connect();
  loader({}).clear(JSON.stringify({}));
  return Audience.create(audience, this.disconnect);
}

Audience.erase = function(doc){
  connect();
  loader({}).clear(JSON.stringify({}));
  return Audience.remove(doc, this.disconnect);
}

Audience.reset = function (options, audience) {
  connect();
  loader({}).clear(JSON.stringify({}));
  return new Promise(resolve => {
    this.update(options, audience, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  })
}

Audience.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Audience;