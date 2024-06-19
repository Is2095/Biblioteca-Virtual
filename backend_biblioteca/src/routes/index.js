
import { Router } from "express";
import ObtenerLibros from '../controller/getLibros.js'
import GuardarFavorito from '../controller/postFavorito.js'
import BorrarFavorito from "../controller/deleteFavorito.js";
import PostFormUsuario from "../controller/postFormUsuario.js";
import BuscarUsuario from "../controller/buscarUsuarioPorEmail.js";
import BuscarFavoritos from "../controller/getFavoritos.js";

const router = Router()

router.get('/libros', ObtenerLibros)

router.get('/favoritos/:id_usuario', BuscarFavoritos)
// router.get('/libros/:id', (res, req) => {
//     const categoría = res.params.id
//     console.log('hola mundo', categoría);
// })
router.post('/formulario', PostFormUsuario)
router.post('/usuario', BuscarUsuario)
router.post('/favoritos', GuardarFavorito)
router.put('/', (req, res) => {})
router.delete('/:id', BorrarFavorito)

export default router;