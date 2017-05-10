const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
	// first param - data we want to encode
	// second param - encoding secret
	// sub (subject) & iat (issued at) are standard JWT properties
	const timestamp = new Date().getTime;
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
	// User already auth'd, just give them a token
	res.send({ token: tokenForUser(req.user) }); // req.user supplied by passport
}

exports.signup = function(req, res, next) {
	// Grab request data off req.body
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide an email and password!' });
	}

	// See if user with given email exists
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) { // db connection error
			return next(err);
		}

		// If a user with email already exists, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// If a user with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: password
		});

		user.save(err => {
			if (err) {
				return next(err);
			}

			// Respond to request with encrypted user id as token
			res.json({ token: tokenForUser(user) });
		});		
	});
}
