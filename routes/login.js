'use strict'

const express = require('express');
const api = express.Router();
const md_auth = require('../middlewares/auth');

const Model = require('../models/user');

api.post('/', md_auth.makeAuth, (req, res) => {
    res.send({apiKey: res.token})
})

api.post('/passwordReset', (req, res) => {
    if (req.body.email !== undefined) {
        //res.send(req.body.email)
        Model.find({email: req.body.email})
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            console.log(error)
            res.status(404).send({message: 'No found data'})
        })
    }
    //res.send({apiKey: res.token})
})

module.exports = api;
