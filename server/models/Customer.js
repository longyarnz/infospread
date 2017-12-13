import UUID from 'uuid';
import Mongoose, { Schema } from 'mongoose';
import connect from '../mongoDB';
import Dataloader from 'dataloader';

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

function loader({ limit, sort, populate = 'palettes' }) {
  const find = obj => Customer.find(JSON.parse(obj)).limit(limit)
    .sort(sort).populate(populate).exec(Customer.disconnect).then(res => {
      return res.length > 1 ? [res] : res
    });
  return new Dataloader(find);
}

Customer.get = function (options = {}, limit = 100, sort = '-keyID') {
  connect(); limit = loader({ limit, sort });
  return limit.load(JSON.stringify(options));
}

Customer.set = function (customer) {
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.create(customer, this.disconnect);
}

Customer.erase = function (doc) {
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.remove(doc, this.disconnect);
}

Customer.reset = function (options, customer) {
  connect();
  loader({}).clear(JSON.stringify({}));
  return this.update(options, customer, this.disconnect);
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