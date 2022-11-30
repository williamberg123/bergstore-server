import { Request, Response } from 'express';
import * as ShoppingCart from '../models/shoppingCart';
import * as Product from '../models/product';

export const AddProductToShoppingCart = async (req: Request, res: Response) => {
	try {
		const { id: shoppingCartId } = req.params;
		const { id: productId } = req.body;

		const { products } = await ShoppingCart.findShoppingCart(shoppingCartId);

		const isAlready = products.includes({
			id: productId,
		});

		if (isAlready) {
			return res.status(409).send({
				message: 'product is already in this shopping cart',
			});
		}

		const updatedShoppingCart = await ShoppingCart.addProductToShoppingCart(shoppingCartId, req.body);

		if (!updatedShoppingCart) {
			return res.status(400).send({
				message: 'cannot add product',
			});
		}

		return res.status(200).send();
	} catch (error) {
		console.log(error);
	}
};

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
