
import coneccionBD from '../data/index.js';

const borrarFavorito = async (req, res) => {

    const id = req.params.id;

    const db = coneccionBD();

    db.query('DELETE FROM favoritos WHERE id_libro_f = ?', [parseInt(id)], (err, result) => {
        if (err) {
            db.end();
            throw Error('error al borrar el favorito')
        } else {
            console.log('borrado con éxito')
        };
    });
};

export default borrarFavorito;