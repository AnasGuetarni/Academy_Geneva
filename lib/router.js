/* List of the path of the application */

console.log('- router.js loaded'.yellow);

var fs = require('fs');
var functions = require('./functions');
var dataAccess = require('./dataAccess');
var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var formidable = require('formidable');
var path = require('path');

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
      functions.checkAdminPass(adminList, req.body.login, req.body.mdp, sess, function(logged){
        if (logged>=1) {
          res.redirect('/admin');
        }
        else {
          dataAccess.findAll('Professeur', function(profList){
            functions.checkProfPass(profList, req.body.login, req.body.mdp, sess, function(logged){
              if (logged>=1) {
                res.redirect('/professeur');
              }
              else {
                dataAccess.findAll('Eleve', function(eleveList){
                  functions.checkElevePass(eleveList, req.body.login, req.body.mdp, sess, function(logged){
                    if (logged>=1) {
                      res.redirect('/eleve');
                    }
                    else res.redirect('/?failed=true');
                })
              });
            };
          })
        });
      };
    });
  });
  });

  app.get('/admin', [functions.requireLogin], function(req, res){

    var event_list = [];

    dataAccess.findDataByLogin('Admin', 'PRENOM_ADMIN', req.session.login, function(absences){
      dataAccess.findAll('Document', function(documents){
        dataAccess.findDataClassesAdmin(function(classes){
          dataAccess.findDataEventsAdmin(function(events){

            for(var i in events){
              event_list.push({
                "title": events[i].TITRE_EVENT,
                "allday": events[i].ALLDAY_EVENT == 0 ? false : true,
                "borderColor": events[i].BORDERCOL_EVENT,
                "color": events[i].COLOR_EVENT,
                "textColor": events[i].TEXTCOL_EVENT,
                "description": events[i].DESCRIPTION_EVENT,
                "start": events[i].START_EVENT,
                "end": events[i].END_EVENT
              });
            }

            res.render('../view/admin.ejs', {
              title: 'Academy Geneva - Mon accueil',
              h_title: 'Mon accueil',
              lastname: functions.firstLetterToUpper(sess.login),
              absences: absences,
              documents: documents,
              events: event_list,
              classes: classes
            });
          });
        });
      });
    });
  });

  app.get('/eleve', [functions.requireLogin], function(req, res){

    var event_list = [];

    dataAccess.findDataAbsenceStudent(req.session.login, function(absences){
      dataAccess.findDataDocumentStudent(req.session.login, function(documents){
        dataAccess.findDataNoteStudent(req.session.login, function(notes){
          dataAccess.findDataEventsEleve(req.session.login, function(events){

            for(var i in events){
              event_list.push({
                "title": events[i].TITRE_EVENT,
                "allday": events[i].ALLDAY_EVENT == 0 ? false : true,
                "borderColor": events[i].BORDERCOL_EVENT,
                "color": events[i].COLOR_EVENT,
                "textColor": events[i].TEXTCOL_EVENT,
                "description": events[i].DESCRIPTION_EVENT,
                "start": events[i].START_EVENT,
                "end": events[i].END_EVENT
              });
            }

             res.render('../view/eleve.ejs', {
              title: 'Academy Geneva - Mon accueil',
              h_title: 'Mon accueil',
              lastname: functions.firstLetterToUpper(sess.login),
              absences: absences,
              documents: documents,
              notes: notes,
              events: event_list
              });
          });
        });
      });
    });
  });

  app.get('/professeur', [functions.requireLogin], function(req, res){

    var event_list = [];

    dataAccess.findDataAbsenceProf(req.session.login, function(absences){
      dataAccess.findDataDocumentProf(req.session.login, function(documents){
        dataAccess.findDataNoteProf(req.session.login, function(notes){
          dataAccess.findDataEventsProf(req.session.login, function(events){

            for(var i in events){
              event_list.push({
                "title": events[i].TITRE_EVENT,
                "allday": events[i].ALLDAY_EVENT == 0 ? false : true,
                "borderColor": events[i].BORDERCOL_EVENT,
                "color": events[i].COLOR_EVENT,
                "textColor": events[i].TEXTCOL_EVENT,
                "description": events[i].DESCRIPTION_EVENT,
                "start": events[i].START_EVENT,
                "end": events[i].END_EVENT
              });
            }

             res.render('../view/professeur.ejs', {
              title: 'Academy Geneva - Mon accueil',
              h_title: 'Mon accueil',
              lastname: functions.firstLetterToUpper(sess.login),
              absences: absences,
              documents: documents,
              notes: notes,
              events: event_list
          });
        });
       });
      });
    });
  });

  app.get('/matiere/:id', [functions.requireLogin], [functions.checkIdMatiere], function(req, res){
    var id_matiere = req.params.id;
    dataAccess.findDataMatiere(id_matiere, function(matiere){
      dataAccess.findDataAbsence(id_matiere, function(absences){
        res.render('../view/matiere.ejs', {
          title: 'Amphiquizz - Vue d\'ensemble de la matière',
          h_title: 'Matière',
          lastname: functions.firstLetterToUpper(sess.login),
          matiere: matiere,
          absences: absences
        });
      });
    });
  });

  app.get('/absence/:id', [functions.requireLogin], [functions.checkIdAbsence], function(req, res){
    var id_absence = req.params.id;
    dataAccess.findDataAbsenceUnique(id_absence, function(absences){
        res.render('../view/absence.ejs', {
          title: 'Amphiquizz - Vue d\'ensemble de l\'absence',
          h_title: 'Absence',
          lastname: functions.firstLetterToUpper(sess.login),
          absences: absences,
          id: id_absence
      });
    });
  });

  app.post('/absence/:id', [functions.requireLogin], [functions.checkIdAbsence], function(req, res){
    var id_absence = req.params.id;
    console.log('absence id: '+id_absence);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
       var old_path = files.file.path,
           file_size = files.file.size,
           file_ext = files.file.name.split('.').pop(),
           index = old_path.lastIndexOf('/') + 1,
           file_name = 'justificatif_absence_'+id_absence,
           new_path = path.join(process.env.PWD, 'justificatifs_/', file_name + '.' + file_ext);

       fs.readFile(old_path, function(err, data) {
           fs.writeFile(new_path, data, function(err) {
               fs.unlink(old_path, function(err) {
                   if (!err) {
                     dataAccess.findByFieldHasValue('Admin', 'PRENOM_ADMIN', req.session.login, function(result){
                       if (result.length != null && result.length != 0){
                         res.redirect('/admin');
                       }
                     });
                     dataAccess.findByFieldHasValue('Professeur', 'PRENOM_PROFESSEUR', req.session.login, function(result){
                       if (result.length != null && result.length != 0){
                         res.redirect('/professeur');
                       }
                     });

                     dataAccess.addDocument(file_name[0], file_ext, file_size/1000000, 1, function(result){});
                     dataAccess.updateAbsence(id_absence, function(result){});
                   } else res.redirect('/add_document/:id?failed=true');
               });
           });
       });
     });
  });

  app.get('/document/:id', [functions.requireLogin], [functions.checkIDDocument], function(req, res){
    var id_document = req.params.id;
    dataAccess.findByFieldHasValue('Document', 'IDENTIFIANT_DOCUMENT', id_document, function(document){
    res.download('documents_/' + document[0].NOM_DOCUMENT + '.' + document[0].EXT_DOCUMENT);
    });
  });

  app.get('/add_event/:startDate/:endDate', [functions.requireLogin], function(req, res){
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var event_list = [];

    dataAccess.findDataEventsAdmin(function(events){

      for(var i in events){
        event_list.push({
          "title": events[i].TITRE_EVENT,
          "allday": events[i].ALLDAY_EVENT == 0 ? false : true,
          "borderColor": events[i].BORDERCOL_EVENT,
          "color": events[i].COLOR_EVENT,
          "textColor": events[i].TEXTCOL_EVENT,
          "description": events[i].DESCRIPTION_EVENT,
          "start": events[i].START_EVENT,
          "end": events[i].END_EVENT
        });
      }

      res.render('../view/add_event.ejs', {
        title: 'Academy Geneva - Ajouter un evenement',
        h_title: 'Evenements',
        lastname: functions.firstLetterToUpper(sess.login),
        startDate: startDate,
        endDate: endDate,
        events: event_list
      });

    });
  });

  app.post('/add_event/:startDate/:endDate', function(req, res){
    console.log('post add_event');
    functions.checkEvent(req.body.title, req.body.matiere, req.body.description, req.params.startDate, req.params.endDate, function(errCode){
      if (errCode == 0) {
        dataAccess.findByFieldHasValue('Admin', 'PRENOM_ADMIN', req.session.login, function(result){
          if (result.length != null){
            res.redirect('/admin');
          }
        });
        dataAccess.findByFieldHasValue('Professeur', 'PRENOM_PROFESSEUR', req.session.login, function(result){
          if (result.length != null){
            res.redirect('/professeur');
          }
        });
      } else res.redirect('/add_event/:startDate/:endDate?failed='+errCode);
    })
  });

  app.get('/add_document', function(req, res){
    res.render('../view/add_document.ejs', {
      title: 'Academy Geneva - Ajouter un document',
      h_title: 'Documents',
      lastname: functions.firstLetterToUpper(req.session.login),
    });  });

  app.post('/add_document', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
       var old_path = files.file.path,
           file_size = files.file.size,
           file_ext = files.file.name.split('.').pop(),
           index = old_path.lastIndexOf('/') + 1,
           file_name = files.file.name.split(['.']),
           new_path = path.join(process.env.PWD, 'documents_/', file_name[0] + '.' + file_ext);

       fs.readFile(old_path, function(err, data) {
           fs.writeFile(new_path, data, function(err) {
               fs.unlink(old_path, function(err) {
                   if (!err) {
                     dataAccess.findByFieldHasValue('Admin', 'PRENOM_ADMIN', req.session.login, function(result){
                       if (result.length != null && result.length != 0){
                         res.redirect('/admin');
                       }
                     });
                     dataAccess.findByFieldHasValue('Professeur', 'PRENOM_PROFESSEUR', req.session.login, function(result){
                       if (result.length != null && result.length != 0){
                         res.redirect('/professeur');
                       }
                     });

                     dataAccess.addDocument(file_name[0], file_ext, file_size/1000000, 1, function(result){});
                   } else res.redirect('/add_document?failed');
               });
           });
       });
     });
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
