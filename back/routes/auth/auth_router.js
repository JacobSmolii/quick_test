const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const User = require("../../models/Users");

router.post('/register', (req, res) => {
	const credentials = req.body;
	credentials.password = bcrypt.hashSync(credentials.password, 12)

	User
		.findOne({ name: credentials.name })
		.then(user => {
			if (user)
				return res.status(400).json({ name: "Name already exists" });
			else {
				const newUser = new User({
					name: credentials.name,
					password: credentials.password
				})
				newUser
					.save()
					.then(user => res.send(user))
					.catch(err => console.log('register', err));
			}
		})
})

router.post('/login', (req, res) => {
	const { name, password } = req.body;

	User
		.findOne({ name })
		.then(user => {
			if (!user)
				return res.status(404).json({ namenotfound: "User not found" });

			const token = generateToken(user);
			res.cookie('token', token); // sets the token in request.headers.cookie
			res.status(200).json({ message: `Welcome back ${user.name}`, token: token })
		})
		.catch(() => res.status(401).json({ err: "Invalid name or password at this step" }))
})

function generateToken(user) {
	const payload = {
		id: user.id,
		name: user.name
	}

	const options = {
		expiresIn: "8h"
	}

	return jwt.sign(payload, keys.secretOrKey, options);
}

module.exports = router;
