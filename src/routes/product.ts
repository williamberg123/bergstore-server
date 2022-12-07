import express from 'express';
import { auth } from '../middlewares/auth';
import * as ProductController from '../controllers/product';

const router = express.Router();

router.post('/new', auth, ProductController.NewProduct);

router.get('/list_all/shoppingcart/:id', auth, ProductController.FindAllProducts);

router.get('/:id/find', auth, ProductController.FindProduct);

router.post('/:id/edit', auth, ProductController.EditProduct);

router.delete('/:id', auth, ProductController.DeleteProduct);

export default router;
