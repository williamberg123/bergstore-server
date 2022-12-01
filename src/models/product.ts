import mongoose from 'mongoose';
import { ProductType } from '../@types/product';

const ProductSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: Number,
	image_url: String,
});

const ProductModel = mongoose.model('product', ProductSchema);

export const createNewProduct = async (productInfo: ProductType) => {
	try {
		const newProduct = await ProductModel.create(productInfo);

		return newProduct;
	} catch (error) {
		console.log(error);
	}
};

export const findProductById = async (id: string): Promise<ProductType | null | undefined> => {
	try {
		const product: ProductType | null = await ProductModel.findById(id);

		return product;
	} catch (error) {
		console.log(error);
	}
};

export const findAll = async () => {
	try {
		const products = await ProductModel.find();

		return products;
	} catch (error) {
		console.log(error);
	}
};

export const editProduct = async (id: string, updatedProductInfo: ProductType) => {
	try {
		const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedProductInfo);

		return updatedProduct;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id: string) => {
	try {
		const deletedProduct = await ProductModel.findByIdAndDelete(id);

		return deletedProduct;
	} catch (error) {
		console.log(error);
	}
};
