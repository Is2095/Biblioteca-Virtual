
const $d = document;
const entrar = $d.getElementById('hrefEntrar');
const salir = $d.getElementById('hrefSalir');
const registrarse = $d.getElementById('hrefRegistrarse');
const botonFavorito = $d.getElementById('botonFavorito');

const dato = sessionStorage.getItem('idUsuario');

if (dato) {
    entrar.style.opacity = '0'
    salir.style.opacity = '1'
    registrarse.style.opacity = '0'
    
    
} else {
    entrar.style.opacity = '1'
    salir.style.opacity = '0'
    registrarse.style.opacity = '1'
}


const llamar = async (categoria) => {

    const contenedor = document.getElementById('librosBD')
    contenedor.innerHTML = '';

    const id_usuario = sessionStorage.getItem('idUsuario')

    const response = await fetch(`http://localhost:3001/api/favoritos/${parseInt(id_usuario)}`)

    const arrayFavoritos = await response.json()

    const insertarDatos = (datos) => {
        console.log(datos, 'datos');

            datos.forEach((objeto, index) => {
                const div = document.createElement('div')
                div.classList.add('carousel-item')
                if (index === 0) {
                    div.classList.add('active')
                }
                const { id, authors, description, imageLink, language, pageCount, title, published_date, id_libro } = objeto;
                const datosLibroFavorito = { id, authors, description, language, pageCount, title, published_date, id_libro }
                const esFavorito = arrayFavoritos.some(elemt => elemt.id === id)
                console.log(esFavorito, 'esFavorito', arrayFavoritos, id);

                if (authors && description && imageLink && language && title) {
                    div.innerHTML = `
                            <button id="botonCorazon" 
                            data-id="${id}" 
                            data-authors="${authors}" 
                            data-description="${description}" 
                            data-imageLink="${imageLink}" 
                            data-language="${language}" 
                            data-pageCount="${pageCount}" 
                            data-title="${title}" 
                            data-published_date="${published_date}" 
                            data-id_usuario="${id_usuario}"
                            data-categoria="${categoria}"
                            class="botonCorazon ${esFavorito ? "active" : ""} ${dato ? "" : "noHayDatos"}" onClick="toggleFavorite(this)"><i class="bi bi-heart-fill"></i></button>
                            <img class="imagenCarrusel" src="${imageLink}"></img>
                            <p>título ${title}</p>
                            <p>Autor ${authors}</p>
                            <p>fecha de impreso: ${published_date}</p>
                            <p>cantidad de hojas: ${pageCount}</p>
                    `;
                    contenedor.appendChild(div);
                };
            });

    };

    fetch(`http://localhost:3001/api/libros?categoria=${categoria}`)
        .then(res => res.json())
        .then(res => insertarDatos(res))
        .catch(err => console.log(err));
}   