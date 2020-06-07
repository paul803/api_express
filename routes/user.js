'use strict'

var express = require('express');
var Controller = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/auth');

// ROUTE FOR CONTROLLER METHODS
api.get('/', md_auth.routePermission, Controller.getAll);
api.get('/:id', md_auth.routePermission, Controller.getById);
api.post('/', md_auth.routePermission, Controller.insertRecord);
api.put('/:id', md_auth.routePermission, Controller.updateRecord);
api.delete('/:id', md_auth.routePermission, Controller.deleteRecord);

module.exports = api;

