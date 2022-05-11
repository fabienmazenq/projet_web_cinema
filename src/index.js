'use strict';

const express = require('express');
var mysql = require('mysql');
const path = require('path');
const db = require("./db");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
//app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use(express.static(__dirname));


var creationTable = function (req, res, next) {
  db.createTable(function(retour){
    req.resultTable = retour;
    console.log ("middleware : " + retour);
    next();
  });
}

app.use(creationTable);

app.get('/', (req, res) => {

   res.sendFile(path.join(__dirname, 'views/accueil.html'));
   console.log('coucou depuis la racine');
   res.sendFile(path.join(__dirname, 'views/index.html'));

   db.insertUser("toto",function (retour){
     console.log ("retour dans le index depuis le insert user "+ retour);
     db.checkLogin("toto",function (retour){
      console.log ("retour dans le index depuis le checklogin "+ retour);
  
    }); 
   }); 
   db.insertFilm("toto",function (retour){
    console.log ("retour dans le index depuis le insert film "+ retour);

  }); 

   console.log("fin du get");
});

app.get('/film/:id', (req, res) => {
   res.sendFile(path.join(__dirname, 'views/test.html'));
});

app.get('/connexion', (req, res) => {
console.log("t");
	var user = req.body.inputPseudo;
	var pwd = req.body.inputPseudo;
	console.log(user);
	console.log(pwd);
	
	res.sendFile(path.join(__dirname+'/accueil.html'));

})

app.listen(PORT, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });
