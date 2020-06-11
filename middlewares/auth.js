'user strict'
require('dotenv').config()
const jwt = require('jwt-simple')
const moment = require('moment')
const crypto = require('crypto')
const secret = process.env.JWT_SECRET

const ModelRoles = require('../models/role');
const ModelUsers = require('../models/user');


exports.makeAuth = (req, res, next) => {
    if (req.body.username === undefined || req.body.password === undefined) {
        res.status(403).send({message: 'Add username and password'})
    }
    else {
        var username = req.body.username
        var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
        
        ModelUsers.findOne({username: username, password: password, status: true})
        .then(data => {
            console.log(data)
            if (data !== null) {
                var payload = {
                    iss: 'ApiExpress',
                    sub: data.name,
                    uid: data._id,
                    role: data.role,
                    iat: new Date().getTime()
                    //exp: expiration
                }
                res.token = jwt.encode(payload, secret);
                next()
            }
            else res.status(403).send({message: 'Wrong user or password'})
        })
        .catch(error => {
            console.log(error)
            res.status(403).send({message: 'No user found'})
        })
    }
}

exports.hasApiKey = (req, res, next) => {
    if (!req.headers.apikey) {
        if (req.path === '/login' || req.path === '/login/passwordReset') {
            req.user = {role: '_none_'}
            next()
        }
        else return res.status(403).send({message: 'No auth'})
    } 
    else {
        var token = req.headers.apikey.replace(/['"]+/g, '')
        try {
            var payload = jwt.decode(token, secret);
            if(payload.exp > moment().unix()) {
                return res.status(401).send({
                    message: 'Expired session'
                });
            }
        } catch (ex) {
            return res.status(404).send({
                message: 'ApiKey no valid'
            });
        }
        req.user = payload
        next()
    }
}

exports.routePermission = (req, res, next) => {
    var payload = req.user
    if (payload.role === '_none_') {
        next()
    }
    else {
        var path = req.path
        var hasPermission = false
        var paramsKeys = Object.keys(req.params)
        if (paramsKeys.length > 0) {
            path += '/:' + paramsKeys.join('/:')
        }
        
        ModelRoles.findOne({name: payload.role, status: true}, 'permissions.'+req.method+'.'+path)
        .then((data) => {
            if (data.permissions !== undefined) {
                if (Object.keys(data.permissions).length > 0) 
                    hasPermission = true
            }
            if (hasPermission) next()
            else res.status(403).send({message: 'No access (db)'})
        })
        .catch(error => {
            console.log(error)
            res.status(403).send({message: 'No access (catch)'})
        })
    }
}
