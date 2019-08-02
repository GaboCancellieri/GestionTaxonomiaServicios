'use strict'
var express = require('express');
var DominioController = require('../controllers/dominio');
var api = express.Router();

api.get('/', DominioController.getDominios);
api.get('/:idDominio', DominioController.getDominio);
api.patch('/:idDominio', DominioController.patchDominio);
api.post('/', DominioController.postDominio);
api.delete('/:idDominio', DominioController.deleteDominio);

module.exports = api;