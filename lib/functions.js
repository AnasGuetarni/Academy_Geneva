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
		if (sess.login) {
			next();
		} else {
			res.redirect("/");
		}
	},

	checkUserPass: function (adminList, username, password, sess, callback){
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

		/** Middleware check session exist */
		notLogged: function(req, res, next){
			var sess = req.body;
			if(sess.login != null){
				res.redirect('/admin');
			} else {
				next();
			}
		},


}
