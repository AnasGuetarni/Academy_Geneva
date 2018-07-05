/* List of the path of the application */

console.log('- router.js loaded'.yellow);

var fs = require('fs');
var functions = require('./functions');
var dataAccess = require('./dataAccess');
var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.get('/', function(req, res, next) {
    var erreur = false;
    if (req.query.failed)
      erreur = true;
      res.render('../view/login.ejs', {
        title: 'Academy Geneva - Connexion',
        erreur: erreur,
      });
  });

  app.post('/login', function(req, res){
    var sess = req.session;
    dataAccess.findAll('Admin', function(adminList){
      functions.checkUserPass(adminList, req.body.login, req.body.mdp, sess, function(logged){
        if (logged>=1) {
          res.redirect('/admin');
        }
        else res.redirect('/?failed=true');
      });
    });
  });

  app.get('/admin', [functions.requireLogin], function(req, res){
    dataAccess.findByFieldHasValue('Admin', 'PRENOM_ADMIN', req.session.login, function(data){
      res.render('../view/admin.ejs', {
        title: 'Academy Geneva - Mon accueil',
        h_title: 'Mon accueil',
        lastname: functions.firstLetterToUpper(data[0].NOM_ADMIN),
        firstname: functions.firstLetterToUpper(data[0].PRENOM_ADMIN)
        //data: data
      });
    });
    //dataAccess.findQuestionnaireByIdProf(sess.id_professeur, function(data){
      //});
  });

  app.get('/logout',function(req,res){
    req.session.destroy(function() {
      res.redirect("/");
    });
  });

  app.use(function(req, res){
    res.render('../view/404error', { title: 'Academy Geneva - Impossible de trouver la page demandee' });
  });


}
