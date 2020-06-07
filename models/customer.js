'use strict'
// LOAD MONGOOSE MODULE
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var schemaName = 'Customer'

// CREATE SCHEME OBJECT AND ITS ATRIBUTES
var ModelSchema = Schema({
    name: String,
    lastName: String,
    type: String,
    email: {type: String, unique: true, required: '{PATH} is required!'},
    password: {type: String, required: '{PATH} is required'},
    profileImage: String,
    status: {type: Boolean, default: true},
    createdAt: Date,
    updatedAt: Date
});

// EXPORT MODEL TO USE IT IN OTHER FILES
module.exports = mongoose.model(schemaName, ModelSchema);