import mongoose from 'mongoose';
import { ProductType } from '../@types/product';

const ProductSchema = new mongoose.Schema({
	name: String,
	price: Number,
	description: String,
	imageUrl: String,
});

const ProductModel = mongoose.model('product', ProductSchema);

export const findProductById = async (id: string): Promise<ProductType | null | undefined> => {
	try {
		const product: ProductType | null = await ProductModel.findById(id);

		return product;
	} catch (error) {
		console.log(error);
	}
};
