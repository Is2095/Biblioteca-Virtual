# Poyecto Grupal CodoACodo "BIBLIOTECA VIRTUAL"

## Descripción
descripción del proyecto...

## Instalación

### Requisitos Tecnológicos:

- Node.js >= 20.x
- npm >= 10.x

### Clonar el Repositorio

''' En consola (bash) 

- git clone https://github.com/

## Instalar dependencias

En la raiz del proyecto: /backend_biblioteca

- npm install

En /backend_biblioteca/public/formulario/js

- npm install

## Configuración del entorno

Crear un archivo en la raíz del proyecto .env en el cual se deberá colocar las siguientes variables: 

- PORT = 3001
- PASSWORD = 'colocar la contraseña de la base de datos mySQL'
- APIKEY = 'apikey de la API de GOOGLE BOOKS'

## Modo Desarrollo

- npm run dev

## Estructura del Proyecto

 backend_biblioteca
    ├── public
    │   ├── actualizarUsuario
    │   │   ├── index.html
    │   │   └── styles.css
    │   ├── formulario
    │   │   ├── js
    │   │   │    └── script.js
    │   │   ├── CONTACTO.html
    │   │   ├── package.json
    │   │   └── styles.css
    │   ├── imagenes
    │   │   └── logo.jpg
    │   ├── js
    │   │   ├── favoritos.js
    │   │   └── index.js
    │   ├── login
    │   │   ├── index.html
    │   │   └── login.js
    │   ├── index.html
    │   └── styles.css
    ├── src
    │   ├── controllers
    │   │   ├── deleteFavoritoBD.js
    │   │   ├── getFavoritosBD.js
    │   │   ├── getLibroPorIdBD.js
    │   │   ├── getLibrosPorCategoriaAPI.js
    │   │   ├── getUsuarioPorEmailBD.js
    │   │   ├── PostLibroComoFavoritoBD.js
    │   │   └── postUsuarioBD.js
    │   ├── data
    │   │   └── index.js
    │   ├── routes
    │   │   └── index.js
    ├── app.js
    ├── package.json
    └── README.md
  ## Rutas de la API

`GET /api/libros`
Obtiene los libros de la API "google books", por categoría

- Respuesta []

`GET /api/libros/:id`
Obtener un libro con un id específico "/:id"

- Respuesta []

`GET /api/favoritos/:id_usuario`
Obtener los id de los libros favoritos que tiene un usuario específico "/:id_usuario"

- Respuesta []

`POST /api/favoritos`
Guarda los datos del libro y usuario, relacionando libro(favorito)-usuario

- Respuesta []

`DELETE /api/`
Borra el libro favoritos de tabla de libro y tabla secundaria favoritos, asociado al usuario específico

- Respuesta: {"message": "eliminación de favoritos exitosa"}
- Respuesta error: libro incorrecto, usuario incorrecto, eliminación fallida: {"err": "mensaje de error correspondiente"}

`POST /api/formulario`
Guarda los datos del usuario registrado

- Respuesta: se redirecciona a "/login/index.html"
- Respuesta error: {"err": "mensaje de error correspondiente"}

`POST /api/usuario`
Buscar un usuario por un email específico

- Respuesta: {"id_usuario: _, "nombre": "_", "apellido": "_", "edad": _, "email": "_", "fechaActual": "_", "provincia": "_", "foto": "_"}
- Respuesta error: {"err": "mensaje de error correspondiente"}
