import { Router } from 'express';
import {deleteInactiveUsers, deleteUser, getAllUsers, changeRole, uploadFiles} from '../controllers/users.controller.js';
import { authOwnResource } from '../middlewares/auth.js';
import { uploader } from '../utils/multer.js';

const router = Router();

router.get('/', getAllUsers);//RUTA QUE TRAE TODOS LOS USUARIOS
router.post('/premium/:uid', changeRole);//RUTA QUE CAMBIA USUARIO A PREMIUM
router.post('/:uid/documents', authOwnResource, uploader.array('files'), uploadFiles);//RUTA PARA SUBIR ARCHIVOS CON MULTER
router.delete('/', deleteInactiveUsers);//RUTA QUE ELIMINA USUARIOS INACTIVOS
router.delete('/:uid', deleteUser);//RUTA QUE ELIMINA USUARIO

export default router;
