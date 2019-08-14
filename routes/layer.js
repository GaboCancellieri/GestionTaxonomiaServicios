'use strict'

var express = require('express');
var api = express.Router();
var LayerController = require('../controllers/layer');

// GETS
api.get('/',LayerController.getLayers);
api.get('/:idLayer',LayerController.getLayer);

// PATCH
api.patch('/:idLayer',LayerController.patchLayer);

// POST
api.post('/',LayerController.postLayer);

// DELETE
api.delete('/:idLayer', LayerController.deleteLayer)

module.exports = api; 