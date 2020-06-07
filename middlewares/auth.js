'user strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'this_is_sparta_666';

const ModelRoles = require('../models/role');


exports.makeAuth = (req, res, next) => {

}

exports.hasApiKey = (req, res, next) => {
    if (!req.headers.apikey){
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
        req.user = payload;
        next();
    }
}


exports.routePermission = (req, res, next) => {
    var hasPermission = false;
    var baseUrl = req.baseUrl
    var paramsKeys = Object.keys(req.params)
    if (paramsKeys.length > 0) {
        baseUrl += '/:' + paramsKeys.join('/:');
    }
    var token = req.headers.apikey.replace(/['"]+/g, '')
    var payload = jwt.decode(token, secret);
    
    ModelRoles.find({name: payload.role, status: true}) //, "permissions.GET": {'/user': true}
    .then((data) => {
        if (data[0].permissions !== undefined) {
            if (data[0].permissions[req.method][baseUrl] !== undefined) {
                hasPermission = data[0].permissions[req.method][baseUrl];
            }
        }
        if (hasPermission) next()
        else res.status(403).send({message: 'No access (db)'})
    })
    .catch(error => {
        console.log(error)
        res.status(403).send({message: 'No access (catch)'})
    })
}