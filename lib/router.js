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
          res.redirect('./admin');
        }
        else {
          dataAccess.findAll('Professeur', function(profList){
            functions.checkProfPass(profList, req.body.login, req.body.mdp, sess, function(logged){
              if (logged>=1) {
                res.redirect('./professeur');
              }
              else {
                dataAccess.findAll('Eleve', function(eleveList){
                  functions.checkElevePass(eleveList, req.body.login, req.body.mdp, sess, function(logged){
                    if (logged>=1) {
                      res.redirect('/eleve');
                    }
                    else res.redirect('./?failed=true');
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
            dataAccess.findAll('Eleve', function(students){
              dataAccess.find_data_absences(function(absences_top){
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

                res.render('../view/home.ejs', {
                  title: 'Academy Geneva - Mon accueil',
                  h_title: 'Mon accueil',
                  login: functions.firstLetterToUpper(sess.login),
                  absences: absences,
                  documents: documents,
                  events: event_list,
                  classes: classes,
                  students: students,
                  absences_top: absences_top
                });
              });
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
              title: 'Eleve',
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

            res.render('../view/professeur.ejs', {
              title: 'Academy Geneva - Mon accueil',
              h_title: 'Professeur',
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

  // app.get('/matiere/:id', [functions.requireLogin], [functions.checkIdMatiere], function(req, res){
  //   var id_matiere = req.params.id;
  //   var type_login = "";
  //
  //   dataAccess.findAll('Admin', function(adminList){
  //     functions.checkAdminPass(adminList, req.session.login, req.session.mdp, sess, function(logged){
  //       if (logged>=1) {
  //         type_login = "admin";
  //       }
  //       else {
  //         dataAccess.findAll('Professeur', function(profList){
  //           functions.checkProfPass(profList, req.session.login, req.session.mdp, sess, function(logged){
  //             if (logged>=1) {
  //               type_login = "professeur";
  //             }
  //             else {
  //               dataAccess.findAll('Eleve', function(eleveList){
  //                 functions.checkElevePass(eleveList, req.session.login, req.session.mdp, sess, function(logged){
  //                   if (logged>=1) {
  //                     type_login = "eleve";
  //                   }
  //                 })
  //               });
  //             };
  //           })
  //         });
  //       };
  //     });
  //   });
  //   setTimeout(function(){
  //     dataAccess.findDataMatiere(id_matiere, function(matiere){
  //       dataAccess.findDataAbsence(id_matiere, function(absences){
  //         res.render('../view/matiere.ejs', {
  //           title: 'Amphiquizz - Vue d\'ensemble de la matière',
  //           h_title: 'Matière',
  //           lastname: functions.firstLetterToUpper(sess.login),
  //           matiere: matiere,
  //           absences: absences,
  //           log: type_login
  //         });
  //       });
  //     });
  // }, 1000);
  // });

  app.get('/absence/:id', [functions.requireLogin], [functions.checkIdAbsence], function(req, res){
    var id_absence = req.params.id;
    var type_login = "";

    dataAccess.findAll('Admin', function(adminList){
      functions.checkAdminPass(adminList, req.session.login, req.session.mdp, sess, function(logged){
        if (logged>=1) {
          type_login = "admin";
        }
        else {
          dataAccess.findAll('Professeur', function(profList){
            functions.checkProfPass(profList, req.session.login, req.session.mdp, sess, function(logged){
              if (logged>=1) {
                type_login = "professeur";
              }
              else {
                dataAccess.findAll('Eleve', function(eleveList){
                  functions.checkElevePass(eleveList, req.session.login, req.session.mdp, sess, function(logged){
                    if (logged>=1) {
                      type_login = "eleve";
                    }
                  })
                });
              };
            })
          });
        };
      });
    });

    setTimeout(function(){
      dataAccess.findDataAbsenceUnique(id_absence, function(absences){
          res.render('../view/absence.ejs', {
            title: 'Amphiquizz - Vue d\'ensemble de l\'absence',
            h_title: 'Absence',
            lastname: functions.firstLetterToUpper(sess.login),
            absences: absences,
            id: id_absence,
            log: type_login
        });
      });
     }, 1000);
  });

  app.post('/absence/:id', [functions.requireLogin], [functions.checkIdAbsence], function(req, res){
    var id_absence = req.params.id;
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
                         res.redirect('./admin');
                       }
                     });
                     dataAccess.findByFieldHasValue('Professeur', 'PRENOM_PROFESSEUR', req.session.login, function(result){
                       if (result.length != null && result.length != 0){
                         res.redirect('./professeur');
                       }
                     });

                     dataAccess.addDocument(file_name[0], file_ext, file_size/1000000, 1, function(result){});
                     dataAccess.updateAbsence(id_absence, function(result){});
                   } else res.redirect('./absence/:id?failed=true');
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
    var type_login = "";

    dataAccess.findAll('Admin', function(adminList){
      functions.checkAdminPass(adminList, req.session.login, req.session.mdp, sess, function(logged){
        if (logged>=1) {
          type_login = "admin";
        }
        else {
          dataAccess.findAll('Professeur', function(profList){
            functions.checkProfPass(profList, req.session.login, req.session.mdp, sess, function(logged){
              if (logged>=1) {
                type_login = "professeur";
              }
              else {
                dataAccess.findAll('Eleve', function(eleveList){
                  functions.checkElevePass(eleveList, req.session.login, req.session.mdp, sess, function(logged){
                    if (logged>=1) {
                      type_login = "eleve";
                    }
                  })
                });
              };
            })
          });
        };
      });
    });

    setTimeout(function(){

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
        events: event_list,
        log: type_login
      });

    });
  }, 1000);
  });

  app.post('/add_event/:startDate/:endDate', function(req, res){
    functions.checkEvent(req.body.title, req.body.matiere, req.body.description, req.params.startDate, req.params.endDate, function(errCode){
      if (errCode == 0) {
        dataAccess.findByFieldHasValue('Admin', 'PRENOM_ADMIN', req.session.login, function(result){
          if (result.length != null && result.length != 0){
            res.redirect('./admin');
          }
        });
        dataAccess.findByFieldHasValue('Professeur', 'PRENOM_PROFESSEUR', req.session.login, function(result){
          if (result.length != null && result.length != 0){
            res.redirect('./professeur');
          }
        });
      } else res.redirect('./add_event/:startDate/:endDate?failed='+errCode);
    })
  });

  app.get('/formations', [functions.requireLogin], function(req,res){
    dataAccess.find_students_formations(function(formations){
      res.render('../view/formations.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Formations',
        formations: formations
      });
    });
  });

  app.get('/add_formation', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Eleve', function(students){
      dataAccess.findAll('Matiere', function(formations){
        res.render('../view/add_formation.ejs', {
          login: functions.firstLetterToUpper(sess.login),
          title: 'AcademyGeneva',
          h_title: 'Ajouter une formation',
          students: students,
          formations: formations
        });
      });
    });
  });

  app.post('/add_formation', [functions.requireLogin], function(req,res){
    functions.check_formation(req.body.result_nom, function(result){
      if (result){
        dataAccess.find_students_formations(function(formations){
          res.render('../view/formations.ejs', {
            login: functions.firstLetterToUpper(sess.login),
            title: 'AcademyGeneva',
            h_title: 'Formations',
            formations: formations
          });
        });
      }
    });
  });

  app.get('/matiere/:id', [functions.requireLogin], function(req,res){
    dataAccess.find_students_matiere(req.params.id, function(students){
      res.render('../view/matiere.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Formations',
        students: students,
        id: req.params.id
      });
    });
  });


  app.get('/add_matiere', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Formation', function(formations){
      res.render('../view/add_matiere.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Ajouter une matière',
        formations: formations
      });
    });
  });

  app.post('/add_matiere', [functions.requireLogin], function(req,res){
    functions.check_matiere(req.body.result_nom_matiere, req.body.result_formation, function(result){
      if (result){
        dataAccess.find_students_formations(function(formations){
          res.render('../view/formations.ejs', {
            login: functions.firstLetterToUpper(sess.login),
            title: 'AcademyGeneva',
            h_title: 'Formations',
            formations: formations
          });
        });
      }
    });
  });

  app.get('/student/:id', [functions.requireLogin], function(req,res){
    dataAccess.find_student_by_id(req.params.id, function(students){
      res.render('../view/student.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Eleves',
        students: students,
        id: req.params.id
      });
    });
  });

  app.get('/add_student', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Formation', function(formations){
      dataAccess.findAll('Matiere', function(matieres){
        res.render('../view/add_eleve.ejs', {
          login: functions.firstLetterToUpper(sess.login),
          title: 'AcademyGeneva',
          h_title: 'Ajouter un élève',
          formations: formations,
          matieres: matieres
        });
      });
    });
  });

  app.post('/add_student', [functions.requireLogin], function(req,res){
    functions.check_student(req.body.result_nom, req.body.result_prenom, req.body.result_formation, function(result){
      if (result){
        app.get('/formations', [functions.requireLogin], function(req,res){
          dataAccess.find_students_formations(function(formations){
            res.render('../view/formations.ejs', {
              login: functions.firstLetterToUpper(sess.login),
              title: 'AcademyGeneva',
              h_title: 'Formations',
              formations: formations
            });
          });
        });
      }
    });
  });

  app.get('/formations/:id', [functions.requireLogin], function(req,res){
    dataAccess.find_matiere_by_formation(req.params.id, function(matieres){
      dataAccess.find_infos_formation(req.params.id, function(professeurs){
        dataAccess.find_student_in_formation(req.params.id, function(students){
          res.render('../view/formation_view.ejs', {
            login: functions.firstLetterToUpper(sess.login),
            title: 'AcademyGeneva',
            h_title: 'Formations',
            matieres: matieres,
            professeurs: professeurs,
            students: students,
            id: req.params.id
          });
        });
      });
    });
  });

  app.get('/absences', [functions.requireLogin], function(req,res){
    dataAccess.find_students_absences(function(absences){
      res.render('../view/absences.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Absences',
        absences: absences
      });
    });
  });

  app.get('/notes', [functions.requireLogin], function(req,res){
    dataAccess.find_notes_admin(function(notes){
      dataAccess.findAll('Matiere', function(formations){
        res.render('../view/notes.ejs', {
          login: functions.firstLetterToUpper(sess.login),
          title: 'AcademyGeneva',
          h_title: 'Notes',
          notes: notes,
          formations: formations
        });
      })
    });
  });

  app.get('/documents', [functions.requireLogin], function(req,res){
    dataAccess.find_documents(function(documents){
      res.render('../view/documents.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Documents',
        documents: documents
      });
    });
  });

  app.get('/settings', [functions.requireLogin], function(req,res){
    dataAccess.find_username_informations_admin(sess.login, function(user){
      res.render('../view/settings.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Settings',
        user: user
      });
    });
  });

  app.post('/search', [functions.requireLogin], function(req,res){
    dataAccess.find_search(req.body.result, function(students){
      res.render('../view/search.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Search',
        sess: sess,
        students: students
      });
    });
  });

  app.get('/appel', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Eleve', function(students){
      res.render('../view/appel.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Appel',
        students: students
      });
    });
  });

  app.get('/add_absence', [functions.requireLogin], function(req,res){
    var type_absences = ['Retard', 'Absence', 'Arrivé à la période'];
    dataAccess.findAll('Eleve', function(students){
      dataAccess.findAll('Matiere', function(formations){
        res.render('../view/add_absence.ejs', {
          login: functions.firstLetterToUpper(sess.login),
          title: 'AcademyGeneva',
          h_title: 'Ajouter une absence',
          students: students,
          formations: formations,
          type_absences: type_absences
        });
      });
    });
  });

  app.post('/add_absence', [functions.requireLogin], function(req,res){
    functions.check_absence(req.body.result_student, req.body.result_absence, req.body.result_formation, function(result){
      if (result){
        dataAccess.find_students_absences(function(absences){
          res.render('../view/absences.ejs', {
            login: functions.firstLetterToUpper(sess.login),
            title: 'AcademyGeneva',
            h_title: 'Absences',
            absences: absences
          });
        });
      }
    });
  });

  app.get('/add_note', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Eleve', function(students){
      dataAccess.findAll('Matiere', function(formations){
        res.render('../view/add_note.ejs', {
          login: functions.firstLetterToUpper(sess.login),
          title: 'AcademyGeneva',
          h_title: 'Ajouter une absence',
          students: students,
          formations: formations
        });
      });
    });
  });

  app.post('/add_note', [functions.requireLogin], function(req,res){
    functions.check_note(req.body.result_student, req.body.result_note, req.body.result_formation, function(result){
      if (result){
        dataAccess.find_notes_admin(function(notes){
          dataAccess.findAll('Matiere', function(formations){
            res.render('../view/notes.ejs', {
              login: functions.firstLetterToUpper(sess.login),
              title: 'AcademyGeneva',
              h_title: 'Notes',
              notes: notes,
              formations: formations
            });
          })
        });
      }
    });
  });

  app.get('/add_justificatif/:id', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Absence', function(absences){
      res.render('../view/add_justificatif.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Ajouter un justificatif',
        absences: absences,
        id: req.params.id
      });
    });
  });

  app.post('/add_justificatif/:id', [functions.requireLogin], function(req,res){
    let id_absence = req.params.id;
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
       let old_path = files.file.path,
           file_size = files.file.size,
           file_ext = files.file.name.split('.').pop(),
           index = old_path.lastIndexOf('/') + 1,
           file_name = 'justificatif_absence_'+id_absence,
           new_path = path.join(process.env.PWD, 'justificatifs_/', file_name + '.' + file_ext);

       fs.readFile(old_path, function(err, data) {
           fs.writeFile(new_path, data, function(err) {
               fs.unlink(old_path, function(err) {
                   if (!err) {
                     dataAccess.find_matiere_by_id_absence(req.params.id, function(res){
                       dataAccess.addDocument(file_name, file_ext, file_size/1000000, res.IDENTIFIANT_MATIERE, function(result){});
                       dataAccess.updateAbsence(id_absence, function(result){});
                     });
                     dataAccess.find_students_absences(function(absences){
                       res.redirect('./absences');
                     });


                   } else res.redirect('./add_justificatif/:id?failed=true');
               });
           });
       });
     });
  });

  app.get('/add_document', [functions.requireLogin], function(req,res){
    dataAccess.findAll('Matiere', function(formations){
      res.render('../view/add_document.ejs', {
        login: functions.firstLetterToUpper(sess.login),
        title: 'AcademyGeneva',
        h_title: 'Ajouter un document',
        formations: formations
      });
    });
  });

  app.post('/add_document', [functions.requireLogin], function(req,res){
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
       let old_path = files.file.path,
           file_size = files.file.size,
           file_ext = files.file.name.split('.').pop(),
           index = old_path.lastIndexOf('/') + 1,
           file_name = "doc",
           new_path = path.join(process.env.PWD, 'documents_', file_name + '.' + file_ext);

       fs.readFile(old_path, function(err, data) {
           fs.writeFile(new_path, data, function(err) {
               fs.unlink(old_path, function(err) {
                   if (!err) {
                     dataAccess.find_id_by_name_formation(req.params.result_formation, function(res){
                       dataAccess.addDocument(file_name, file_ext, file_size/1000000, res.IDENTIFIANT_MATIERE, function(result){});
                     });
                     dataAccess.find_documents(function(documents){
                       res.render('../view/documents.ejs', {
                         login: functions.firstLetterToUpper(sess.login),
                         title: 'AcademyGeneva',
                         h_title: 'Documents',
                         documents: documents
                       });
                     });


                   } else res.redirect('./add_document?failed=true');
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
