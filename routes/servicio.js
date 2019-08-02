'use strict'
var express = require('express');
var ServicioController = require('../controllers/servicio');
var api = express.Router();

api.get('/', ServicioController.getServicios);
api.get('/:idServicio', ServicioController.getServicio);
api.patch('/:idServicio', ServicioController.patchServicio);
api.post('/', ServicioController.postServicio);
api.delete('/:idServicio', ServicioController.deleteServicio);

module.exports = api;