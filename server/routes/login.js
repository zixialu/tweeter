'use strict';

const express = require('express');
const loginRoutes = express.Router();

module.exports = function(DataHelpers) {
  // TODO: Change this to PUT
  loginRoutes.post('/', function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const credentials = {
      handle,
      password
    };

    // Validate credentials
    DataHelpers.login(credentials, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!user) {
        // TODO: Bad credentials
        req.session.userId = null;
      } else {
        req.session.userId = user['_id'];
      }
    });
  });

  return loginRoutes;
};
