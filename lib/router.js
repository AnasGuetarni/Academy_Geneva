/* List of the path of the application */

console.log('- router.js loaded'.yellow);

var fs = require('fs');
var functions = require('./functions');
var dataAccess = require('./dataAccess');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app){
console.log('In routeur.js');
  app.get('/', [functions.notLogged], function(req, res, next) {
    console.log("Getting first page");
    var erreur = false;
    if (req.query.failed)
      erreur = true;
      res.render('../view/login.ejs', {
        title: 'Academy Geneva - Connexion',
        erreur: erreur,
        newAcc: req.query.newAcc
      });
  });

  app.post('/login', function(req, res){
    var sess = req.session;
    dataAccess.findAll('Admin', function(profList){
      functions.checkUserPass(profList, req.body.login, req.body.mdp, sess, function(logged){
        if (logged>=1) res.redirect('/admin');
        else res.redirect('/?failed=true');
      });
    });
  });

  app.get('/admin', [functions.requireLogin], function(req, res){
    dataAccess.findQuestionnaireByIdProf(sess.id_professeur, function(data){
        res.render('../view/admin.ejs', {
          title: 'Academy Geneva - Mon accueil',
          h_title: 'Mon accueil',
          lastname: sess.nom,
          firstname: sess.prenom,
          data: data
        });
      });
  });

  app.use(function(req, res){
    res.render('../view/404error.ejs', { title: 'Academy Geneva - Impossible de trouver la page demandée' });
  });

}
