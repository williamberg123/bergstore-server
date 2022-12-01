import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRouter from './routes/user';
import shoppingCartsRouter from './routes/shoppingCart';
import productsRouter from './routes/product';

dotenv.config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/shoppingcarts', shoppingCartsRouter);
app.use('/products', productsRouter);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('Servidor rodando na porta: http://localhost:5555/');
		});
	})
	.catch((err) => {
		console.log(err);
	});

export default app;
