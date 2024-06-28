
const $d = document;

const $provincia = $d.getElementById("provincia");
const botonEnviarFormulario = $d.getElementById("formulario")
const imagenLibro = $d.getElementById("contenedorEnviarDatos")
const textoEnviarDatos = $d.getElementById("textoEnviarDatos")

function provincias() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            let $opciones = `<option value="Elige una Provincia">Elige una Provincia</option>`;
            res?.provincias?.forEach(element => $opciones += `<option value="${element.nombre}">${element.nombre}</option>`);
            $provincia.innerHTML = $opciones;
        })
        .catch(error => console.log(error))
}
$d.addEventListener("DOMContentLoaded", provincias)

botonEnviarFormulario.addEventListener('submit', (e) => {
    e.preventDefault()
    if (botonEnviarFormulario.checkValidity()) {
        imagenLibro.style.display = 'block'
        setTimeout(()=> {
            imagenLibro.style.opacity = "1"
        }, 10)
        setTimeout(() => {
            imagenLibro.style.opacity = "0"
            setTimeout(()=>{
                imagenLibro.style.display = 'none'
            },1000)
        }, 2000)
    }
})


