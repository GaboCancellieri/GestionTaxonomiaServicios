'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Service
var ServiceSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    layer: {
        type: Schema.Types.ObjectId,
        ref: 'Layer'
    },
    domain: {
        type: Schema.Types.ObjectId,
        ref: 'Domain'
    },
    standard: {
        type: Schema.Types.ObjectId,
        ref: 'Standard'
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});
var Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;