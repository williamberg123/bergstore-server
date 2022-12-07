import { Request, Response } from 'express';
import * as Product from '../models/product';
import * as ShoppingCart from '../models/shoppingCart';

export const NewProduct = async (req: Request, res: Response) => {
	try {
		const productInfo = req.body;

		await Product.createNewProduct(productInfo);

		return res.status(201).send();
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const FindProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findProductById(id);

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const FindAllProducts = async (req: Request, res: Response) => {
	try {
		const { id: shopping_cart_id } = req.params;

		const [allProducts, shoppingCart] = await Promise.all([
			Product.findAll(),
			ShoppingCart.findShoppingCart(shopping_cart_id),
		]);

		const products = allProducts?.map((p) => {
			const hasAdded = shoppingCart?.products?.find(({ product_id }) => product_id === String(p._id));

			if (hasAdded) {
				return {
					...p._doc,
					hasAlreadyAdded: true,
				};
			}

			return {
				...p._doc,
				hasAlreadyAdded: false,
			};
		});

		return res.status(200).json({
			products,
		});
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const EditProduct = async (req: Request, res: Response) => {
	try {
		const { id: product_id } = req.params;
		const updatedInfo = req.body;

		if (!product_id || !updatedInfo) {
			return res.status(400).send({
				message: 'missing data',
			});
		}

		const product = await Product.findProductById(product_id);

		if (!product) {
			return res.status(400).send({
				message: 'product not found',
			});
		}

		await Product.editProduct(product_id, updatedInfo);

		return res.status(200).send();
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const DeleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedProduct = await Product.deleteProduct(id);

		if (!deletedProduct) {
			return res.status(400).send({
				message: 'product not found',
			});
		}

		return res.status(200).send();
	} catch (error) {
		console.log(error);

		return res.status(400).send();
	}
};
