import { Router } from 'express';
import {deleteInactiveUsers, deleteUser, getAllUsers, togglePremium,} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsers);//RUTA QUE TRAE TODOS LOS USUARIOS
router.post('/premium/:uid', togglePremium);//RUTA QUE CAMBIA USUARIO A PREMIUM
router.delete('/', deleteInactiveUsers);//RUTA QUE ELIMINA USUARIOS INACTIVOS
router.delete('/:uid', deleteUser);//RUTA QUE ELIMINA USUARIO

export default router;
