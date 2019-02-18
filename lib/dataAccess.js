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
    var queryString = 'SELECT * \
    FROM Professeur p \
    JOIN Matiere m ON p.Matiere_ID = m.IDENTIFIANT_MATIERE \
    WHERE p.PRENOM_PROFESSEUR = ?';
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
      var queryString = 'SELECT m.id_formation, m.nom_formation, count(e.IDENTIFIANT_ELEVE) as \'NOMBRE_ELEVE\' \
      FROM Formation m JOIN Eleve e on e.FORMATION_ID = m.id_formation GROUP BY m.id_formation, m.nom_formation ';
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

    add_formation: function(name, callback){
      let image_formation = 'economy.jpeg';
      var queryString = 'INSERT INTO `Formation`(`nom_formation`, `image_formation`) VALUES (?,?);';
      db.query(queryString, [name, image_formation], function(err, rows){
        if (err) {
          throw err;
          callback(0);
        }
        else callback(1);
      });
    },

    add_matiere: function(matiere, id_formation, callback){
      let image_formation = 'economy.jpeg';
      var queryString = 'INSERT INTO `Matiere`(`NOM_MATIERE`, `IMAGE_MATIERE`, `FORMATION_ID`) VALUES (?,?,?);';
      db.query(queryString, [matiere, image_formation, id_formation], function(err, rows){
        if (err) {
          throw err;
          callback(0);
        }
        else callback(1);
      });
    },

    add_student: function(nom, prenom, id_formation, callback){
      let d = new Date();
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var string_length = 8;
      var randomstring = '';
      for (var i=0; i<string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
      }
      d.getTime();
      var queryString = 'INSERT INTO `Eleve`(`PRENOM_ELEVE`, `NOM_ELEVE`, `DATE_ELEVE`, `PASSWORD_ELEVE`, `FORMATION_ID`) VALUES (?,?,?,?,?);';
      db.query(queryString, [prenom, nom, d, randomstring, id_formation], function(err, rows){
        if (err) {
          throw err;
          callback(0);
        }
        else callback(1);
      });
    },

    add_absence: function(student, absence, formation, callback){
      let d = new Date();
      d.getTime();
      var queryString = 'INSERT INTO `Absence`(`TYPE_ABSENCE`, `DATE_ABSENCE`,`ETAT_ABSENCE`, `ELEVE_ID`, `MATIERE_ID`) VALUES (?,?,"Non justifié",?,?)';
      db.query(queryString, [absence, d, student, formation], function(err, rows){
        if (err) {
          throw err;
          callback(0);
        }
        else callback(1);

      });
    },

    add_note: function(student, note, formation, callback){
      let d = new Date();
      d.getTime();
      console.log(student + note + formation);
      var queryString = 'INSERT INTO `Notes`(`VALEUR_NOTE`, `DATE_NOTE`,`MATIERE_ID`, `ELEVE_ID`) VALUES (?,?,?,?)';
      db.query(queryString, [note, d, formation, student], function(err, rows){
        if (err) {
          throw err;
          callback(0);
        }
        else callback(1);

      });
    },

    find_id_by_name_student: function(name, callback){
      var list = new Array();
      var queryString = 'SELECT IDENTIFIANT_ELEVE FROM Eleve WHERE PRENOM_ELEVE=?';
      db.query(queryString, [name], function(err, rows){
        if (err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list[0]);
      });
    },

    find_id_by_name_formation: function(name, callback){
      var list = new Array();
      var queryString = 'SELECT IDENTIFIANT_MATIERE FROM Matiere WHERE NOM_MATIERE=?';
      db.query(queryString, [name], function(err, rows){
        if (err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list[0]);
      });
    },

    find_matiere_by_id_absence: function(id, callback){
      var list = new Array();
      var queryString = 'select distinct m.IDENTIFIANT_MATIERE from Absence a join Matiere m on a.MATIERE_ID = m.IDENTIFIANT_MATIERE where a.IDENTIFIANT_ABSENCE = ?';
      db.query(queryString, [id], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list[0]);
      });
    },

    updateAbsence: function(id_absence, callback){
      var queryString = 'UPDATE Absence SET ETAT_ABSENCE="Justifié" WHERE IDENTIFIANT_ABSENCE = ?';
      db.query(queryString, [id_absence], function(err,rows){
        if(err) throw err;
        callback();
      });
    },

    find_data_absences: function(callback){
      var list = new Array();
      var queryString = 'SELECT count(a.IDENTIFIANT_ABSENCE) as "count", e.NOM_ELEVE, e.PRENOM_ELEVE FROM Absence a \
      JOIN Eleve e ON a.ELEVE_ID = e.IDENTIFIANT_ELEVE \
      JOIN Matiere m ON a.MATIERE_ID = m.IDENTIFIANT_MATIERE \
      GROUP BY e.IDENTIFIANT_ELEVE;';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_students_formations: function(callback){
      var list = new Array();
      var queryString = 'SELECT count(e.IDENTIFIANT_ELEVE) as "count", f.nom_formation, f.image_formation, f.id_formation FROM Formation f \
      JOIN Eleve e ON e.FORMATION_ID = f.id_formation GROUP BY f.nom_formation;';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_students_matiere: function(id, callback){
      var list = new Array();
      var queryString = 'select * from Eleve e  Join Formation f on e.FORMATION_ID = f.id_formation Join Matiere m on m.FORMATION_ID = f.id_formation Where m.IDENTIFIANT_MATIERE = ?;';
      db.query(queryString, [id], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_students_absences: function(callback){
      var list = new Array();
      var queryString = 'Select * from Absence a join Eleve e on a.ELEVE_ID = e.IDENTIFIANT_ELEVE join Matiere m on a.MATIERE_ID = m.IDENTIFIANT_MATIERE order by a.DATE_ABSENCE DESC;';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_documents: function(callback){
      var list = new Array();
      var queryString = '    select * from Document d join Matiere m on d.MATIERE_ID = m.IDENTIFIANT_MATIERE order by d.MATIERE_ID;';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_username_informations_admin: function(username, callback){
      var list = new Array();
      var queryString = 'select * from Admin where PRENOM_ADMIN = ?;';
      db.query(queryString, [username], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_notes_admin: function(callback){
      var list = new Array();
      var queryString = 'select * from Notes n join Eleve e on n.ELEVE_ID = e.IDENTIFIANT_ELEVE join Matiere m on n.MATIERE_ID = m.IDENTIFIANT_MATIERE order by n.MATIERE_ID';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_infos_formation: function(id, callback){
      var list = new Array();
      var queryString = 'select * from Professeur p join Matiere m on p.Matiere_ID = m.IDENTIFIANT_MATIERE where m.IDENTIFIANT_MATIERE = ?;';
      db.query(queryString, [id], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_student_in_formation: function(id, callback){
      var list = new Array();
      var queryString = 'select * from Eleve e join Formation m on e.FORMATION_ID = m.id_formation where m.id_formation = ?';
      db.query(queryString, [id], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_student_by_id: function(id, callback){
      var list = new Array();
      var queryString = 'select * from Eleve e  join Formation f on e.FORMATION_ID = f.id_formation join Matiere m on m.FORMATION_ID = f.id_formation where e.IDENTIFIANT_ELEVE = ?';
      db.query(queryString, [id], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_matiere_by_formation: function(id, callback){
      var list = new Array();
      var queryString = 'select * from Matiere m join Formation f on m.FORMATION_ID = f.id_formation where f.id_formation = ?';
      db.query(queryString, [id], function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        callback(list);
      });
    },

    find_search: function(value, callback){
      console.log('in find search value:' + value);
      var list = new Array();
      var queryString = 'select * from Eleve e join Formation f on e.FORMATION_ID = f.id_formation where e.PRENOM_ELEVE OR e.NOM_ELEVE like "' + value + '%";';
      db.query(queryString, function(err, rows){
        if(err) throw err;
        for(var i in rows)
        {
          list.push(rows[i]);
        }
        console.log('in dataAccess looking in this arry:' + list);
        callback(list);
      });
    }

}
