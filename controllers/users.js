const User = require('../models/user');

module.exports = {
	//Server side validation:
	//we want to validate data before it gets passes to these functions
	//we create a helper folder - routerHelpers - in this file, create functions
	//that will use the schema we will provide
	signUp: async (req, res, next) => {
		//will expect to get email & pasword from user
		const { email, password } = req.value.body;

		//check if there is a user with the same email
		const foundUser = await User.findOne({ email: email });
		if (foundUser) {
			return res.status(403).json({ error: 'email already used' }); //403 forbidden
		}

		//create new user
		const newUser = new User({ email, password });

		//save it to db
		await newUser.save();
		res.json({ user: 'created' });
	},
	signIn: async (req, res, next) => {
		//generate token
		//here it will be done by Passport.js - will validate the user
		console.log('signIn');
	},
	secret: async (req, res, next) => {
		//no validations here
		console.log('secret');
	}
}
