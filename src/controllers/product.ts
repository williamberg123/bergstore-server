import { Request, Response } from 'express';
import * as Product from '../models/product';

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

export const GetProductInfo = async (req: Request, res: Response) => {
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

export const GetAllProductsInfo = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll();

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

export const EditProductInfo = async (req: Request, res: Response) => {
	try {
		const { id: product_id } = req.params;
		const updatedInfo = req.body;

		if (!product_id || !updatedInfo) {
			return res.status(400).send({
				message: 'missing data',
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
				message: 'cannot delete product',
			});
		}

		return res.status(200).send();
	} catch (error) {
		console.log(error);

		return res.status(400).send();
	}
};
