
import coneccionBD from '../data/index.js'

const obtenerLibros = (req, res) => {

    const categoria = req.query.categoria;

    const db = coneccionBD();

    db.query('SELECT id_categoria FROM categoria WHERE categoria = ?', [categoria], (err, result) => {
        if (err) {
            db.end()
            throw Error('error al consiguir los datos', err)
        } else {
            const id_categoria = result[0].id_categoria
            db.query('SELECT  libros.* FROM libros  WHERE id_categoria = ? ', [id_categoria], (err, resultLibros) => {
                if (err) {
                    db.end()
                    throw Error('error al consiguir los datos', err)
                } else {
                    db.query('SELECT favoritos.id_libro_f FROM favoritos', (err, resultFavoritos) => {
                        if (err) {
                            db.end()
                            throw Error('error al consiguir los datos', err)
                        } else {
                            let total = [...resultLibros, { favoritos: resultFavoritos }]
                            res.status(200).json(total)
                        }
                    })
                }
            });

        }

    })

}

export default obtenerLibros;