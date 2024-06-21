
import { coneccionBD, desconeccionBD } from '../data/index.js';

const BorrarFavoritoBD = async (req, res) => {

    const { id, id_usuario } = req.body;

    const db = coneccionBD();

    db.query('SELECT libros.id_libro, favoritos.id_favorito FROM favoritos, libros WHERE libros.id_libro = favoritos.id_libro_f && libros.id = ?', [id, id_usuario], (err, result) => {
        if (err) {
            throw Error('error al buscar datos', err)
        } else {
            if (result.length === 1) {
                db.query('select libros.id_libro, favoritos.id_favorito from favoritos, libros WHERE libros.id_libro = favoritos.id_libro_f && libros.id = ? && id_usuario_f = ?', [id, id_usuario], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        throw Error('error al conseguir el id del libro favorito');
                    } else {
                        try {
                            db.beginTransaction();
                            db.query('DELETE FROM favoritos WHERE id_favorito = ?', [result[0].id_favorito]);
                            db.query('DELETE FROM libros WHERE id_libro = ?', [result[0].id_libro]);
                            db.commit();
                            console.log('eliminación de favoritos exitosa');
                        } catch (error) {
                            db.rollback();
                            console.log('error al eliminar el favorito', error);
                        } finally {
                            desconeccionBD(db);
                        }
                    };
                });
            } else {
                const idLibro = result[0].id_libro
                db.query('DELETE FROM favoritos WHERE id_libro_f = ? && id_usuario_f = ?', [idLibro, id_usuario], (err, result) => {
                    if(err) {
                        throw Error('error al eliminar el favorito', err)
                    } else {
                        console.log('se eliminó de favorito');
                    }
                });

            }
        }
    })


};

export default BorrarFavoritoBD;