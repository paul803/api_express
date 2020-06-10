'use strict'

const express = require('express');
//const Controller = require('../controllers/login');
const api = express.Router();
const md_auth = require('../middlewares/auth');

// ROUTE FOR CONTROLLER METHODS

api.post('/', md_auth.makeAuth, (req, res) => {
    res.send({apiKey: res.token})
});

//api.put('/:id', md_auth.routePermission, Controller.updateRecord);
//api.delete('/:id', md_auth.routePermission, Controller.deleteRecord);

// CONFIGURATION EXPORT
module.exports = api;

