const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const router = express.Router();

router.post('/', async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role
	});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send({
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		role: user.role
	});
});

module.exports = router;