'use strict';

const express = require('express');
const logoutRoutes = express.Router();

module.exports = function() {
  // TODO: Change this to PUT
  logoutRoutes.post('/', function(req, res) {
    console.log('Logging out');
    req.session = null;
    res.status(201).send();
  });

  return logoutRoutes;
};
