'use strict';

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Save a tweet to mongodb
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get a tweet from mongodb
    getTweets: function(callback) {
      db.collection('tweets')
        .find()
        .toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          return callback(null, tweets);
        });
    },

    // Register a new user
    register: function(user, callback) {
      // TODO: Register
    },

    // Validate a login
    // Return a user object on successful login
    login: function(credentials, callback) {
      // Try to find user record
      db.collection('users').findOne(
        { handle: `@${credentials.handle}` },
        (err, user) => {
          if (err) {
            return callback(err);
          }

          if (user || credentials.password === user.password) {
            // User exists with matching credentials; login succeeded
            return callback(null, user);
          }

          // Credentials invalid; login failed
          return callback(null, null);
        }
      );
    }
  };
};
