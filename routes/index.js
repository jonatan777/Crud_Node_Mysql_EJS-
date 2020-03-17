var express = require('express')
var app = express()

module.exports = (app) => {

const {index} = app.controllers;

app.get('/', index.index );


};

