/* List of the path of the application */

var fs = require('fs');
var functions = require('./functions');
var dataAccess = require('./dataAccess');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.get('/', [functions.notLogged], function(req, res, next) {
    var erreur = false;
    if (req.query.failed)
      erreur = true;
      res.render('../view/login.ejs', {
        title: 'Amphiquizz - Connexion',
        erreur: erreur,
        newAcc: req.query.newAcc
      });
  });

}
