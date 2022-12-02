import express from 'express';
import { auth } from '../middlewares/auth';
import * as AvaliationController from '../controllers/avaliation';

const router = express.Router();

router.post('/new', auth, AvaliationController.NewAvaliation);

router.get('/find/product/:id', auth, AvaliationController.FindAvaliationsByProductId);

export default router;
