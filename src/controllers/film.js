window.addEventListener("load", function(event) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                console.log(this.responsetext);
                var film = JSON.parse(this.responsetext);
                document.getElementById('input_nom_film').value = film.nom;
                document.getElementById('input_description_film').value = film.description;
                document.getElementById('input_image_film').value = film.image;
        }
    };
    xhttp.open("GET", "recupererInfoFilm/" + id, true);
    xhttp.send();
  });

  