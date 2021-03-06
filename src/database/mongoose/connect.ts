import * as mongoose from "mongoose";

import { ENV, configENV } from "../../config/index";

const { host, port, username, password, db:dbName } = configENV["mongo"].db;

const mongoURI = ENV === 'prod'
  ? `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${dbName}`
  : `mongodb://${host}:${port}/${dbName}`;

mongoose.Promise = global.Promise;

// { useMongoClient: true }
// { useNewUrlParser: true }
// { native_parser: true }
// { useUnifiedTopology: true }
mongoose.connect(mongoURI, {  useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error .... '));

db.on('open', function callback(err) {
  if (err) {
    console.log('err db : ', err);
  } else {
    console.log(`MongoDB "${dbName}" is connected`);
  }
});

// const ObjectId = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId

export { db, mongoose, ObjectId };
