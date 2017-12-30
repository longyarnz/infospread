import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const customerSchema = new Schema({
  _id: { type: String, default: UUID.v4 },
  _name: { type: String, required: true },
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  palettes: [{ type: String, default: '', ref: 'Palette' }],
  createdAt: { type: Date, default: Date.now }
});

const Customer = Mongoose.model('Customer', customerSchema);

Customer.get = function (options = {}, limit = 1000, sort = '-createdAt') {
  connect();
  console.log(options);
  return this.find(options, null, { limit, sort, populate: 'palettes' }, this.disconnect);
}

Customer.getOne = function (_id) {
  connect();
  return this.findById(_id, null, { populate: 'palettes' }, this.disconnect);
}

Customer.set = function (customer) {
  connect();
  return this.create(customer, this.disconnect);
}

Customer.erase = function (doc) {
  connect();
  return this.remove(doc, this.disconnect);
}

Customer.reset = function (options, customer) {
  connect();
  return new Promise(resolve => {
    this.update(options, customer, (err, docs) => {
      if(err) throw err;
      resolve(docs);
    });
  })
}

Customer.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Customer;