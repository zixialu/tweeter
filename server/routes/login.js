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
        req.session.userId = user['_id'];
        // FIXME: Send the encrypted id, not the unencrypted id
        res.status(201).send();
      }
    });
  });

  return loginRoutes;
};
