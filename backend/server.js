const dotenv = require("dotenv").config()
const express = require('express');
const cors = require("cors");
const connectdb = require("./app/config/database.config")
const mongoose = require('mongoose');
const session = require('express-session')
const logger = require('morgan');

const bodyParser = require('body-parser');

// create express app
const app = express();
var corsOptions = {
    origin: process.env.CORSURL || "http://localhost:4200"
};
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

app.use(cors(corsOptions));
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = process.env.MONGO_URI;
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Second Hand application. Organize and keep track of all your products." });
});

require('./app/models/');
require('./app/config/passport');

app.use(require("./app/routes"));

// listen for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});