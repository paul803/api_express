// ECMASCRIPT 6 FUNCTIONALITY
'use strict'

// Cargamos los módulos de express y body-parser
const express = require('express');
const bodyParser = require('body-parser');
// Llamamos a express para poder crear el servidor
const app = express();

// Importamos las rutas
const user_routes = require('./routes/user'); 
const customer_routes = require('./routes/customer');

//LOAD MIDDLEWARES
//un metodo que se ejecuta antes que llegue a un controlador
const md_auth = require('./middlewares/auth');

//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(md_auth.hasApiKey)

// LOAD ROUTES
app.use('/user', user_routes);
app.use('/customer', customer_routes);

// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;
