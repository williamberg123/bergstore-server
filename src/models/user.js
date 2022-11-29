import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema({
	id: String,
	email: String,
	password: String
});

const UserModel = mongoose.model('user', UserSchema);

export const createUser = async (userInfo) => {
	try {
		const { email, password } = userInfo;

		bcrypt.hash(password, 10, async (err, hash) => {
			const response = await UserModel.create({
				email,
				password: hash
			});
			return response;
		})
	} catch (error) {
		console.log(error);
	}
};

export const findUserByEmail = async (email) => {
	const response = await UserModel.findOne({
		email
	});

	return response;
};

export const authenticate = async () => {};
