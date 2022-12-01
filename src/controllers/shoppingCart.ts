import { Request, Response } from 'express';
import * as ShoppingCart from '../models/shoppingCart';
import * as Product from '../models/product';

export const AddProductToShoppingCart = async (req: Request, res: Response) => {
	try {
		const { id: shoppingCartId } = req.params;
		const { product_id } = req.body;

		const shoppingCart = await ShoppingCart.findShoppingCart(shoppingCartId);

		if (!shoppingCart) {
			return res.status(400).send({
				message: 'shopping cart not found',
			});
		}

		const { products } = shoppingCart;

		const isAlready = products.find((product: { product_id: string }) => product.product_id === product_id);

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

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const ListShoppingCartProducts = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const shoppingCart = await ShoppingCart.findShoppingCart(id);

		if (!shoppingCart) {
			return res.status(400).send({
				message: 'shopping cart not found',
			});
		}

		const { products } = shoppingCart;

		console.log('products', products);

		let productsInfo = await Promise.all([
			...products.map((product: { product_id: string }) => Product.findProductById(product?.product_id)),
		]);

		productsInfo = productsInfo.map((p, index) => ({ ...p._doc, count: products[index]?.count }));

		return res.status(200).json({
			products: productsInfo,
		});
	} catch (error) {
		console.log(error);

		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};

export const ChangeAmountProduct = async (req: Request, res: Response) => {
	try {
		const { id: shoppingCartId } = req.params;
		const { product_id, amount } = req.body;

		const shoppingCart = await ShoppingCart.findShoppingCart(shoppingCartId);

		if (!shoppingCart) {
			return res.status(400).send({
				message: 'shopping cart not found',
			});
		}

		const { products } = shoppingCart;

		const isAlready = products.find((product: { product_id: string }) => product.product_id === product_id);

		if (!isAlready) {
			return res.status(409).send({
				message: 'product is not in this shopping cart',
			});
		}

		if (isAlready.count + amount < 1) {
			return res.status(400).send({
				message: 'unexpected action',
			});
		}

		const updatedShoppingCart = await ShoppingCart.updateShoppingCartProductAmount(shoppingCartId, req.body);

		if (!updatedShoppingCart) return res.status(400).send({ message: 'cannot update product amount' });

		return res.status(200).send();
	} catch (error) {
		return res.status(400).send({
			message: 'unexpected error',
		});
	}
};
