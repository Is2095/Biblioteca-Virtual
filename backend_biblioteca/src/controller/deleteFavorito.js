
import { coneccionBD, desconeccionBD } from '../data/index.js';

const BorrarFavorito = async (req, res) => {

    const id = req.params.id;

    const db = coneccionBD();

    db.query('SELECT libros.id_libro FROM libros WHERE libros.id = ?', [id], (err, result) => {
        if (err) {
            desconeccionBD(db);
            throw Error('error al conseguir el id del libro favorito');
        } else {
            db.query('DELETE FROM favoritos WHERE id_libro_f = ?', [result[0].id_libro], (err, result) => {
                if (err) {
                    desconeccionBD(db);
                    throw Error('error al borrar el favorito')
                } else {
                    db.query('DELETE FROM libros WHERE id = ?', [id], (err, result) => {
                        if (err) {
                            desconeccionBD(db);
                            throw Error('error al borrar el favorito')
                        } else {
                            desconeccionBD(db);
                            console.log('borrado con éxito')
                        };
                    });
                };
            });
        };
    });
};

export default BorrarFavorito;