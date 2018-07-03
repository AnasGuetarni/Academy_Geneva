/* Connection to the database MySql */

var mysql = require('mysql');

var db = mysql.createConnection({
		    host     : 'localhost',
		    user     : 'root',
		    password : 'root',
		    database : 'AcademyGeneva',
		});

module.exports = db;

console.log('- db.js loaded'.yellow);
