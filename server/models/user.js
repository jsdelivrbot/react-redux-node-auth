const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model property configurations
const userSchema = new Schema({
	email: { 
		type: String, 
		unique: true,
		lowercase: true 
	},
	password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
	// store user model context
	const user = this;

	// generate a salt (random string), then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err); }

		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return next(err); }
			
			// overwrite plain text password with encrypted version
			user.password = hash;
			next(); // continue save operation
		})
	})
});

// Public methods on a user model object
userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) { return callback(err); }

		callback(null, isMatch); // no error, are passwords the same
	});
}

// Create the model class - load schema into mongoose & name the collection
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
