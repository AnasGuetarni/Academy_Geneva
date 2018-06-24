/* Functions of requests on the database */

var mysql = require('mysql');
var db = require('./db');

/**
Module who will permit to create the functions for the requests on the DataBase
**/
module.exports = {

  /*
  Function who give us all the data of a table
  @params table: table given for the informations
  @return callback: Array of the informations of the table
  */
  findAll: function(table, callback){
    var list = new Array();
    var queryString = 'SELECT * FROM ' + table;

    db.query(queryString, function(err, rows){
      if (err)
        throw err;
      for(var i in rows)
        list.push(rows[i]);
      callback(list);
    });
  },

}

console.log('DataAccess --> loaded'.yellow);
