const mysql = require('mysql');

const SQL_CREATION_TABLE_FILM = "CREATE TABLE IF NOT EXISTS film (" +
	"id INT NOT NULL AUTO_INCREMENT," +
	"nom VARCHAR(300) NOT NULL," +
	"description TEXT," +
	"image TEXT," +
	"date_creation TIMESTAMP NOT NULL," +
	"PRIMARY KEY (id)" +
	");";
	
const SQL_CREATION_TABLE_UTILISATEUR = "CREATE TABLE IF NOT EXISTS utilisateur (" +
	"id INT NOT NULL AUTO_INCREMENT," +
	"pseudo VARCHAR(300) NOT NULL," +
	"mot_de_passe VARCHAR(300) NOT NULL," +
	"admin boolean," +
	"PRIMARY KEY (id)" +
	");";
	
const SQL_CREATION_TABLE_CRITIQUE = "CREATE TABLE IF NOT EXISTS critique (" +
	"id INT NOT NULL AUTO_INCREMENT," +
	"id_utilisateur INT NOT NULL," +
	"id_film int NOT NULL," +
	"texte TEXT NOT NULL," +
	"PRIMARY KEY (id)," +
	"FOREIGN KEY (id_utilisateur) " +
        "REFERENCES utilisateur(id) " +
        "ON DELETE CASCADE, " +
	"FOREIGN KEY (id_film) " +
        "REFERENCES film(id) " +
        "ON DELETE CASCADE" +
	");";
		
const SQL_CREATION_TABLE_NOTE = "CREATE TABLE IF NOT EXISTS note_film (" +
	"id INT NOT NULL AUTO_INCREMENT," +
	"id_utilisateur INT NOT NULL," +
	"id_film int NOT NULL," +
	"note int NOT NULL," +
	"PRIMARY KEY (`id`)," +
	"FOREIGN KEY (id_utilisateur) " +
        "REFERENCES utilisateur(id) " +
        "ON DELETE CASCADE," +
	"FOREIGN KEY (id_film) " +
        "REFERENCES film(id) " +
        "ON DELETE CASCADE" +
	");";
	
 			
function connect(){
    const connection = mysql.createPool({
	connectionLimit: 10,    
    host: process.env.DATABASE_HOST || '0.0.0.0' ,
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  	})	
    console.log("Connected to MySQL!");
    return connection;
}
var pool = mysql.createPool({
    connectionLimit : 100,
	host: process.env.DATABASE_HOST || '0.0.0.0' ,
	port: process.env.DATABASE_PORT || 3306,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
 });

function creatsseTable(){
	console.log("coucou createTable");

	const conn = mysql.createPool({
		connectionLimit: 10,    
		host: process.env.DATABASE_HOST || '0.0.0.0' ,
		port: process.env.DATABASE_PORT || 3306,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		  });
		  
    const LISTE_TABLES = [ SQL_CREATION_TABLE_FILM, SQL_CREATION_TABLE_UTILISATEUR, SQL_CREATION_TABLE_CRITIQUE, SQL_CREATION_TABLE_NOTE ];
	return new Promise((resolve, reject) => {
	LISTE_TABLES.forEach(function(table){
	    conn.query(table,function (err,result) {
	    if (err) {
		  console.log('erreur query');
	      console.log(err.message);
		  reject('erreur query');

	    } else {
			console.log('creation ok');
			resolve('creation ok');

	    }
	});
});
    });
}
function executeQuery(query, callback) {
	pool.getConnection(function (err, connection) {
	  if (err) {
		  return callback(err, null);
	  }
	  else if (connection) {
		  connection.query(query, function (err, rows, fields) {
			  connection.release();
			  if (err) {
				  console.log(err.message);
				  return callback(err, null);
			  }
			  console.log(rows);
			  return callback(null, rows);
		  })
	  }
	  else {
		  return callback(true, "No Connection");
	  }
	});
  }

  function getResult(query,callback) {
	executeQuery(query, function (err, rows) {
	   if (!err) {
		  callback(null,rows);
	   }
	   else {
		  callback(true,err);
	   }
	});
  }
  function createTable() {
	const LISTE_TABLES = [ SQL_CREATION_TABLE_FILM, SQL_CREATION_TABLE_UTILISATEUR, SQL_CREATION_TABLE_CRITIQUE, SQL_CREATION_TABLE_NOTE ];
	LISTE_TABLES.forEach(function(sqltable){

		getResult(sqltable,function(err,rows){
			if(!err){
				console.log("create table ok" + rows + sqltable)
			}else{
				console.log("create table err " + err + sqltable);
			}
		});
	});	
}
  
/*function query (sql,callback) {
	console.log("coucou query " + sql);
   const conn = connect();
   conn.query(sql,function (err,result) {
	    if (err) {
		  callback(err,null);
	      console.log('erreur query : ' + err.message);
	    } else {
		  callback(null,result);
	    }
	});

	  conn.end(function(err) {
	    if (err) {
	      console.log(err.message);
	      retour = err.message;
	    }
	      });
	return retour;
}*/

/*function ligneExiste (sql,callback) {
   console.log("coucou ligneExiste " + sql);
   const conn = connect();
    conn.query(sql,function (err,result) {
	    if (err) {
		  console.log('erreur ligneExiste');
	      console.log(err.message);
		  callback(err,null);
	    } else {
			if (result && result.length){
				callback(null,true);
				console.log("LA LIGNE EXISTE");
			}
			else
			{
				callback(null,false);

					console.log("LA LIGNE EXISTE PAS");
			}
	    }
	});
	conn.end(function(err) {
	    if (err) {
	      console.log(err.message);
	    }
	});
}*/

/*function insertFilm (jsonFilm) {
	// TODO DEPIOTER LE NOM DU FILM DANS LE JSON
	var sqlFilmExiste = "SELECT * FROM film WHERE nom = 'Melancholia'";
	const conn = connect();

	conn.query(sqlFilmExiste,function (err,result) {
	    if (err) {
	      console.log('erreur ligneExiste' + err.message);
	    } else {
			if (result && result.length){
				console.log("LA LIGNE EXISTE");
			}
			else
			{
					// TODO DEPIOTER LE JSON
					var sql = "INSERT INTO film (nom,description,image) VALUES ('Melancholia','Film d acception de la mort et de la catastrophe','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjbw_9tSkgBaS67OFEtdTpujQ6ddAktyXmwBzb1xtyyavQWcb');";
					conn.query(sql,function (err,result) {
						if (err) {
						  console.log('erreur insertion ' + err.message);
						} else {
							console.log("ajout effectué " + result);

						}
					});
			}
	    }
	});
	conn.end(function(err) {
	    if (err) {
	      console.log(err.message);
	    }
	});
}*/


/*function ligneExiste () {
	const conn = mysql.createPool({
		connectionLimit: 10,    
		host: process.env.DATABASE_HOST || '0.0.0.0' ,
		port: process.env.DATABASE_PORT || 3306,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		  })	
	console.log("ligne existe");
	return new Promise((resolve, reject) => {
		conn.query("SELECT * FROM film WHERE nom = 'Melancholia'", function (error, results, field) {
		  if (error) {
			return reject(error);
		  } else {
			if (results.length === 0) {
				console.log("ligne existe pas");

			  resolve(false);
			}
			console.log("ligne existe");
			resolve(true);
		  }
		})
	});
}

function insertUtilisateur (jsonFilm) {

}*/

module.exports = {createTable}


