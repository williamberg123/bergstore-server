import * as User from '../models/user';

export const NewUser = async (req, res) => {
	try {
		const { email } = req.body;
		const response = await User.findUserByEmail(email);

		if (response) {
			return res.status(409).send({
				message: 'this email is already in use'
			});
		}

		const user = await User.createUser(req.body);

		return res.status(201).json({
			user
		});
	} catch (error) {
		console.log(error);
	}
};

export const Authenticate = async (req, res) => {
	try {
		const { email, password } = req.body;
		const response = await User.findUserByEmail(email);

		if (response) {
			return res.status(409).send({
				message: 'this email is already in use'
			});
		}

		const user = await User.createUser(req.body);

		return res.status(201).json({
			user
		});
	} catch (error) {
		console.log(error);
	}
};

export const DeleteUser = async () => {};
