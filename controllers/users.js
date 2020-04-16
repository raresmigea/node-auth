module.exports = {
	//Server side validation:
	//we want to validate data before it gets passes to these functions
	//we create a helper folder - routerHelpers - in this file, create functions
	//that will use the schema we will provide
	signUp: async (req, res, next) => {
		//will expect to get email & pasword from user
		console.log('contents of req.value.body:', req.value.body);
		console.log('signUp');
	},
	signIn: async (req, res, next) => {
		//here it will be done by Passport.js - will validate the user
		//generate token
		console.log('signIn');
	},
	secret: async (req, res, next) => {
		//no validations here
		console.log('secret');
	}
}
