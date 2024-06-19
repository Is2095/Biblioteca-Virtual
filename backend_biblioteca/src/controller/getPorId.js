
import { coneccionBD, desconeccionBD }from "../data/index.js";

const obtenerLibroPorId = (id) => {

    const db = coneccionBD();
    db.query('SELECT * FROM libros WHERE id_libro = ?', [parseInt(id)], (err, result) => {
        if (err) {
            desconeccionBD(db);
            throw Error('error al conseguir el dato del libro');
        } else {
            desconeccionBD(db);
            res.status(200).send(result);
        };
    });
};
export default obtenerLibroPorId;