
const $d = document;

const $provincia = $d.getElementById("provincia");

function provincias() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(res => {
        console.log(res.provincias, 'respuesta');
        let $opciones = `<option value="Elige una Provincia">Elige una Provincia</option>`;
        res?.provincias?.forEach(element => $opciones += `<option value="${element.nombre}">${element.nombre}</option>`);
        $provincia.innerHTML = $opciones;
    })
    .catch(error => console.log(error))
}
$d.addEventListener("DOMContentLoaded", provincias)