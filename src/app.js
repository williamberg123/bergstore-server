import express from 'express';
// import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mongoose from 'mongoose';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb+srv://williamberg:q14Wbm8vzTiKcA8Q@cursojs1.8sqcr.mongodb.net/bergstore?retryWrites=true&w=majority')
	.then(() => {
		app.listen(5555, () => {
			console.log('Servidor rodando na porta: http://localhost:5555/')
		})
	})
	.catch((err) => {
		console.log(err);
	})

export default app;
