import Mongoose from 'mongoose';
import assert from 'assert';
import promise from 'bluebird';
export default callback => {
  const uriDB = `mongodb://PowerUser:addingValue@infospread-shard-00-00-inwmw.mongodb.net:27017,infospread-shard-00-01-inwmw.mongodb.net:27017,infospread-shard-00-02-inwmw.mongodb.net:27017/infospread?ssl=true&replicaSet=Infospread-shard-0&authSource=admin`;
  // const uriDB = 'mongodb://info:voissapp@127.0.0.1/info_spread';
  // const uriDB = 'mongodb+srv://PowerUser:addingValue@infospread-inwmw.mongodb.net/infospread';
  Mongoose.connect(uriDB, { useMongoClient: true }, function(err){
    assert.equal(err, null);
    console.log('Database Connected...');
  });
  Mongoose.Promise = promise;
  return callback && callback;
}   