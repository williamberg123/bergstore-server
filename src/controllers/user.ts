import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as User from '../models/user';
import * as ShoppingCart from '../models/shoppingCart';

export const NewUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).send({
				message: 'no data',
			});
		}

		const isAlready = await User.findUserByKey('email', email);

		if (isAlready) {
			return res.status(409).send({
				message: 'this email is already in use',
			});
		}

		const user = await User.createUser(req.body);

		if (!user) {
			return res.status(400).send({
				message: 'cannot create a new user',
			});
		}

		const newShoppingCart = await ShoppingCart.createShoppingCart();

		const updatedUser = await User.addShoppingCartId(user?._id, newShoppingCart?._id);

		if (!updatedUser) {
			return res.status(400).send({
				message: 'cannot create the shopping cart',
			});
		}

		const token = jwt.sign({ id: updatedUser._id }, process.env.SECRET, {
			expiresIn: 86400,
		});

		return res.status(201).json({
			user: updatedUser,
			token,
		});
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const Authenticate = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const userResponse = await User.findUserByKey('email', email);

		if (!userResponse) {
			return res.status(404).send({
				message: 'email or password incorrect',
			});
		}

		const hash = userResponse.password;
		const user = await User.authenticate(hash, password);

		if (!user) {
			return res.status(404).send({
				message: 'email or password incorrect',
			});
		}

		const token = jwt.sign({ id: userResponse._id }, process.env.SECRET, {
			expiresIn: 86400,
		});

		return res.status(200).json({
			user: userResponse,
			token,
		});
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const DeleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		const token = req.headers['x-acess-token'];

		const jwtDecoded = jwt.decode(token as string, {
			complete: false,
			json: true,
		});

		if (id !== jwtDecoded?.id) {
			return res.status(401).send({
				message: 'user not authorized',
			});
		}

		const deletedUser = await User.deleteUser(id);

		if (!deletedUser) return res.status(409).send({ message: 'user not found' });

		const deletedShoppingCart = await ShoppingCart.deleteShoppingCart(deletedUser?.shopping_cart_id);

		if (deletedUser && deletedShoppingCart) {
			return res.status(200).send();
		}
		return res.status(400).send();
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};
