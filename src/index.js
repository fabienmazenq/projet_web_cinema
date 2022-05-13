'use strict';
const express = require('express');
const path = require('path');
const db = require("./db");
const bodyParser = require('body-parser');
const sessions = require('express-session');
const { json } = require('express');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.static(__dirname));
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
//app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))


var creationTable = function (req, res, next) {
  db.createTable(function(retour){
    req.resultTable = retour;
    //console.log ("middleware : " + retour);

    var admin = {};
    admin['pseudo'] = 'admin';
    admin['mot_de_passe'] = 'admin';
    admin['admin'] = true;
    var jsonData = JSON.stringify(admin);
    db.insertUser(jsonData,function(retour){});
   // db.insertFilm("",function(retour){});

    next();
  });
}
app.use(creationTable);




var sessionCourante;

app.use(sessions(
  { 
    secret: 'Shsh!Secret!',
    saveUninitialized: true,
    resave: false
  })
  );

  app.get('/toto', function(req, res){
  

    res.render(path.join(__dirname, 'views/testrender.html'), { toto:'coucou' });

  });
  

app.get('/', function(req, res)  {
  
  sessionCourante = req.session;
  console.log(sessionCourante);
  if(sessionCourante.pseudo) {
    console.log("Connecté avec " + sessionCourante.pseudo);
  } else {
    console.log("Aucune connexion");
  }
  res.sendFile(path.join(__dirname, 'views/accueil.html'));
   /*console.log('coucou depuis la racine');
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

   console.log("fin du get");*/
});

app.get('/film/:id', function(req, res) {
   res.sendFile(path.join(__dirname, 'views','test.html'));
});
app.get('/recupererFilmRecent', function(req, res) {
  
    db.getAllFilm(function(err,retour){
      if(err)
        res.send(err.message);
      else      
        res.send(retour)
    });
});

app.get('/checkSession', function(req, res) {
  sessionCourante=req.session;
  if(sessionCourante.pseudo){
      res.send(sessionCourante.pseudo);
  }else{
    res.send(null);
  }
});

app.post('/connexion', function(req, res)  {

  db.checkLogin(JSON.stringify(req.body),function (retour){
    if (retour == true){
      sessionCourante = req.session;
      sessionCourante.pseudo = req.body.pseudo;
      console.log(sessionCourante);
      //res.sendFile(path.join(__dirname,'views','accueil.html'));
      res.send(req.body.pseudo);
    } else {
        console.log("Connexion incorrecte");
        res.send(null);
    }
  }); 
});

app.post('/ajouterFilm', function(req, res)  {

  db.insertFilm(JSON.stringify(req.body),function (err,retour){
    if (err){
      res.send(err);
    } else {
        res.send("Ajout du film avec succès");
    }
  }); 
});


app.post('/creationcompte', function(req, res) {

  var obj = {};
  obj['pseudo'] = req.body.inputPseudoInscription;
  obj['mot_de_passe'] = req.body.inputPwdInscription;
  obj['admin'] = false;

  var jsonData = JSON.stringify(obj);

    db.insertUser(jsonData,function (retour){
      sessionCourante.pseudo = req.body.inputPseudoInscription;
      res.redirect('/');
  }); 

});
app.get('/deconnexion',function(req, res) {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});
app.get('/administration',function(req, res) {
  sessionCourante=req.session;
  if(sessionCourante.pseudo){
    res.sendFile(path.join(__dirname, 'views','admin.html'));
  }else{
    res.sendFile(path.join(__dirname, 'views','accueil.html'));
  }
});

app.listen(PORT, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });

  