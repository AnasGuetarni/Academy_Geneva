global.PORT = 8080;

/* Importation modules */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var fs = require('fs');
var helmet = require('helmet');
var colors = require('colors');

/* Supports encoded bodies and json encoded bodies */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

/* Importation des modules externes */
console.log("\nLoading custom modules:".yellow);
var db = require('./lib/db');
var dataAccess = require('./lib/dataAccess');
var routes = require('./lib/router');
var functions = require('./lib/functions');
var io_route = require('./lib/socket');

/* Server informations */
http.listen(global.PORT,function(){
    console.log(('\n' + "=== App Started on PORT " + global.PORT + " ===" + '\n').green);
});
