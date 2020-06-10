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

//MONGOOSE PROMISE CONNECTION
mongoose.Promise = global.Promise;

const mongoParams = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}

//const uriDB = 'mongodb://localhost:27017/' + databaseName
const uriDB = 'mongodb+srv://user_mongo:dx5gxWfLfJoc3IBX@cluster0-knpj2.gcp.mongodb.net/'+databaseName+'?retryWrites=true&w=majority'

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
