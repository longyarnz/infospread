import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

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

Viewer.get = function (options = {}, limit = 1000, sort = {createdAt: 'desc'}) {
  connect();
  return this.find(options, null, { limit, sort }, this.disconnect);
}

Viewer.getOne = function (_id) {
  connect();
  return this.findById(_id, this.disconnect);
}

Viewer.set = function(viewer){
  connect();
  return Viewer.create(viewer, this.disconnect);
}

Viewer.addInterests = function (items) {
  connect();
  const check = hasOwnProperty.call(items, 'interests');
  if (!check) throw "No 'interests' object in the query";
  let { interests, _id } = items;
  interests = Array.isArray(interests) ? interests : [interests];
  for (const i of interests) {
    if (Array.isArray(i)) throw 'Interests contain array';
  }
  console.log(items);
  return new Promise(resolve => {
    this.update({ _id }, { $addToSet: { 'interests': { $each: interests } } }, (err, docs) => {
      if (err) throw err;
      console.log(docs);
      resolve(this.get({ _id }));
    });
  });
}

Viewer.removeInterests = function (items) {
  connect();
  
  const check = hasOwnProperty.call(items, 'interests');
  if (!check) return null;
  let { interests, _id } = items;
  interests = Array.isArray(interests) ? interests : [interests];
  console.log(items);
  return new Promise(resolve => {
    this.update({ _id }, { $pullAll: { interests } }, (err, docs) => {
      if (err) throw err;
      console.log(docs);
      resolve(this.get({ _id }));
    });
  });
}

Viewer.erase = function(doc){
  connect();
  
  return Viewer.remove(doc, this.disconnect);
}

Viewer.reset = function (options, viewer) {
  connect();
  return new Promise(resolve => {
    this.update(options, viewer, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  })
}

Viewer.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Viewer;