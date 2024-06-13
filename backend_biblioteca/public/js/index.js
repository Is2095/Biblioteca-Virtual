
const llamar = (categoria) => {
    const contenedor = document.getElementById('librosBD')
    contenedor.innerHTML = '';

    const insertarDatos = (datos) => {
        console.log(datos, '-------------');
        datos.forEach((objeto, index) => {
            const div = document.createElement('div')
            div.classList.add('carousel-item')
            if(index===0) {
                div.classList.add('active')
            }
            const { authors, description, imageLink, language, pageCount, title, published_date, id_libro} = objeto;
            console.log(datos.length, 'hola mundo', datos[datos.length - 1].favoritos.some(ele => ele.id_libro_f === 5));
            const esFavorito = datos[datos.length-1].favoritos.some(elemt => elemt.id_libro_f === id_libro)
           
        //    console.log(id_libro_f, datos, '//////');
        //    ${id_libro_f !== null ? "active" : ''}
            if (authors || description || imageLink || language || pageCount || title || published_date) {
                div.innerHTML = `
                        <button id="botonFavorito " class="botonCorazon ${esFavorito ? "active" : ""}" onClick="toggleFavorite(event, this, ${id_libro})"><i class="bi bi-heart-fill"></i></button>
                        <img class="imagenCarrusel" src="${imageLink}"></img>
                        <p>título ${title}</p>
                        <p>Autor ${authors}</p>
                        <p>fecha de impreso: ${published_date}</p>
                        <p>cantidad de hojas: ${pageCount}</p>

                `;
                contenedor.appendChild(div)
            }

        })
    }


    fetch(`http://localhost:3001/api/libros?categoria=${categoria}`)
        .then(res => res.json())
        .then(res => insertarDatos(res))
        .catch(err => console.log(err))

}   