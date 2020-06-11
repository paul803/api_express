'use strict'
// LOAD EXPRESS
var express = require('express');
// LOAD CONTROLLER
var Controller = require('../controllers/_controllerName_');
// ROUTER CALL
var api = express.Router();

var md_auth = require('../middlewares/auth');

// ROUTE FOR CONTROLLER METHODS
api.get('/', Controller.getAll);
api.get('/:id', Controller.getById);
api.post('/', Controller.insertRecord);
api.put('/:id', Controller.updateRecord);
api.delete('/:id', Controller.deleteRecord);

// CONFIGURATION EXPORT
module.exports = api;

