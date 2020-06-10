'use strict'
// LOAD MONGOOSE MODULE
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var schemaName = 'Customer'

// CREATE SCHEME OBJECT AND ITS ATRIBUTES
var ModelSchema = Schema({
    name: String,
    lastName: String,
    contractType: String,
    payments: String,
    amount: String,
    email: {type: String, unique: true}, //, required: '{PATH} is required!'
    phone1: String,
    phone2: String,
    password: String, // {type: String, required: '{PATH} is required'},
    profileImage: String,
    status: {type: Boolean, default: true},
    contractDate: Date,
    createdAt: Date,
    updatedAt: Date
});

// EXPORT MODEL TO USE IT IN OTHER FILES
module.exports = mongoose.model(schemaName, ModelSchema);