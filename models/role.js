'use strict'
// LOAD MONGOOSE MODULE
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var schemaName = 'Role'

// CREATE SCHEME OBJECT AND ITS ATRIBUTES
var ModelSchema = Schema({
    name: String,
    permissions: Object,
    status: Boolean,
});

// EXPORT MODEL TO USE IT IN OTHER FILES
module.exports = mongoose.model(schemaName, ModelSchema);