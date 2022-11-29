import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({
		id: '3284fd45954gj548',
		username: 'wi_diogo',
		password: '123456789'
	})
})

export default router;
