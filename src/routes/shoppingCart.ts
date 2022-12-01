import express from 'express';

import * as ShoppingCartController from '../controllers/shoppingCart';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/:id/list', auth, ShoppingCartController.ListShoppingCartProducts);

router.post('/:id/add_product', auth, ShoppingCartController.AddProductToShoppingCart);

router.post('/:id/change_product_amount', auth, ShoppingCartController.ChangeAmountProduct);

export default router;
