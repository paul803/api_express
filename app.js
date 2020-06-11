// ECMASCRIPT 6 FUNCTIONALITY
'use strict'

//LOAD express AND body-parser
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const _ = require('lodash');
//ROUTES
const login_routes = require('./routes/login'); 
const user_routes = require('./routes/users'); 
const customer_routes = require('./routes/customers');
const product_routes = require('./routes/products');
const role_routes = require('./routes/roles');

const app = express();




// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//LOAD MIDDLEWARES
const md_auth = require('./middlewares/auth');

app.use(md_auth.hasApiKey)
app.use(md_auth.routePermission);

//LOAD ROUTES
app.use('/login', login_routes);
app.use('/users', user_routes);
app.use('/customers', customer_routes);
app.use('/products', product_routes);
app.use('/roles', role_routes);

//EXPORT MODULE APP
module.exports = app;
