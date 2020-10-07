const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = (req, res, next) => {
	try {
		// const token = req.cookies.token; // to work with "postman"
		const token = req.headers.authorization; // work with client side

		jwt.verify(token, keys.secretOrKey, (err, decodedPayload) => {
			if (err) {
				res.status(401).json({ message: "Invalid credentials there" });
			}
			req.token = decodedPayload;
			next();
		})
	} catch {
		res.status(401).json({ message: "Invalid credentials here" });
	}
}
