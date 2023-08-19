import { cartManager } from '../DAL/DAOs/cartsDaos/CartsManagerMongo.js';
import { productManager } from '../DAL/DAOs/productsDaos/ProductsManagerMongo.js';

export const getHome = async (req, res, next) => {
  try {
    res.render('home', { firstName: req.user.firstName });
  } catch (error) {next(error);}
};

export const getProducts = async (req, res, next) => {
  try {
    const { limit = 5, page = 0 } = req.query;
    const products = await productManager.findAll(limit, page, undefined, undefined, undefined, true);
    res.render('products', { firstName: req.user.firstName, products: products.docs, nextPage: products.nextPage, prevPage: products.prevPage,hasNextPage: products.hasNextPage, hasPrevPage: products.hasPrevPage, cartId: req.user.cart,});
  } catch (error) {next(error);}
};

export const getdashboardProducts = async (req, res, next) => {
  try {
    const products = await productManager.findAll(100, 0, undefined, undefined, undefined, true);
    if (req.user == undefined) {
      res.render('dashboardProducts', { products: products.docs });
    } else {
      res.render('dashboardProducts', { products: products.docs, firstName: req.user.firstName });
    }
  } catch (error) {next(error);
  }
};

export const getChat = async (req, res) => {
  res.render('chat', { firstName: req.user.firstName });
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartManager.findOneByIdPopulated(req.user.cart);
    cart.products.forEach((item) => (item.total = item.quantity * item.product.price));
    res.render('cart', { firstName: req.user.firstName,
      cartId: req.user.cart, 
      cartItems: cart.products.map((item) => ({productId: item.product._id, title: item.product.title, price: item.product.price, quantity: item.quantity, stock: item.product.stock })),
      cartTotal: cart.products.reduce((acc, curr) => (acc += curr.total), 0),
    });
  } catch (error) {next(error);}
};
