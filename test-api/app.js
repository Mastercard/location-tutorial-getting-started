var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var locationRouter = require('./routes/locations'); //aded: load locations.js code
var placesRouter = require('./routes/places'); //aded: load places.js code

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locations', locationRouter);  //added: map locations-related requests
app.use('/places', placesRouter);  //added: map places-related requests

module.exports = app;
