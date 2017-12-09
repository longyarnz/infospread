import Mongoose from 'mongoose';
import assert from 'assert';
import promise from 'bluebird';
export default () => {
  // const uriDB = `mongodb://PowerUser:addingValue@infospread-shard-00-00-inwmw.mongodb.net:27017,infospread-shard-00-01-inwmw.mongodb.net:27017,infospread-shard-00-02-inwmw.mongodb.net:27017/test?ssl=true&replicaSet=Infospread-shard-0&authSource=admin`;
  const uriDB = 'mongodb://info:voissapp@127.0.0.1/info_spread';
  Mongoose.connect(uriDB, { useMongoClient: true }, function(err){
    assert.equal(err, null);
    console.log('Database Connected...');
  });
  Mongoose.Promise = promise;
}   