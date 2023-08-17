import { Router } from 'express';
import { addCarts, addProductsToCart, deleteAllProductsFromCart, deleteProductFromCart, getCartByIdPopulated, compra, updateCart, updateCartProduct,} from '../controllers/carts.controller.js';
import { ROLE_PREMIUM, ROLE_USER } from '../DAL/mongoDB/models/users.model.js';
import { authPremiumUserAddToCart, authRoles } from '../middlewares/auth.js';

const router = Router();

router.get('/:cid', getCartByIdPopulated);
router.post('/', addCarts);
router.post('/:cid/product/:pid', authRoles([ROLE_USER, ROLE_PREMIUM]), authPremiumUserAddToCart, addProductsToCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllProductsFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateCartProduct);
router.post('/:cid/compra', compra);

export default router;
