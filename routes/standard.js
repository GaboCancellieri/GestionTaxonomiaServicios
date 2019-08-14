'use strict'

var express = require('express');
var api = express.Router();
var StandardController = require('../controllers/standard');

// GETS
api.get('/',StandardController.getStandards);
api.get('/:idStandard',StandardController.getStandard);

// PATCH
api.patch('/:idStandard',StandardController.patchStandard);

// POST
api.post('/',StandardController.postStandard);

// DELETE
api.delete('/:idStandard', StandardController.deleteStandard)

module.exports = api; 