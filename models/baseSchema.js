'use strict'
// LOAD MONGOOSE MODULE
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var schemaName = '_Document_'

// CREATE SCHEME OBJECT AND ITS ATRIBUTES
var ModelSchema = Schema({
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

// EXPORT MODEL TO USE IT IN OTHER FILES
module.exports = mongoose.model(schemaName, ModelSchema);