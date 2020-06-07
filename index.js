// ECMASCRIPT 6 FUNCTIONALITY
'use strict'

//MONGOOSE, FOR MONGODB
const mongoose = require('mongoose');
//const path = require('path');
// LOAD app.js WITH EXPRESS
const app = require('./app');
//SERVER PORT
const port = 3000;

const databaseName = 'test'
// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;

const mongoParams = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}

//DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/'+databaseName, mongoParams)
    .then(() => {
        console.log("Database connected: '"+databaseName+"'")
    
        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(port, () => {
            console.log("Server running, http://localhost:"+port);
        });
    })
    .catch(err => console.log(err));

//const db = mongoose.connection;