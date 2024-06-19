
import { coneccionBD, desconeccionBD } from "../data/index.js";

const BuscarFavoritos = (req, res) => {

    const { id_usuario } = req.params;

    const db = coneccionBD();

    db.query('SELECT l.id FROM libros l JOIN favoritos f ON l.id_libro = f.id_libro_f WHERE f.id_usuario_f = ?', [id_usuario], (err, result) => {
        if (err) {
            desconeccionBD(db);
            throw Error('error al hacer JOIN a favoritos');
        } else {
            desconeccionBD(db);
            res.status(200).json(result);
        };
    });

};
export default BuscarFavoritos;