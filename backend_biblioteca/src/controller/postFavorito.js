
import coneccionBD from '../data/index.js';

const guardarFavorito = async (req, res) => {

    const id = req.params.id;

    const db = coneccionBD();

    db.query('SELECT * FROM libros WHERE id_libro = ?', [parseInt(id)], (err, result) => {
        if (err) {
            db.end();
            throw Error('error al conseguir el dato del libro')
        } else {
            if (result) {
                db.query('INSERT IGNORE INTO favoritos (id_libro_f) VALUES (?)', [parseInt(id)], (err, result) => {
                    if (err) {
                        console.log('error al guardar el favorito', err);
                    } else {
                        db.end()
                        console.log('favorito guardado');
                    };
                });
            } 
        }
    })
};

export default guardarFavorito;