'use strict'
var express = require('express');
var EstandarController = require('../controllers/estandar');
var api = express.Router();

api.get('/', EstandarController.getEstandares);
api.get('/:idEstandar', EstandarController.getEstandar);
api.patch('/:idEstandar', EstandarController.patchEstandar);
api.post('/', EstandarController.postEstandar);
api.delete('/:idEstandar', EstandarController.deleteEstandar);

module.exports = api;