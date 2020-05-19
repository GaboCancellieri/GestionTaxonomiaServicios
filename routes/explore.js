'use strict'

var express = require('express');
var api = express.Router();
var ExploreController = require('../controllers/explore');

// GETS
api.get('/:word/:method', ExploreController.buscar);

module.exports = api; 