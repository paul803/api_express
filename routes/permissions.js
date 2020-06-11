'use strict'

const express = require('express');
const api = express.Router();

const Model = require('../models/permission');

api.get('/', (req, res) => {
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

