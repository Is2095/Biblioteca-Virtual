
const $d = document;

const login = () => {
    const emailLogin = $d.getElementById('loginEmail')

    fetch('http://localhost:3001/api/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : emailLogin.value})
    })
    .then(resultado => resultado.json())
    .then(usuario => {
        if(usuario.length === 0) {
            alert('el usuario no existe')
        } else {
            sessionStorage.setItem('usuario', usuario[0].nombre)
            sessionStorage.setItem('idUsuario', usuario[0].id_usuario)

            alert(`el usuario: ${usuario[0].nombre} se encontró`)
            window.location.href = '../index.html'

    }   }) 
    .catch(err => console.log(err))
}