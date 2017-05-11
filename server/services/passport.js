const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

// Create local strategy - authentication using email/password (no token)
const localOptions = {
	usernameField: 'email' // tell passport which property of request to use for the 'username'
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	// Verify the email and password, call done with user if correct, otherwise call done with false
	User.findOne({ email: email }, function(err, user) {
		if (err) {
			return done(err); 
		}
		if (!user) {		 
			return done(null, false);
		}

		// compare passwords: salt + request.password = user.password (from db) ?
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user); // passport will assign the user object to req.user
		})
	});
});

// Setup options for JWT Strategy
const jwtOptions = {
	// Tell strategy where to look on the request object for the JWT (header)
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy
// payload = decoded jwt token
// done = completion callback
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if user ID exists in database.
	// If it does, call 'done' with that user object.
	// Otherwise, call 'done' without a user.
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); } // db connection error

		if (user) {
			done(null, user); // no error, user found
		} else {
			donr(null, false); // no error, no user found
		}
	})
});

// Tell passport to use our strategies
passport.use(jwtLogin);
passport.use(localLogin);
