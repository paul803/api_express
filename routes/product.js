'use strict'

const express = require('express');
const api = express.Router();
const md_auth = require('../middlewares/auth');
const Model = require('../models/product');

api.get('/', md_auth.routePermission, (req, res) => {
    Model.find({}, '_id codProd product dues, percentage')
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        console.log(error)
        res.status(404).send({message: 'No found data'})
    })
});

module.exports = api;

