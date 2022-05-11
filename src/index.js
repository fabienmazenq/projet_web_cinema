'use strict';

const express = require('express');
var mysql = require('mysql');
const path = require('path')
const db = require("./db");

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();

app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))

var creationTable = function (req, res, next) {
    db.createTable(function(retour){
      req.resultTable = retour;
      console.log ("middleware : " + retour);
      next();
    });
  }
  
app.use(creationTable);

app.get('/', (req, res) => {
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

app.listen(PORT, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });
