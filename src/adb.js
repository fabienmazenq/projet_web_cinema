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
    const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '0.0.0.0' ,
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  	})	
    console.log("Connected to MySQL!");
    return connection;
}
function createTable (next){
	const sqlcreation = SQL_CREATION_TABLE_FILM.concat(SQL_CREATION_TABLE_UTILISATEUR,SQL_CREATION_TABLE_CRITIQUE,SQL_CREATION_TABLE_NOTE);
	const connection = connect();
	console.log(sqlcreation);
	connection.connect(
		if(err) {
			next(err);
			console.log("Erreur connexion  creation talbe " + err.message);
		}
		connection.query(SQL_CREATION_TABLE_FILM, function (err, result){
			if (err) {
				console.log("Erreur creation talbe " + err.message);
				next(err);
			}
			connection.end();
			next(null, "creation ok depuis create table " + result);
		});
}


function crcceateTable(){
	//console.log("coucou createTable");

	const conn = connect();
		  
    const LISTE_TABLES = [ SQL_CREATION_TABLE_FILM, SQL_CREATION_TABLE_UTILISATEUR, SQL_CREATION_TABLE_CRITIQUE, SQL_CREATION_TABLE_NOTE ];
	try
	{
		LISTE_TABLES.forEach(function(table){
			conn.query(table,function (err,result) {			
				if (err) {
				console.log('erreur createtable');
				console.log(err.message);

				} else {
					console.log('creation ok');
				}
			});
		});
	} catch (e){
		console.log('erreur pendant la creation des tables');
	} finally {
		conn.end();
	}
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
							console.log("ajout effectu?? " + result);

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


