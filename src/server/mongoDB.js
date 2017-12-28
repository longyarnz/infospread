import Mongoose from 'mongoose';
import assert from 'assert';
import promise from 'bluebird';
export default callback => {
  const uriDB = 'mongodb://info:voissapp@127.0.0.1:27017/info_spread';
  Mongoose.connect(uriDB, { useMongoClient: true }, function(err){
    assert.equal(err, null);
    console.log('Database Connected...');
  });
  Mongoose.Promise = promise;
  return callback ? callback : Mongoose;
}   