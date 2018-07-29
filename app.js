global.PORT = 5250;

/* Importation modules */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var helmet = require('helmet');
var colors = require('colors');
var calendar = require('node-calendar');

/* Supports encoded bodies and json encoded bodies */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

var expiryDate = new Date(Date.now() + 60 * 60 * 1000 );
var dateNow = new Date(Date.now());


app.use(session({
	secret: 'u9fdsS4d.#Zd8a/4J*',
	name : 'sesSionId478',
	cookie: { secure: false, httpOnly: true, expires: expiryDate },
	resave: false,
	saveUninitialized: true,
}));

var cal = new calendar.Calendar(calendar.SUNDAY);
var yearCalendar = cal.yeardayscalendar(2004);


/* Importation des modules externes */
console.log("\nLoading custom modules:".blue);
var db = require('./lib/db');
var dataAccess = require('./lib/dataAccess');
var routes = require('./lib/router')(app);
var functions = require('./lib/functions');
var io_route = require('./lib/socket')(http);


/* Server informations */
http.listen(global.PORT,function(){
    console.log(('\n' + "=== App Started on PORT " + global.PORT + " at " + dateNow + " ===" + '\n').green);
});
