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
const login_route = require('./routes/login'); 
const user_route = require('./routes/users'); 
const customer_route = require('./routes/customers');
const product_route = require('./routes/products');
const role_route = require('./routes/roles');
const permission_route = require('./routes/permissions');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 3 * 1024 * 1024 * 1024 //3MB max file(s) size
    },
}));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//LOAD ROUTES
app.use('/login', login_route);
app.use('/users', user_route);
app.use('/customers', customer_route);
app.use('/products', product_route);
app.use('/roles', role_route);
app.use('/permissions', permission_route);

//EXPORT MODULE APP
module.exports = app;
