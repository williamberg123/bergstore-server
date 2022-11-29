import express from 'express';
const router = express.Router();

import * as UserController from '../controllers/user';

router.post('/new', UserController.NewUser);

router.post('/authenticate', UserController.Authenticate);

export default router;
