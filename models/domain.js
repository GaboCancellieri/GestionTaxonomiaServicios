'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema paciente
var domainSchema = Schema({
    name: {
        type: String,
        unique: true
    },
});

var Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;