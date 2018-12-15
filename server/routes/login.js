'use strict';

const express = require('express');
const loginRoutes = express.Router();

module.exports = function(DataHelpers) {
  // TODO: Change this to PUT
  loginRoutes.post('/', function(req, res) {
    if (!req.body.handle || !req.body.password) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const credentials = {
      handle: req.body.handle,
      password: req.body.password
    };

    // Validate credentials
    DataHelpers.login(credentials, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!user) {
        // TODO: Handle bad credentials
        console.log('Invalid user credentials');
        req.session = null;
        res.status(401).send();
      } else {
        console.log('Valid user credentials');
        req.session.userId = user.uuid;
        res.status(201).send();
      }
    });
  });

  // Validates a user's cookie, returning user information from db if valid
  // TODO: Change this to PUT
  // TODO: Should this be in its own route to be more RESTful?
  loginRoutes.get('/validate-cookie', function(req, res) {
    DataHelpers.getUser(req.session.userId, (err, user) => {
      console.log('datahelpers got user ' + user);
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (user) {
        res.status(201).json({
          handle: user.handle,
          name: user.name,
          avatars: user.avatars
        });
      } else {
        res.status(201).json();
      }
    });
  });

  return loginRoutes;
};
