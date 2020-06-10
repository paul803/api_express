// ECMASCRIPT 6 FUNCTIONALITY
'use strict'

//LOAD express AND body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//ROUTES
const login_routes = require('./routes/login'); 
const user_routes = require('./routes/user'); 
const customer_routes = require('./routes/customer');
const product_routes = require('./routes/product');
const role_routes = require('./routes/role');

//LOAD MIDDLEWARES
const md_auth = require('./middlewares/auth');

//bodyParser, CONVERT BODY TO JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(md_auth.hasApiKey)
app.use(md_auth.routePermission);

//LOAD ROUTES
app.use('/login', login_routes);
app.use('/user', user_routes);
app.use('/customer', customer_routes);
app.use('/product', product_routes);
app.use('/role', role_routes);

//EXPORT MODULE APP
module.exports = app;
