/* Functions of requests on the database */

console.log('- dataAccess.js loaded'.yellow);

var mysql = require('mysql');
var db = require('./db');

/**
Module who will permit to create the functions for the requests on the DataBase
**/
module.exports = {

  /*
  Function who give us all the data of a table
  @params table: table given for the informations
  @return callback: Array of the informations of the table
  */
  findAll: function(table, callback){
    var list = new Array();
    var queryString = 'SELECT * FROM ' + table;
    db.query(queryString, function(err, rows){
      if (err)
        throw err;
      for(var i in rows)
        list.push(rows[i]);
      callback(list);
    });
  },

  del: function(table, field, value, callback){
    var queryString = "DELETE FROM " + table + " WHERE " + field + "=?";
    db.query(queryString, [value], function(err,rows){
      if(err) throw err;
      callback();
    });
  },

  // PARAMETRE: table: table de la base ou l'on cherche
  // 			  fieldname: Champs de la table ou l'on fait le where
  // 			  value: Valeur que l'on recherche
  findByFieldHasValue: function(table, fieldname, value, callback){
    var list = new Array();
    var queryString = 'SELECT * FROM ' + table + ' WHERE ' + fieldname + '=?';
    db.query(queryString, [value], function(err,rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataByLogin: function(table, fieldname, value, callback){
    var list = Array();
    var queryString = 'SELECT DISTINCT a.IDENTIFIANT_ABSENCE, e.PRENOM_ELEVE, e.NOM_ELEVE, a.TYPE_ABSENCE, a.DATE_ABSENCE, a.ETAT_ABSENCE \
    FROM Absence a \
    JOIN Eleve e ON a.ELEVE_ID = e.IDENTIFIANT_ELEVE \
    JOIN Matiere m ON a.MATIERE_ID = m.IDENTIFIANT_MATIERE \
    JOIN Document d ON m.IDENTIFIANT_MATIERE = d.MATIERE_ID';
    db.query(queryString, function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataAbsenceStudent: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Eleve e Join Absence a ON e.IDENTIFIANT_ELEVE = a.ELEVE_ID WHERE e.PRENOM_ELEVE =?' ;
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataDocumentStudent: function(value, callback){
    var list = Array();
    var queryString = 'Select * FROM Eleve e JOIN Matiere m ON e.MATIERE_ID = m.IDENTIFIANT_MATIERE JOIN Document d ON m.IDENTIFIANT_MATIERE = d.MATIERE_ID WHERE e.PRENOM_ELEVE =?' ;
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataNoteStudent: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Eleve e JOIN Notes n ON n.Eleve_ID = e.IDENTIFIANT_ELEVE JOIN Matiere m ON n.MATIERE_ID = m.IDENTIFIANT_MATIERE WHERE e.PRENOM_ELEVE =?' ;
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataAbsenceProf: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Professeur p \
    JOIN Classe c ON p.Classe_ID = c.IDENTIFIANT_CLASSE \
    JOIN Eleve e ON c.IDENTIFIANT_CLASSE = e.CLASSE_ID \
    JOIN Absence a ON e.IDENTIFIANT_ELEVE = a.ELEVE_ID \
    WHERE p.PRENOM_PROFESSEUR =?' ;
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataDocumentProf: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Professeur p \
    JOIN Matiere m ON p.Matiere_ID = m.IDENTIFIANT_MATIERE \
    JOIN Document d ON m.IDENTIFIANT_MATIERE = d.MATIERE_ID \
    WHERE p.PRENOM_PROFESSEUR =?' ;
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataNoteProf: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Professeur p \
    JOIN Classe c ON p.Classe_ID = c.IDENTIFIANT_CLASSE \
    JOIN Eleve e ON c.IDENTIFIANT_CLASSE = e.CLASSE_ID \
    JOIN Notes n ON e.IDENTIFIANT_ELEVE = n.Eleve_ID \
    WHERE p.PRENOM_PROFESSEUR =?' ;
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataEventsProf: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Professeur p \
    JOIN Matiere m ON m.IDENTIFIANT_MATIERE = p.MATIERE_ID \
    JOIN Evenement e on m.IDENTIFIANT_MATIERE = e.MATIERE_ID \
    WHERE p.PRENOM_PROFESSEUR =?';
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },

  findDataEventsEleve: function(value, callback){
    var list = Array();
    var queryString = 'SELECT * FROM Eleve e \
    JOIN Matiere m ON e.MATIERE_ID = m.IDENTIFIANT_MATIERE \
    JOIN Evenement en ON m.IDENTIFIANT_MATIERE = en.MATIERE_ID \
    WHERE e.PRENOM_ELEVE =?';
    db.query(queryString, [value], function(err, rows){
      if(err) throw err;
      for(var i in rows)
      {
        list.push(rows[i]);
      }
      callback(list);
    });
  },


    findDataEventsAdmin: function(callback){
      var list = Array();
      var queryString = 'SELECT * FROM Evenement e \
      JOIN Matiere m on e.MATIERE_ID = m.IDENTIFIANT_MATIERE';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    findDataClassesAdmin: function(callback){
      var list = Array();
      var queryString = 'SELECT m.IDENTIFIANT_MATIERE, m.NOM_MATIERE, count(e.IDENTIFIANT_ELEVE) as \'NOMBRE_ELEVE\' \
      FROM Matiere m JOIN Eleve e on e.MATIERE_ID = m.IDENTIFIANT_MATIERE GROUP BY m.IDENTIFIANT_MATIERE, m.NOM_MATIERE ';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    findDataMatiere: function(value, callback){
      var list = Array();
      var queryString = 'SELECT e.NOM_ELEVE, m.NOM_MATIERE, e.PRENOM_ELEVE, AVG(n.VALEUR_NOTE) as \'MOYENNE_ELEVE\' \
      FROM Notes n \
      JOIN Eleve e ON n.Eleve_ID = e.IDENTIFIANT_ELEVE \
      JOIN Matiere m ON e.MATIERE_ID = m.IDENTIFIANT_MATIERE \
      WHERE m.IDENTIFIANT_MATIERE = ? \
      GROUP BY e.NOM_ELEVE, m.NOM_MATIERE, e.PRENOM_ELEVE';
      db.query(queryString, [value], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    findDataAbsence: function(value, callback){
      var list = Array();
      var queryString = 'SELECT count(a.IDENTIFIANT_ABSENCE) as \'NOMBRE_ABSENCES\' \
      FROM Absence a \
      JOIN Eleve e ON a.ELEVE_ID = e.IDENTIFIANT_ELEVE \
      JOIN Matiere m ON a.MATIERE_ID = m.IDENTIFIANT_MATIERE \
      WHERE m.IDENTIFIANT_MATIERE = ? \
      GROUP BY e.IDENTIFIANT_ELEVE';
      db.query(queryString, [value], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    findDataAbsenceUnique: function(value, callback){
      var list = Array();
      var queryString = 'SELECT * FROM Absence a \
      JOIN Eleve e ON a.ELEVE_ID = e.IDENTIFIANT_ELEVE \
      JOIN Matiere m ON a.MATIERE_ID = m.IDENTIFIANT_MATIERE \
      WHERE a.IDENTIFIANT_ABSENCE = ? ';
      db.query(queryString, [value], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    addEvent: function(titre, border_color, color, textcolor, description, start, end, matiere_id, callback){
      var queryString = 'INSERT INTO `Evenement`(`TITRE_EVENT`, `BORDERCOL_EVENT`, `COLOR_EVENT`, `TEXTCOL_EVENT`, `DESCRIPTION_EVENT`, `START_EVENT`, `END_EVENT`, `MATIERE_ID`) VALUES(?,?,?,?,?,?,?,?)';
      db.query(queryString, [titre, border_color, color, textcolor, description, start, end, matiere_id], function(err, rows){
       if(err) throw err;
       callback();
     });
    },

    addDocument: function(file_name, file_ext, file_size, matiere_id, callback){
      var queryString = 'INSERT INTO `Document`(`NOM_DOCUMENT`, `TAILLE_DOCUMENT`, `EXT_DOCUMENT`, `MATIERE_ID`) VALUES (?,?,?,?)';
      db.query(queryString, [file_name, file_size, file_ext, matiere_id], function(err, rows){
        if (err) throw err;
        callback();
      });
    },

    updateAbsence: function(id_absence, callback){
      var queryString = 'UPDATE Absence SET ETAT_ABSENCE="Justifié" WHERE IDENTIFIANT_ABSENCE = ?';
      db.query(queryString, [id_absence], function(err,rows){
        if(err) throw err;
        callback();
      });
    },


}
