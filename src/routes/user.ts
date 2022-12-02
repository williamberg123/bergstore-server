import express from 'express';
import * as UserController from '../controllers/user';

import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/new', UserController.NewUser);

router.post('/authenticate', UserController.Authenticate);

router.delete('/:id', auth, UserController.DeleteUser);

export default router;
