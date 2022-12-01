import mongoose, { Document } from 'mongoose';
import { ShoppingCartType } from '../@types/shoppingCart';

const ShoppingCartSchema = new mongoose.Schema({
	products: [],
});

const ShoppingCartModel = mongoose.model('shoppingcart', ShoppingCartSchema);

export const createShoppingCart = async (): Promise<Document | null | undefined> => {
	try {
		const shoppingCart: Document = await ShoppingCartModel.create({
			products: [],
		});

		return shoppingCart;
	} catch (error) {
		console.log(error);
	}
};

export const findShoppingCart = async (id: string): Promise<Document<string, any, ShoppingCartType> | null | undefined> => {
	try {
		const response: Document<string, any, ShoppingCartType> | null = await ShoppingCartModel.findById(id);

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const deleteShoppingCart = async (id: string): Promise<Document | null | undefined> => {
	try {
		const deletedShoppingCart: Document | null = await ShoppingCartModel.findByIdAndDelete(id);

		return deletedShoppingCart;
	} catch (error) {
		console.log(error);
	}
};

export const addProductToShoppingCart = async (
	shoppingCartId: string,
	product: { id: string, count: number },
): Promise<ShoppingCartType | null | undefined> => {
	try {
		const { products } = await findShoppingCart(shoppingCartId);

		const updatedShoppingCart: ShoppingCartType | null = await ShoppingCartModel.findByIdAndUpdate(shoppingCartId, {
			products: [
				...products,
				product,
			],
		});

		return updatedShoppingCart;
	} catch (error) {
		console.log(error);
	}
};
