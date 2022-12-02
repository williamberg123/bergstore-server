import mongoose from 'mongoose';

const AvaliationSchema = new mongoose.Schema({
	user_id: String,
	product_id: String,
	score: Number,
});

const AvaliationModel = mongoose.model('avaliation', AvaliationSchema);

export const newAvaliation = async (user_id: string, product_id: string, score: number) => {
	try {
		const avaliation = await AvaliationModel.create({
			user_id,
			product_id,
			score,
		});

		return avaliation;
	} catch (error) {
		console.log(error);
	}
};

export const findAvaliationsByProductId = async (product_id: string) => {
	try {
		const avaliations = await AvaliationModel.find({
			product_id,
		});

		return avaliations;
	} catch (error) {
		console.log(error);
	}
};

export const findAvaliation = async (user_id: string, product_id: string) => {
	try {
		const avaliation = await AvaliationModel.findOne({
			user_id,
			product_id,
		});

		return avaliation;
	} catch (error) {
		console.log(error);
	}
};
