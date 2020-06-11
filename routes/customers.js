'use strict'

const express = require('express');
const Model = require('../models/customer');

const api = express.Router();

//GET ALL RECORDS (PAGINATED)
api.get('/', (req, res) => {
    var page = req.query.page === undefined ? 0 : parseInt(req. query.page)
    var limit = req.query.limit == undefined? 10 : parseInt(req.query.limit)
    var search = req.query.search == undefined? '' : req.query.search
    var dataFind = {}
    if (search !== '') {
        dataFind = {name: {$regex: search, $options: 'i'}}
    }

    Model.find(dataFind)
    .sort({createdAt: -1})
    .skip(page) //page == 0 ? page : page + 1)
    .limit(limit)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        console.log(error)
        res.status(404).send({message: 'No found data'})
    })
});

// GET A RECORD BY ITS ID
api.get('/:id', (req, res) => {
    var id = req.params.id;
    
    Model.findById(id, (err, data) => {
        console.log(err)
        if (err) return res.status(500).send({message: 'Error on request'});
        if (!data) return res.status(404).send({message: 'Not found data'})

        res.send(data)
    });
});

// INSERT A NEW RECORD
api.post('/', (req, res) => {
    req.body.createdAt = Date.now();

    Model.create(req.body)
    .then(result => {
        res.send({'id': result._id})
    })
    .catch(error => {
        var message = '';
        if (error.keyPattern !== undefined) {
            message = error.keyPattern.email !== undefined ? ', email already exists' : '';
        }
        else if (error.errors !== undefined) {
            var errors = Object.keys(error.errors)
            //console.log(errors)
            errors.forEach(element => {
                console.log(error.errors[element].properties.message)
                message = ', '+error.errors[element].properties.message;
                return false;
            });
        }
        res.status(409)
        res.send('Error on save'+message)
    })
});

// UPDATE A RECORD BY ID
api.put('/:id', (req, res) => {
    var id = req.params.id;
    req.body.updatedAt = Date.now();
    Model.findByIdAndUpdate(id, req.body)
    .then(result => {
        if (result === null) res.status(404).send({message: 'Not found ID'})
        res.send(result)
    })
    .catch(error => {
        console.log(error)
        res.status(409).send({message: 'Error on update'})
    })
});

// DELETE A RECORD BY ID
api.delete('/:id', (req, res) => {
    var id = req.params.id;
    //Model.findOneAndRemove({field: 'newValue'}
    Model.findByIdAndDelete(id)
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        res.status(409);
        res.send(error)
    })
});

module.exports = api;
