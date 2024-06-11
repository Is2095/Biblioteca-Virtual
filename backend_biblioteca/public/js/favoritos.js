function toggleFavorite(event, button, id) {
    event.stopPropagation(); // Prevenir que el clic cambie la carta del carrusel
    const corazonRojo = button.classList.toggle('active');
    console.log(button, 'togglefavorito');

    if (!corazonRojo) {
        fetch(`http://localhost:3001/api/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    } else {
        fetch(`http://localhost:3001/api/${id}`, { method: 'POST' })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


}