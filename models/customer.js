'use strict'
// LOAD MONGOOSE MODULE
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var schemaName = 'Customer'

// CREATE SCHEME OBJECT AND ITS ATRIBUTES
var ModelSchema = Schema({
    name: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    contractType: String,
    payments: String,
    amount: String,
    efficiency: String,
    email: {type: String, unique: true},
    phones: Object,
    address: Object,
    password: String,
    profileImage: String,
    status: {type: Boolean, default: true},
    //contractDate: Date,
    createdAt: Date,
    updatedAt: Date
});

// EXPORT MODEL TO USE IT IN OTHER FILES
module.exports = mongoose.model(schemaName, ModelSchema);