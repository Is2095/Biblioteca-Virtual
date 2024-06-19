
function toggleFavorite(button) {

    const corazonRojo = button.classList.toggle('active');
    const id = button.getAttribute("data-id")
    const authors = button.getAttribute("data-authors")
    const description = button.getAttribute("data-description")
    const imageLink = button.getAttribute("data-imageLink")
    const pageCount = button.getAttribute("data-pageCount")
    const published_date = button.getAttribute("data-published_date")
    const title = button.getAttribute("data-title")
    const language = button.getAttribute("data-language")
    const id_usuario = button.getAttribute("data-id_usuario")
    const categoria = button.getAttribute("data-categoria")
    console.log(categoria, 'categoria funcion favorito');

    const datosLibroFavorito = { id, authors, description, imageLink, pageCount, published_date, title, language, id_usuario, categoria}

    if (!corazonRojo) {
        fetch(`http://localhost:3001/api/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    } else {
        fetch(`http://localhost:3001/api/favoritos`, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(datosLibroFavorito)
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }



}