import express from 'express';
import { perfil, registrar, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPass, actualizarPerfil, actualizarPassword } from '../controllers/veterinarioController.js';
import checkout from '../middleware/authMiddleware.js';

const router = express.Router();
// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPass);

// Area privada
router.get('/perfil', checkout, perfil);
router.put('/perfil/:id', checkout, actualizarPerfil);
router.put('/actualizar-password', checkout, actualizarPassword)

export default router;