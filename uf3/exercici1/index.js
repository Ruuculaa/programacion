var formulari = document.getElementById("formulari");
var missatge = document.getElementById("missatge");
var tabla = document.getElementById("tabla");

formulari.addEventListener("submit", function(event){
    event.preventDefault();

    var arxiu = document.getElementById("arxiu").files[0];
    var formData = new FormData();
    formData.append("arxiu", arxiu);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "pujarArxiu.php");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if(xhr.status == 200){
                var datosCSV = JSON.parse(xhr.responseText);
                construirTabla(datosCSV);
                missatge.innerHTML = "Arxiu pujat correctament.";
            } else {
                missatge.innerHTML = "Ha ocorregut una errada al pujar l'arxiu.";
            }
        }
    }
    xhr.send(formData);
});

function construirTabla(datosCSV) {
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    // Crear encabezados de tabla
    var encabezados = Object.keys(datosCSV[0]);
    var encabezadosRow = tabla.insertRow();
    encabezados.forEach(function(encabezado) {
        var th = document.createElement("th");
        th.textContent = encabezado;
        encabezadosRow.appendChild(th);
    });

    // Crear filas de datos
    datosCSV.forEach(function(fila) {
        var tr = tabla.insertRow();
        encabezados.forEach(function(encabezado) {
            var td = tr.insertCell();
            td.textContent = fila[encabezado];
        });
    });
}
