// ECMASCRIPT 6 FUNCTIONALITY
'use strict'

//MONGOOSE, FOR MONGODB
const mongoose = require('mongoose');
require('dotenv').config()

const app = require('./app');

const env = process.env.NODE_ENV
const port = process.env.PORT
const databaseName = process.env.DB_DATABASE

//MONGOOSE PROMISE CONNECTION
mongoose.Promise = global.Promise;

const mongoParams = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}

let uriDB = 'mongodb://localhost:27017/' + databaseName
if (env === 'dev') {
  var user_pasw = process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD
  uriDB = process.env.DB_HOST1 + user_pasw + process.env.DB_HOST2 + databaseName + process.env.DB_HOST3
}

//DATABASE CONNECTION
mongoose.connect(uriDB, mongoParams)
.then(() => {
    console.log("Database connected: '"+databaseName+"'")

    // CREATE WEB SERVER
    app.listen(port, () => {
        console.log("Server running, http://localhost:"+port);
    });
})
.catch(err => console.log(err));
