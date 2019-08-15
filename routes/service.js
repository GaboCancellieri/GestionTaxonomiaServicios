'use strict'

var express = require('express');
var api = express.Router();
var ServiceController = require('../controllers/service');

// GETS
api.get('/',ServiceController.getServices);
api.get('/:idService',ServiceController.getService);
api.get('/service/tree',ServiceController.getServiceTree);

// PATCH
api.patch('/:idService',ServiceController.patchService);

// POST
api.post('/',ServiceController.postService);

// DELETE
api.delete('/:idService', ServiceController.deleteService)

module.exports = api;