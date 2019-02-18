/* Connection to the database MySql */

var mysql = require('mysql');

var db = mysql.createConnection({
		    host     : 'localhost',
		    user     : 'root',
		    password : 'admin',
		    database : 'AcademyGeneva',
		});

db.connect(function(err) {
  if (err) throw err
  console.log('-> db.js loaded'.yellow);
});

module.exports = db;
