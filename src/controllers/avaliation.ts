import { Request, Response } from 'express';
import * as Avaliation from '../models/avaliation';

export const NewAvaliation = async (req: Request, res: Response) => {
	try {
		const { user_id, product_id, score } = req.body;

		if (!user_id || !product_id || !score) {
			return res.status(400).send({
				message: 'missing data',
			});
		}

		const hasAlreadyAvaliated = await Avaliation.findAvaliation(user_id, product_id);

		if (hasAlreadyAvaliated) {
			return res.status(409).send({
				messagee: 'you cannot rate a product more than once',
			});
		}

		const newAvaliation = await Avaliation.newAvaliation(user_id, product_id, score);

		if (!newAvaliation) {
			return res.status(400).send({
				message: 'cannot create a new avaliation',
			});
		}

		return res.status(201).send();
	} catch (error) {
		console.log(error);

		return res.status(400).send();
	}
};

export const FindAvaliationsByProductId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const avaliations = await Avaliation.findAvaliationsByProductId(id);

		return res.status(200).json({
			avaliations,
		});
	} catch (error) {
		console.log(error);

		return res.status(400).send();
	}
};
