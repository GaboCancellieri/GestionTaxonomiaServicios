'use strict';

/**
 * Dependencias del modulo
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Estandar Schema
 */
var estandarSchema = new Schema({
    nombre: {unique: true, type: String},
    detalle: String,
});


// El esquema solo no sirve. Luego, creamos el modelo
var Estandar = mongoose.model('Estandar', estandarSchema);

module.exports = Estandar;