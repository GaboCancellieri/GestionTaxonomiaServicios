'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema pedido
var layerSchema = Schema({
    name: {
        type: String,
        unique: true
    },
});

var Layer = mongoose.model('Layer', layerSchema);

module.exports = Layer;