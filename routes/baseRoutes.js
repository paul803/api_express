'use strict'
// LOAD EXPRESS
var express = require('express');
// LOAD CONTROLLER
var Controller = require('../controllers/_controllerName_');
// ROUTER CALL
var api = express.Router();

var md_auth = require('../middlewares/auth');

// ROUTE FOR CONTROLLER METHODS
api.get('/', md_auth.routePermission, Controller.getAll);
api.get('/:id', md_auth.routePermission, Controller.getById);
api.post('/', md_auth.routePermission, Controller.insertRecord);
api.put('/:id', md_auth.routePermission, Controller.updateRecord);
api.delete('/:id', md_auth.routePermission, Controller.deleteRecord);

// CONFIGURATION EXPORT
module.exports = api;

