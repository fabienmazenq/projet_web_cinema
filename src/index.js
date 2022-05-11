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

app.get('/', (req, res) => {

   res.sendFile(path.join(__dirname, 'views/accueil.html'));
   //const createtableretour = db.createTable(); 
   //const ajoutfilm = db.insertFilm("toto"); 
   //console.log(createtableretour);
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
