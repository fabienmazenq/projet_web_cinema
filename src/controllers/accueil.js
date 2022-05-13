window.addEventListener("load", function(event) {
    checkSession();
    recupererFilmRecent();
  });

function recupererFilmRecent(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           console.log(this.responseText);
          // alert(this.responseText);
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
           console.log(this.responseText);
           if(this.responseText){
                console.log("connecté");
                document.getElementById("recherche").value = this.responseText;
           } else {
                console.log("pas connecté");
                document.getElementById("recherche").value = this.responseText;
           }
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
