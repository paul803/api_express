'use strict'

const express = require('express');
const md_auth = require('../middlewares/auth');
const Model = require('../models/permission');

const api = express.Router();

api.use(md_auth.hasApiKey)

api.get('/', md_auth.routePermission, (req, res) => {
    Model.find({})
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        console.log(error)
        res.status(404).send({message: 'No found data'})
    })
});

module.exports = api;

