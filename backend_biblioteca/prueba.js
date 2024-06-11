
const mysql = require("mysql2")
const axios = require("axios")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luci2095#'
});

db.connect((err) => {
    if (err) {
        console.log(`Error al conectar la base de datos: ${err.stack}`);
        return;
    } else {
        console.log('Conectado a la base de datos');
    }
    //   creación de la base de datos si no existe 
    db.query('CREATE DATABASE IF NOT EXISTS biblioteca_virtual', (err, result) => {
        if (err) throw err;
        console.log('DATABASE creada con éxito');

        db.query("USE biblioteca_virtual", (err, result) => {
            if (err) throw err;
            console.log("Usando la base de datos: biblioteca_virtual");
            const crearTabla = `
        CREATE TABLE IF NOT EXISTS libros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            authors VARCHAR(50),
            description TEXT(1000),
            imageLinksmall VARCHAR(250),
            imageLink VARCHAR(250),
            language VARCHAR(5),
            pageCount INT,
            title VARCHAR(255),
            published_date VARCHAR(50),
            categoria VARCHAR(50)
        )`;
            db.query(crearTabla, (err, result) => {
                if (err) throw err;
                console.log("Tabla creada exitosamente");


                const apiKey = 'AIzaSyBS3erswb39nCajND7zCq2mS--sbgYGydw';

                // función para obtener los libros de la API
                async function fetchBooksByCategory(category) {
                    try {
                        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=20&langRestrict=es&key=${apiKey}`);
                        const respuesta = {items: response.data.items, categoria: category}
                        return respuesta;
                    } catch (error) {
                        console.error('Error al buscar los libros:', error);
                        return [];
                    }
                }

                // función para guardar los libros en la base de datos

                function guardarDatosLibros(libro, categoria) {
                    const { authors, description, imageLinks, language, pageCount, title, publishedDate } = libro.volumeInfo
                    const author = authors ? authors[0] : 'Autor desconocido';
                    const sql = 'INSERT INTO libros (authors, description, imageLinksmall, imageLink, language, pageCount, title, published_date, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    db.query(sql, [author, description, imageLinks?.smallThumbnail, imageLinks?.thumbnail, language, pageCount, title, publishedDate, categoria], (err, result) => {
                        if (err) { console.log('Error al insertar los datos en la base de datos'); }
                        else { console.log('Datos guardados:', result.insertId); }
                    });
                }

                // función principal 

                async function main() {
                    const category = 'fiction';
                    // const category = 'science';
                    // const category = 'technology';
                    // const category = 'romance';
                    // const category = 'art';
                    // const category = 'comics';
                    // const category = 'education';
                    //  const category = 'fantasia';
                    const {items, categoria} = await fetchBooksByCategory(category);
                    items.forEach(libro => {
                        guardarDatosLibros(libro, categoria)
                    });

                   // cierre de conexión a la base de datos
                    db.end((err) => {
                        if (err) {
                            console.log('error al cerrar la conexión');
                        } else {
                            console.log('cierre de conexión a la base de datos exitosa');
                        }
                    })
                }

                main()
            })
        })
    })
})