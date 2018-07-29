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
					//sess.login = firstLetterToUpper(adminList[k].PRENOM_ADMIN);
					sess.mdp = adminList[k].PASSWORD_ADMIN;
					console.log(sess.login + " is connected -> creating session".blue);
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
						//sess.login = firstLetterToUpper(adminList[k].PRENOM_ADMIN);
						sess.mdp = profList[k].PASSWORD_PROFESSEUR;
						console.log(sess.login + " is connected -> creating session".blue);
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
							//sess.login = firstLetterToUpper(adminList[k].PRENOM_ADMIN);
							sess.mdp = eleveList[k].PASSWORD_ELEVE;
							console.log(sess.login + " is connected -> creating session".blue);
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

}
