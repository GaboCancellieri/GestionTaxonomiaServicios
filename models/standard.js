'use strict'; 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StandardSchema = Schema({
    name: {
        type: String,
        unique: true
    },
});
var Standard = mongoose.model('Standard', StandardSchema);

module.exports = Standard;