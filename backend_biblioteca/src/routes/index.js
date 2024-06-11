
import { Router } from "express";
import obtenerLibros from '../controller/getLibros.js'
import guardarFavorito from '../controller/postFavorito.js'
import borrarFavorito from "../controller/deleteFavorito.js";

const router = Router()

router.get('/libros', obtenerLibros)
// router.get('/libros/:id', (res, req) => {
//     const categoría = res.params.id
//     console.log('hola mundo', categoría);
// })
router.post('/:id', guardarFavorito)
router.put('/', (res, req) => {})
router.delete('/:id', borrarFavorito)

export default router;