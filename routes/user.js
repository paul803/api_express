'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var Controller = require('../controllers/user');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/auth');

api.get('/', md_auth.routePermission, Controller.getAll);
api.get('/:id', md_auth.routePermission, Controller.getById);
api.post('/', md_auth.routePermission, Controller.insertRecord);
api.put('/:id', md_auth.routePermission, Controller.updateRecord);
api.delete('/:id', md_auth.routePermission, Controller.deleteRecord);

// Exportamos la configuración
module.exports = api;

