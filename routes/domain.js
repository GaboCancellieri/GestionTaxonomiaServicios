'use strict'

var express = require('express');
var api = express.Router();
var DomainController = require('../controllers/domain');

// GETS
api.get('/',DomainController.getDomains);
api.get('/:idDomain',DomainController.getDomain);

// PATCH
api.patch('/:idDomain',DomainController.patchDomain);

// POST
api.post('/',DomainController.postDomain);

// DELETE
api.delete('/:idDomain', DomainController.deleteDomain)

module.exports = api; 