'use strict';

const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweets';

MongoClient.connect(
  MONGODB_URI,
  (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    // We have a connection to the "tweeter" db, starting here.
    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    console.log('DB is ' + db);
    module.exports = db;
  }
);
