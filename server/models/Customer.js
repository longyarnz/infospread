import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';

const customerSchema = new Schema({
  _id: { type: String, default: UUID.v4, alias: 'keyID' },
  _name: { type: String, required: true },
  email: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: Number, required: true },
  palettes: [{ type: String, default: '', ref: 'Palette' }],
  createdAt: { type: Date, default: Date.now }
});

const Customer = Mongoose.model('Customer', customerSchema);

Customer.get = function (options = {}, limit = 100, sort = '', callback, populate = '', project = '') {
  connect();
  return this.find(options, project, { limit, sort, populate }, callback);
}

Customer.set = function (customer, callback) {
  connect();
  return this.create(customer, callback);
}

Customer.erase = function (doc, callback) {
  connect();
  return this.remove(doc, callback);
}

Customer.reset = function (options, customer, callback) {
  connect();
  return this.update(options, customer, callback);
}

Customer.query = `
  query GetCustomers{
    customers{
      keyID
      _name
      email
      phone
      palettes
    }
  }
`;

Customer.disconnect = () => Mongoose.disconnect(() => console.log('Database Disconnected...'));

export default Customer;