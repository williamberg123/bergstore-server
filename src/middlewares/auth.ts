import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['x-acess-token'] as string;

	if (!token) {
		return res.status(401).send({
			message: 'token is not provided',
		});
	}

	const isValid = jwt.decode(token, {
		complete: true,
		json: true,
	});

	if (!isValid?.payload?.id) {
		return res.status(401).send({
			message: 'token is invalid',
		});
	}

	next();
};
