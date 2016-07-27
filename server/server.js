#!/usr/bin/env node
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
/**
 * Module dependencies.
 */
const app = express();
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/router')(app, passport);

mongoose.connect('mongodb://localhost/reviewzup');
/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Insert user on port' + port);

module.exports = app;
