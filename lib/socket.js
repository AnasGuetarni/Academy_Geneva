// sockets.js

console.log('- socket.js loaded'.yellow);

var dataAccess = require('./dataAccess');
var socketio = require('socket.io');
var express = require('express');
var functions = require('./functions');
var childProcess = require('child_process');


module.exports = function(http){
	var io = require("socket.io")(http);

	io.on('connection', function(socket) {
	    socket.on('req_exist_login', function(identifiant){
				var loginExist = false;
	    	dataAccess.findByFieldHasValue('Admin', 'PRENOM_ADMIN', identifiant, function(res){
	    		if (res.length != 0)
	    			loginExist = true;
	    		else {
						dataAccess.findByFieldHasValue('Professeur', 'PRENOM_PROFESSEUR', identifiant, function(res){
			    		if (res.length != 0)
			    			loginExist = true;
			    		else {
								dataAccess.findByFieldHasValue('Eleve', 'PRENOM_ELEVE', identifiant, function(res){
					    		if (res.length != 0)
					    			loginExist = true;
									socket.emit('res_exist_login', loginExist);
								});
							}
						});
					}
	    	});
	    });

			//suite

    });

  }
