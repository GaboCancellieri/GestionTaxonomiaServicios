'use strict'

var express = require('express');
var api = express.Router();
var ExploreController = require('../controllers/explore');

// GETS
api.get('/:word', ExploreController.buscar);

module.exports = api; 