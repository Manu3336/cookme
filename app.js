const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');

// //Load API Routers
const commonRouters = require('@routerspath');

const keys = require('./config/keys');


app.use(morgan('dev')); // for logging
//To pass body data
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//To prevent CORS Errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // to avaoid access of apis by other web pages
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});


mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        console.log(chalk.bold.blue('connected'));
    })
    .catch(err => {
        console.log(chalk.bold.yellow('App starting error:', err));
    });


mongoose.Promise = global.Promise;


app.use('/', commonRouters);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;