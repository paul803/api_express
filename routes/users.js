'use strict'

const express = require('express');
const fs = require('fs')
const md_auth = require('../middlewares/auth');
const Model = require('../models/user');

const api = express.Router();

api.use(md_auth.hasApiKey)

//GET ALL RECORDS (PAGINATED)
api.get('/', md_auth.routePermission, (req, res) => {
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
api.get('/:id', md_auth.routePermission, (req, res) => {
    var id = req.params.id;
    
    Model.findById(id, (err, data) => {
        //console.log(err)
        if (err) return res.status(500).send({message: 'Error on request'});
        if (!data) return res.status(404).send({message: 'Not found data'})

        res.send(data)
    });
});

// INSERT A NEW RECORD
api.post('/', md_auth.routePermission, (req, res) => {
    req.body.status = true
    req.body.createdAt = Date.now()

    Model.create(req.body)
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        var message = '';
        if (error.keyPattern !== undefined) {
            message = error.keyPattern.email !== undefined ? ', email already exists' : '';
        }
        else if (error.errors !== undefined) {
            var errors = Object.keys(error.errors)
            console.log(errors)
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
api.put('/:id', md_auth.routePermission, (req, res) => {
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
api.delete('/:id', md_auth.routePermission, (req, res) => {
    var id = req.params.id;
    //Model.findOneAndRemove({field: 'newValue'}
    Model.findByIdAndDelete(id)
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        res.status(409).send(error)
    })
});


//UPLOAD THE PROFILE PICTURE
api.post('/profileImage', md_auth.routePermission, async (req, res) => {
    try {
        if (!req.files) {
            return res.status(417).send({message: 'No file uploaded'});
        }
        if (!req.files.picture) {
            return res.status(417).send({message: 'No file picture'});
        } 
        
            let id = req.body.id
            let picture = req.files.picture;

            if (picture.mimetype !== 'image/png' && picture.mimetype !== 'image/jpg') {
                return res.status(417).send({message: 'Image format incorrect'});
            }
            if (req.user.role === 'admin') {
                if (id === undefined || id === '') id = req.user.uid
            }
            
            let directory = './public/users/'+id+'/';
            let fileName = Date.now() + '.' + picture.mimetype.replace('image/', '')

            //SAVE IMAGE
            picture.mv(directory + fileName)
            .then( _ => {

                Model.findById(id)
                .then(data => {
                    if (!data) return res.status(404).send({message: 'Not found data'})

                    if (data.image !== '' && data.image !== undefined) {
                        let imageDelete = directory + data.image
                        fs.unlink(imageDelete, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                        })
                    }
                    data.image = fileName
                    data.updatedAt = Date.now()
                    data.save()
                    .then(saved => {
                        if (!saved) return res.status(404).send({message: 'Error on save image (x00)'})
                        res.send(directory+fileName)
                        //return true
                    })
                    .catch(error => {
                        console.log(error)
                        fs.unlink(directory + fileName)
                        res.status(409).send({message: 'Error on save image (x00)'})
                    })
                })
                .catch(error => {
                    console.log(error)
                    fs.unlink(directory + fileName)
                    res.status(409).send({message: 'Error on save image (x01)'})
                })
            })
            .catch(error => {
                console.log(error)
                res.status(409).send({message: 'Error on save image (x02)'})
            })
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = api;

