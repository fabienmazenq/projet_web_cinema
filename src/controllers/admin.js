function ajouterFilm () {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('input_nom_film').value = "";
            document.getElementById('input_description_film').value = "";
            document.getElementById('input_image_film').value = "";
            alert(this.responseText);
        }
    }

    xhttp.open("POST", "./ajouterFilm", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var obj = {};
    obj['nom'] = document.getElementById('input_nom_film').value;
    obj['description'] = document.getElementById('input_description_film').value;
    obj['image'] = document.getElementById('input_image_film').value;
    xhttp.send(JSON.stringify(obj));

}