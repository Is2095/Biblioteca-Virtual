
import { coneccionBD, desconeccionBD } from "../data/index.js";

const BuscarUsuario = (req, res) => {

    const { email } = req.body;

    const db = coneccionBD();

    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            console.log('error al buscar el usuario', err);
        } else {
            desconeccionBD(db);
            res.status(200).json(result);
        }
    });
};

export default BuscarUsuario;