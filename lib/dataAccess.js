/* Functions of requests on the database */

console.log('- dataAccess.js loaded'.yellow);

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
    console.log('Request: '.blue, queryString);
    db.query(queryString, function(err, rows){
      if (err)
        throw err;
      for(var i in rows)
        list.push(rows[i]);
      callback(list);
    });
  },

  del: function(table, field, value, callback){
    var queryString = "DELETE FROM " + table + " WHERE " + field + "=?";
    db.query(queryString, [value], function(err,rows){
      if(err) throw err;
      callback();
    });
  },

  // PARAMETRE: table: table de la base ou l'on cherche
  // 			  fieldname: Champs de la table ou l'on fait le where
  // 			  value: Valeur que l'on recherche
  findByFieldHasValue: function(table, fieldname, value, callback){
    var list = new Array();
    var queryString = 'SELECT * FROM ' + table + ' WHERE ' + fieldname + '=?';
    db.query(queryString, [value], function(err,rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

}
