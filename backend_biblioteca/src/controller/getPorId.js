
import coneccionBD from "../data/index.js";

const obtenerLibroPorId = (id) => {

    const db = coneccionBD()
    db.query('SELECT * FROM libros WHERE id_libro = ?', [parseInt(id)], (err, result) => {
        if (err) {
            db.end();
            throw Error('error al conseguir el dato del libro')
        } else {
            db.end((err) => {
                if (err) {
                    console.log('error al desconectar');
                } else {
                    console.log('desconección correcta');
                    res.status(200).send(result)
                }
            })
        }
    })
}
export default obtenerLibroPorId;