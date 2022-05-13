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
	
const SQL_CREATION_ADMIN= "INSERT INTO utilisateur (pseudo,mot_de_passe,admin) VALUES ('admin','admin',true);";

function createTable (retour){
		
	var connexion = mysql.createConnection({
		host: process.env.DATABASE_HOST || '0.0.0.0' ,
		port: process.env.DATABASE_PORT || 3306,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		multipleStatements: true
	});


	connexion.connect(function(err) {
			if (err) 
			{
				console.log(err.message);
				throw err;
			}

			//console.log("Connected!");
			var sqlcreation = SQL_CREATION_TABLE_FILM.concat(SQL_CREATION_TABLE_UTILISATEUR,SQL_CREATION_TABLE_CRITIQUE,SQL_CREATION_TABLE_NOTE);
			connexion.query(sqlcreation, function (err, result) {
				if (err) throw err;
				//console.log("Tables created");
				retour("Tables created");
			});
		});
}


function insertUser (jsonInsertUser, retour){

	var user = JSON.parse(jsonInsertUser);


	var sqlCheckExiste = "SELECT * FROM utilisateur WHERE pseudo = '" + user.pseudo + "'";
	ligneExiste(sqlCheckExiste, function (result){
		console.log("insert user valeur de retour de ligne existe " + result);
		if (result == true){
			//console.log("on ajoute pas");
			retour("L'utilisateur existe déjà, on ajoute pas");
		} else{
			//console.log ("on ajoute");
			var sqlinsertUser = "INSERT INTO utilisateur (pseudo,mot_de_passe,admin) VALUES ('" + user.pseudo + "','" + user.mot_de_passe + "'," + user.admin + ")";
			execute(sqlinsertUser,function (err, result){
				if (err){
					retour("Erreur lors de l'ajout de l'utilisateur : " + err.message);
				} else {
					retour("Ajout de l'utilisateur ok " + result);
				}
			});
		}
	});
}

function insertFilm (jsonFilmInfo, retour){

	var film = JSON.parse(jsonFilmInfo);
	var sqlCheckExiste = "SELECT * FROM film WHERE nom = '" + film.nom + "'";
	ligneExiste(sqlCheckExiste, function (result){
		if (result == true){
			console.log("on ajoute pas");
			retour("Le film existe déjà, on ajoute pas",null);
		} else{
			console.log ("on ajoute");
			film.description = film.description.replaceAll('\'', '\'\'');
			var sqlInsertFIlm = "INSERT INTO film (nom,description,image) VALUES ('" + film.nom  + "','" + film.description + "','" + film.image + "');";

			execute(sqlInsertFIlm,function (err, result){
				if (err){
					retour("Erreur lors de l'ajout du film : " + err.message,null);
				} else {
					retour(null, result);
				}
			});
		}
	});
}

function getAllFilm (retour){
	var sqlCheckExiste = "SELECT * FROM film LIMIT 6";
	execute(sqlCheckExiste,function (err, result){
		if (err){
			retour(err,null);
		} else {
			retour(null,result);
		}
	});
}


function checkLogin (jsonInfo, retour){
	var user = JSON.parse(jsonInfo);

	console.log ("check login json :"+ jsonInfo);

	var sqlCheckExiste = "SELECT * FROM utilisateur WHERE pseudo = '" + user.pseudo + "' AND mot_de_passe='" + user.mot_de_passe + "'";
	ligneExiste(sqlCheckExiste, function (result){
		if (result == true){
			console.log("Login ok");
			retour(true);
		} else{
			console.log ("Login NOK");
			retour(false);
		}
	});
}



function ligneExiste (sql,retour){
		
	var connexion = mysql.createConnection({
		host: process.env.DATABASE_HOST || '0.0.0.0' ,
		port: process.env.DATABASE_PORT || 3306,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		multipleStatements: true
	});


	connexion.connect(function(err) {
			if (err) 
			{
				console.log(err.message);
				throw err;
			}

			//console.log("Connected!");
			connexion.query(sql, function (err, result) {
				if (err) {
					throw err;
				
				}
				else
				{
					if (result && result.length)
					{
						//console.log("ligne existe");
						retour(true);
					}
					else
					{
						//console.log("ligne existe pas");
						retour(false);

					}	
				}			
			});
		});
}

function execute (sql, retour){
	var connexion = mysql.createConnection({
		host: process.env.DATABASE_HOST || '0.0.0.0' ,
		port: process.env.DATABASE_PORT || 3306,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		multipleStatements: true
	});


	connexion.connect(function(err) {
			if (err) 
			{
				console.log(err.message);
				retour(err,null);
				throw err;
			}
			connexion.query(sql, function (err, result) {
				if (err) {
					retour(err,null);
					throw err;
				}
				else
				{
					console.log("Requete effectuée !");
					retour(null,result);
				}			
			});
		});
}

module.exports = {createTable,insertUser,insertFilm,checkLogin,getAllFilm};