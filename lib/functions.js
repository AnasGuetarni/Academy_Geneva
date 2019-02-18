// functions.js

console.log('- functions.js loaded'.yellow);

var crypto = require('crypto');
var db = require('./db');
var dataAccess = require('./dataAccess');
var moment = require('moment');

var border_colors_events = {
	"ETUDES DE COMMERCE": "#5173DA"
}

var colors_events = {
	"ETUDES DE COMMERCE": "#99ABEA"
}

var text_colors_events = {
	"ETUDES DE COMMERCE": "#000000"
}



module.exports = {

	firstLetterToUpper: function(str){
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	/** Middleware for limited access and admin interface */
	requireLogin: function(req, res, next) {
		sess=req.session;
		if (sess.login) {
			next();
		} else {
			res.redirect("/");
		}
	},

	checkAdminPass: function (adminList, username, password, sess, callback){
		var logged = 0;
		for(var k in adminList){
			if (username==adminList[k].PRENOM_ADMIN){
				if (password == adminList[k].PASSWORD_ADMIN){
						//if (crypto.createHash('md5').update(password).digest("hex")==profList[k].PASSWORD_ADMIN)
					//{
					logged++;
					sess.login = adminList[k].PRENOM_ADMIN;
					sess.mdp = adminList[k].PASSWORD_ADMIN;
				}
			}
		}
		callback(logged);
		},

		checkProfPass: function (profList, username, password, sess, callback){
			var logged = 0;
			for(var k in profList){
				if (username==profList[k].PRENOM_PROFESSEUR){
					if (password == profList[k].PASSWORD_PROFESSEUR){
							//if (crypto.createHash('md5').update(password).digest("hex")==profList[k].PASSWORD_ADMIN)
						//{
						logged++;
						sess.login = profList[k].PRENOM_PROFESSEUR;
						sess.mdp = profList[k].PASSWORD_PROFESSEUR;
					}
				}
			}
			callback(logged);
			},

			checkElevePass: function (eleveList, username, password, sess, callback){
				var logged = 0;
				for(var k in eleveList){
					if (username==eleveList[k].PRENOM_ELEVE){
						if (password == eleveList[k].PASSWORD_ELEVE){
								//if (crypto.createHash('md5').update(password).digest("hex")==profList[k].PASSWORD_ADMIN)
							//{
							logged++;
							sess.login = eleveList[k].PRENOM_ELEVE;
							sess.mdp = eleveList[k].PASSWORD_ELEVE;
						}
					}
				}
				callback(logged);
				},

		/** Middleware check session exist */
		notLogged: function(req, res, next){
			var sess = req.body;
			if(sess.login != null){
				res.redirect('/admin');
			} else {
				next();
			}
		},

		/** Middleware for security (each user can only see his questionnary */
		checkIdMatiere: function(req, res, next){
			var queryString = 'SELECT * FROM Matiere WHERE IDENTIFIANT_MATIERE=?';
			db.query(queryString, [req.params.id], function(err,rows){
				if(rows != null && rows.length!=0){
					next();
				} else {
					res.redirect("../view/404error");
				}
			});
		},

		/** Middleware for security (each user can only see his questionnary */
		checkIdAbsence: function(req, res, next){
			var queryString = 'SELECT * FROM Absence WHERE IDENTIFIANT_ABSENCE=?';
			db.query(queryString, [req.params.id], function(err,rows){
				if(rows != null && rows.length!=0){
					next();
				} else {
					res.redirect("../view/404error");
				}
			});
		},

		/** Middleware for security (each user can only see his questionnary */
		checkIDDocument: function(req, res, next){
			var queryString = 'SELECT * FROM Document WHERE IDENTIFIANT_DOCUMENT=?';
			db.query(queryString, [req.params.id], function(err,rows){
				if(rows != null && rows.length!=0){
					next();
				} else {
					res.redirect("../view/404error");
				}
			});
		},

		checkEvent: function(titre, matiere, description, startDate, endDate, callback){
			var border_color, color, text_color;

			if (titre != null && titre.length >=1 && titre.length <= 45){
				if (matiere != null && matiere.length >=1 && matiere.length <= 45){
					if (description != null && description.length >= 1 && description.length <= 200){
						if (startDate != null && endDate != null){
							dataAccess.findByFieldHasValue('Matiere', 'NOM_MATIERE', matiere, function(matieres_list){
								dataAccess.addEvent(titre, border_colors_events[matiere], colors_events[matiere], text_colors_events[matiere], description, startDate, endDate, matieres_list[0].IDENTIFIANT_MATIERE, function(result){
									callback(0);
								});
							});
						}
					}
				}
			}

		},

		check_absence: function(student, absence, formation, callback){
			var fields = student.split(' ');
			if (student != undefined && absence != undefined && formation != undefined) {
				dataAccess.find_id_by_name_student(fields[0], function(id_student){
					dataAccess.find_id_by_name_formation(formation, function(id_formation){
						dataAccess.add_absence(id_student.IDENTIFIANT_ELEVE, absence, id_formation.IDENTIFIANT_MATIERE,function(result){ if (result) callback(1); else callback(0);});
					});
				});
			}
			else callback(0);
		},

		check_formation: function(nom, callback){
			let count = 0;
			if (nom != undefined) {
				dataAccess.findAll('Formation', function(formations){
					for (let i in formations){
						if (formations[i].nom_formation == nom){
							count++;
						}
					}
				});
					if (count == 0)
						dataAccess.add_formation(nom, function(result){ if (result) callback(1); else callback(0);});
			}
			else callback(0);
		},

		check_matiere: function(matiere, formation, callback){
			var count = 0;
			var id_formation;
			if (matiere != undefined && formation != undefined) {
				dataAccess.findAll('Matiere', function(formations){
					for (let i in formations){
						if (formations[i].NOM_MATIERE == matiere){
							count++;
						}
					}
					dataAccess.findAll('Formation', function(res){
						for (let i in res){
							if (res[i].nom_formation == formation) {
								id_formation = res[i].id_formation;
								if (count == 0)
								dataAccess.add_matiere(matiere, id_formation, function(result){ if (result) callback(1); else callback(0);});
							}
						}
					});
				});
			}
			else callback(0);
		},

		check_student: function(nom, prenom, formation, callback){
			if (nom != undefined && prenom != undefined && formation != undefined){
				dataAccess.add_student(nom, prenom, formation, function(res){ if(res) callback(1); else callback(0);});
			}
		},

		check_note: function(student, note, formation, callback){
			var fields = student.split(' ');
			if (student != undefined && note != undefined && formation != undefined) {
				dataAccess.find_id_by_name_student(fields[0], function(id_student){
					dataAccess.find_id_by_name_formation(formation, function(id_formation){
						dataAccess.add_note(id_student.IDENTIFIANT_ELEVE, note, id_formation.IDENTIFIANT_MATIERE,function(result){ if (result) callback(1); else callback(0);});
					});
				});
			}
			else callback(0);
		}

}
