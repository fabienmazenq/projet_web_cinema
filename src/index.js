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



app.get('/', (req, res) => {

   res.sendFile(path.join(__dirname, 'views/index.html'));
   var r = db.createTable(); 
   console.log("résultat de la methode createTable " + r);
   //var a = db.insertFilm("toto"); 

});

app.listen(PORT, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });
