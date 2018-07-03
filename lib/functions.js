// functions.js

console.log('- functions.js loaded'.yellow);

var crypto = require('crypto');
var db = require('./db');
var dataAccess = require('./dataAccess');

module.exports = {

	firstLetterToUpper: function(str){
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	/** Middleware for limited access and admin interface */
	requireLogin: function(req, res, next) {
		sess=req.session;
		if (sess.id_professeur) {
			next();
		} else {
			res.redirect("/");
		}
	},

	checkUserPass: function (profList, username, password, sess, callback){
		var logged = 0;
				for(var k in profList){
			if (username==profList[k].IDENTIFIANT_ADMIN){
					if (crypto.createHash('md5').update(password).digest("hex")==profList[k].PASSWORD_ADMIN)
				{
					logged++;
					sess.id_professeur = profList[k].ID_ADMIN;
					sess.nom = profList[k].NOM_PROFESSEUR.toUpperCase();
					sess.prenom = this.firstLetterToUpper(profList[k].PRENOM_PROFESSEUR);
					sess.identifiant = profList[k].IDENTIFIANT_PROFESSEUR;
					console.log(sess.identifiant + " is connected -> creating session".grey);
				}
			}
		}
		callback(logged);
		},

		/** Middleware check session exist */
		notLogged: function(req, res, next){
			var sess = req.session;
			if(sess.id_professeur != null){
				res.redirect('/admin');
			} else {
				next();
			}
		},


}
