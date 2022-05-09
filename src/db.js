const mysql = require('mysql');

const SQL_CREATION_TABLE_FILM = "CREATE TABLE IF NOT EXISTS film (" +
	"id INT NOT NULL AUTO_INCREMENT," +
	"nom VARCHAR(300) NOT NULL," +
	"description TEXT," +
	"image TEXT," +
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
	"FOREIGN KEY (id_utilisateur)" +
        "REFERENCES utilisateur(id)" +
        "ON DELETE CASCADE," +
	"FOREIGN KEY (id_film)" +
        "REFERENCES film(id)" +
        "ON DELETE CASCADE" +
	");";
		
const SQL_CREATION_TABLE_NOTE = "CREATE TABLE IF NOT EXISTS note_film (" +
	"id INT NOT NULL AUTO_INCREMENT," +
	"id_utilisateur INT NOT NULL," +
	"id_film int NOT NULL," +
	"note int NOT NULL," +
	"PRIMARY KEY (`id`)," +
	"FOREIGN KEY (id_utilisateur)" +
        "REFERENCES utilisateur(id)" +
        "ON DELETE CASCADE," +
	"FOREIGN KEY (id_film)" +
        "REFERENCES film(id)" +
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

function createTable(){
   let retour = '';
    const conn = connect();
    const LISTE_TABLES = [ SQL_CREATION_TABLE_FILM, SQL_CREATION_TABLE_UTILISATEUR, SQL_CREATION_TABLE_CRITIQUE, SQL_CREATION_TABLE_NOTE ];
    LISTE_TABLES.forEach(function(table){
	    conn.query(table,function (err,result) {
	    if (err) {
		  console.log('erreur query');
	      console.log(err.message);
	      retour = err.message;
	    } else {
		  retour = result;
	    }
	});
    }); 
    conn.end(function(err) {
    if (err) {
      console.log(err.message);
      retour = err.message;
    }
  });
  return retour;
}
function query (sql) {
   let retour = '';
   const conn = connect();
   conn.query(table,function (err,result) {
	    if (err) {
		  console.log('erreur query');
	      console.log(err.message);
	      retour = err.message;
	    } else {
		  retour = result;
	    }
	  conn.end(function(err) {
	    if (err) {
	      console.log(err.message);
	      retour = err.message;
	    }
	      });
	});
	return retour;
}
function insertFilm (jsonFilm) {
	// TODO DEPIOTER LE JSON
	var sql = "INSERT INTO 'film' VALUES ('Melancholia','FIlm d'acception de la mort et de la catastrophe','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjbw_9tSkgBaS67OFEtdTpujQ6ddAktyXmwBzb1xtyyavQWcb');";
	return query (sql);

}
module.exports = {createTable,insertFilm}


