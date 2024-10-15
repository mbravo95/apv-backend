import express from 'express';
import { agregarPaciente, obtenerPaciente, obtenerPaciente2, actualizarPaciente, borrarPaciente } from '../controllers/pacienteController.js';
import checkout from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .post(checkout, agregarPaciente)
    .get(checkout, obtenerPaciente);

router.route('/:id')
    .get(checkout, obtenerPaciente2)
    .put(checkout, actualizarPaciente)
    .delete(checkout, borrarPaciente);


export default router;