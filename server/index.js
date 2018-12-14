'use strict';

// Basic express setup:

const PORT = 8080;
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SESSION_KEY],
    // Cookie Options
    // Persist cookie for 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
);
app.use(express.static('public'));

const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(
  MONGODB_URI,
  (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    // We have a connection to the "tweeter" db, starting here.
    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    // The `data-helpers` module provides an interface to the database of tweets.
    // This simple interface layer has a big benefit: we could switch out the
    // actual database it uses and see little to no changes elsewhere in the code
    // (hint hint).
    //
    // Because it exports a function that expects the `db` as a parameter, we can
    // require it and pass the `db` parameter immediately:
    const DataHelpers = require('./lib/data-helpers.js')(db);

    // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
    // so it can define routes that use it to interact with the data layer.
    const tweetsRoutes = require('./routes/tweets')(DataHelpers);

    // Mount the tweets routes at the "/tweets" path prefix:
    app.use('/tweets', tweetsRoutes);

    // Same as above but for logging in
    const loginRoutes = require('./routes/login')(DataHelpers);
    app.use('/login', loginRoutes);

    // Same as above but for logging in
    const registerRoutes = require('./routes/register')(DataHelpers);
    app.use('/register', registerRoutes);
  }
);

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
