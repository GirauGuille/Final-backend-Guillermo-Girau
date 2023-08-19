import { Router } from 'express';
import { getCart, getChat, getHome, getProducts, getdashboardProducts } from '../controllers/views.controller.js';
import { authAdmin, authUser } from '../middlewares/auth.js';
import { adminManager } from '../controllers/users.controller.js';

const router = Router();

router.get('/', getHome);
router.get('/cart', getCart);
router.get('/products', getProducts);
router.get('/users', authAdmin, adminManager);//VISTA DE TODOS LOS USUARIOS ROLES. authAdmin es el middleware que da el paso a los de roll admin a acceder.
router.get('/dashboardProducts', getdashboardProducts);// VISTA DE TABLA DE CONTROL DE LOS PRODUCTOS
router.get('/chat', authUser, getChat);

export default router;
