'use strict';

/**
 * Dependencias del modulo
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Dominio Schema
 */
var dominioSchema = new Schema({
    nombre: {unique: true, type: String},
});


// El esquema solo no sirve. Luego, creamos el modelo
var Dominio = mongoose.model('Dominio', dominioSchema);

module.exports = Dominio;