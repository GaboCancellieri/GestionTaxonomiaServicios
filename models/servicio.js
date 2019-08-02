'use strict';

/**
 * Dependencias del modulo
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Servicio Schema
 */
var servicioSchema = new Schema({
    nombre: {unique: true, type: String},
});


// El esquema solo no sirve. Luego, creamos el modelo
var Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;