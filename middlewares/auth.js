'user strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const crypto = require('crypto');
const secret = 'this_is_sparta_666';

const ModelRoles = require('../models/role');
const ModelUsers = require('../models/user');


exports.makeAuth = (req, res, next) => {
    var username = req.body.username
    var password = crypto.createHmac('sha256', req.body.password)
    ModelUsers.findOne({username: username, password: password, status: true})
    .then(data => {
        console.log(data)
        var payload = {
            name: data.name 
        }
        var token = jwt.encode(payload, secret);
    })
    .catch(error => {
        console.log(error)
        res.status(403).send({message: 'No user found'})
    })
    
}

exports.hasApiKey = (req, res, next) => {
    if (!req.headers.apikey) {
        if (req.baseUrl === '/login' || req.baseUrl === '/passwordReset') {
            next()
        }
        return res.status(403).send({message: 'No auth'})
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
                message: 'No valid'
            });
        }
        req.user = payload
        next()
    }
}


exports.routePermission = (req, res, next) => {
    var hasPermission = false
    var baseUrl = req.baseUrl
    var paramsKeys = Object.keys(req.params)
    if (paramsKeys.length > 0) {
        baseUrl += '/:' + paramsKeys.join('/:')
    }
    var token = req.headers.apikey.replace(/['"]+/g, '')
    var payload = jwt.decode(token, secret)
    
    ModelRoles.findOne({name: payload.role, status: true}, 'permissions.'+req.method+'.'+baseUrl)
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
