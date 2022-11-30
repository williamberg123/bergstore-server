import express from 'express';

import * as ShoppingCartController from '../controllers/shoppingCart';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/list/:id', auth, ShoppingCartController.ListShoppingCartProducts);

export default router;
