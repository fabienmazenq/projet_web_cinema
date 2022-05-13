window.addEventListener("load", function(event) {
    checkSession();
    recupererFilmRecent();
  });

  function recupererFilmRecent(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var list_film = JSON.parse(this.responseText);

           // On génère le vueJs pour l'affichage des films
           let card = {
               props: ['titre', 'id', 'descr', 'img'],
               template: '<div class="col-md-2 col-6">'
                            + '<div class="card m-2">'
                                + '<img v-bind:src="img" class="card-img-top" alt="...">'
                                + '<div class="card-body p-0">'
                                    + '<p class="card-text text-center fw-bold">9</p>'
                                + '</div>'
                            + '</div>'
                            + '<a v-bind:href="\'/film/\' + id"><p class="card-text text-center fw-bold">{{ titre }}</p></a>'
                        +'</div>',
           }

           let app1 = new Vue({
                el: '#app',
                data:{
                    films:list_film
                },
                components: {card},
            });
        }
    };
    xhttp.open("GET", "recupererFilmRecent", true);
    xhttp.send();
}


function checkSession () {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           gererEntete (this.responseText);

        }
    };
    xhttp.open("GET", "checkSession", true);
    xhttp.send();
}
function gererEntete (pseudo){
    if (pseudo){
        var blockVisible = document.getElementById("entete-non-connectee");
        blockVisible.classList.remove("d-block");
        blockVisible.classList.add("d-none");
        var blockInvisible = document.getElementById("entete-connectee");
        blockInvisible.classList.remove("d-none");
        blockInvisible.classList.add("d-block");
        var test = document.getElementById("id-pseudo");
        test.innerHTML = "Bienvenue " + pseudo;
    } else {
        var blockVisible = document.getElementById("entete-non-connectee");
        blockVisible.classList.add("d-block");
        blockVisible.classList.remove("d-none");
        var blockInvisible = document.getElementById("entete-connectee");
        blockInvisible.classList.add("d-none");
        blockInvisible.classList.remove("d-block");
    }
}


function connexionSubmit (){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var msgErreur = document.getElementById("alert-connexion");

            if (this.responseText){
                // Connexion ok
                msgErreur.classList.add("d-none");
                msgErreur.classList.remove("d-block");

                document.getElementById("btn_close_connexion").click();
                gererEntete(this.responseText);          
            } else {
                // Connexion nok

                var bandeauErreur = 
                '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Informations incorrectes</strong> Veuillez vérifier les informations saisies' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
                msgErreur.innerHTML = bandeauErreur;
            }

        }
    };

    xhttp.open("POST", "./connexion", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var obj = {};
    var pseudo = document.getElementById('inputPseudoConnexion').value;
    var pwd = document.getElementById('inputPwdConnexion').value;
    obj['pseudo'] = pseudo;
    obj['mot_de_passe'] = pwd;
    xhttp.send(JSON.stringify(obj));
}
function inscriptionSubmit (){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var msgErreur = document.getElementById("alert-inscription");

            if (this.responseText){
                // Connexion ok
                msgErreur.classList.add("d-none");
                msgErreur.classList.remove("d-block");

                document.getElementById("btn-close-inscription").click();
                gererEntete(this.responseText);          
            } else {
                // inscription nok

                var bandeauErreur = 
                '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                '<strong>Informations incorrectes</strong>Les informations sont incorrectes, un utilisateur avec ce pseudo existe déjà' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
                msgErreur.innerHTML = bandeauErreur;
            }

        }
    };

    xhttp.open("POST", "./inscription", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var obj = {};
    var pseudo = document.getElementById('inputPseudoInscription').value;
    var pwd = document.getElementById('inputPwdInscription').value;
    if (pseudo && pwd){
        obj['pseudo'] = pseudo;
        obj['mot_de_passe'] = pwd;
        obj['admin'] = false;
        xhttp.send(JSON.stringify(obj));
    }
    else
    { 
        var msgErreur = document.getElementById("alert-inscription");
        var bandeauErreur = 
        '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        '<strong>Informations incorrectes </strong>Les informations saisies sont incomplètes' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        msgErreur.innerHTML = bandeauErreur;      
    }
}
