import { Request, Response } from 'express';
import * as ShoppingCart from '../models/shoppingCart';
import * as Product from '../models/product';

export const ListShoppingCartProducts = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const { products } = await ShoppingCart.findShoppingCart(id);
		console.log(products);

		if (!products.length) {
			return res.status(409).send({
				message: 'no products in this shopping cart',
			});
		}

		const productsInfo = await Promise.all([
			...products.map((product: { id: string }) => Product.findProductById(product.id)),
		]);

		return res.status(200).json({
			products: productsInfo,
		});
	} catch (error) {
		console.log(error);
	}
};
