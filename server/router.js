const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Passport Auth Middlewares
// - authenticate using the JWT strategy, and don't create a session (used for cookie-auth)
const requireAuth = passport.authenticate('jwt', { session: false });
// - authenticate using the local strategy, and don't create a session
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
	// forward requests to route handlers in controller files

	// request JWT authentication
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is ABC123' });
	});

	// email/password (local) authentication
	app.post('/signin', requireSignIn, Authentication.signin);

	// no authentication
	app.post('/signup', Authentication.signup);
}