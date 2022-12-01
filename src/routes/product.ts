import express from 'express';
import { auth } from '../middlewares/auth';
import * as ProductController from '../controllers/product';

const router = express.Router();

router.post('/new', auth, ProductController.NewProduct);

router.get('/list_all', auth, ProductController.GetAllProductsInfo);

router.get('/:id/find', auth, ProductController.GetProductInfo);

router.post('/:id/edit', auth, ProductController.EditProductInfo);

router.post('/:id/delete', auth, ProductController.DeleteProduct);

// falta testar as rotas de editar e deletar produto

export default router;
