'use strict';

const express = require('express');
const registerRoutes = express.Router();

module.exports = function(DataHelpers) {
  // TODO: Change this to PUT
  registerRoutes.post('/', function(req, res) {
    // TODO: Implement this
  });

  return registerRoutes;
};
