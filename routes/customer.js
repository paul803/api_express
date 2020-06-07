'use strict'

const express = require('express');
const Controller = require('../controllers/customer');
const api = express.Router();
const md_auth = require('../middlewares/auth');

// ROUTE FOR CONTROLLER METHODS
api.get('/', md_auth.routePermission, Controller.getAll);
api.get('/:id', md_auth.routePermission, Controller.getById);
api.post('/', md_auth.routePermission, Controller.insertRecord);
api.put('/:id', md_auth.routePermission, Controller.updateRecord);
api.delete('/:id', md_auth.routePermission, Controller.deleteRecord);

// CONFIGURATION EXPORT
module.exports = api;

