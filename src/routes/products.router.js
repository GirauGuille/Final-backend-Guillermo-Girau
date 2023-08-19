import { Router } from 'express';
import {addProducts, deleteProducts, deleteProductById, getProductById, getProducts, updateProduct,} from '../controllers/products.controller.js';
import { authAdmin, authProductOwnerOrAdmin, authRoles } from '../middlewares/auth.js';
import { ROLE_ADMIN, ROLE_PREMIUM } from '../DAL/mongoDB/models/users.model.js';

const router = Router();

router.get('/', getProducts);//RUTA PARA TRAER TODOS LOS PRODUCTOS 
router.get('/:pid', getProductById);//RUTA PARA TRAER A UN PRODUCTO
router.post('/', authRoles([ROLE_ADMIN, ROLE_PREMIUM]), addProducts);//RUTA PARA SUBIR UN PRODUCTO
router.put('/:pid', authProductOwnerOrAdmin, updateProduct);// RUTA PARA ACTUALIZAR PRODUCTO
router.delete('/:pid', authProductOwnerOrAdmin, deleteProductById); //RUTA PARA ELIMINAR PRODUCTO
router.delete('/', authAdmin, deleteProducts); //RUTA PARA ELIMINAR TODOS LOS PRODUCTOS

export default router;
