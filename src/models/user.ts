import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { UserType } from '../@types/user';

interface UserInfo {
	email: string;
	password: string;
}

const UserSchema = new mongoose.Schema({
	id: String,
	email: String,
	password: String,
	shopping_cart_id: String,
});

const UserModel = mongoose.model('user', UserSchema);

export const createUser = async (userInfo: UserInfo): Promise<Document | null | undefined> => {
	try {
		const { email, password } = userInfo;
		const hash = bcrypt.hashSync(password, 10);

		const response: Document | null = await UserModel.create({
			email,
			password: hash,
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const findUserByKey = async (key: string, value: string): Promise<UserType | null | undefined> => {
	try {
		const response: UserType | null = await UserModel.findOne({
			[key]: value,
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const authenticate = async (hash: string, password: string): Promise<boolean | undefined> => {
	try {
		const result = await bcrypt.compare(password, hash);

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async (userId: string): Promise<UserType | null | undefined> => {
	try {
		const deletedUser: UserType | null = await UserModel.findByIdAndDelete(userId);

		return deletedUser;
	} catch (error) {
		console.log(error);
	}
};

export const addShoppingCartId = async (userId: string, shoppingCartId: string): Promise<UserType | null | undefined> => {
	try {
		let updatedUser: UserType | null = await UserModel.findByIdAndUpdate(userId, {
			shopping_cart_id: shoppingCartId,
		});

		updatedUser = await UserModel.findById(userId);

		return updatedUser;
	} catch (error) {
		console.log(error);
	}
};
