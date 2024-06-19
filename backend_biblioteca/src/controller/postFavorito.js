
import { coneccionBD, desconeccionBD } from '../data/index.js';

const GuardarFavorito = async (req, res) => {

    const { id, authors, description, imageLink, language, pageCount, title, published_date, categoria, id_usuario } = req.body;

    const db = coneccionBD();

    db.query('SELECT l.id FROM libros l JOIN favoritos f ON l.id_libro  = f.id_libro_f WHERE  f.id_usuario_f = ? AND l.id = ?', [id_usuario, id], (err, result) => {
        if (err) {
            desconeccionBD(db);
            throw Error('error al buscar información a la base de datos');
        } else {
            if (result.length === 0) {
                db.query('SELECT categoria.id_categoria FROM categoria WHERE categoria = ?;', [categoria], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        throw Error('error de busqueda');
                    } else {
                        db.query('INSERT IGNORE INTO libros (id, authors, description, imageLink, language, pageCount, title, published_date, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, authors, description, imageLink, language, pageCount, title, published_date, result[0].id_categoria], (err, result) => {
                            if (err) {
                                desconeccionBD(db);
                                throw Error('error al guardar las datos del libro');
                            } else {
                                console.log('libro guardado');
                                const idLibro = result.insertId;
                                db.query('INSERT IGNORE INTO favoritos (id_libro_f, id_usuario_f) VALUES (?, ?)', [idLibro, id_usuario], (err, result) => {
                                    if (err) {
                                        desconeccionBD(db);
                                        throw Error('error al guardar las datos del libro');
                                    } else {
                                        desconeccionBD(db);
                                        console.log('se ingreso a favorito');
                                    };
                                });
                            };
                        });
                    };
                });
            } else {
                desconeccionBD(db);
                console.log('libro ya existe en favoritos');
            };
        };
    });
};

export default GuardarFavorito;