
const express = require('express');
const router = express.Router();
// const router = require('express-promise-router')();	//it's better than previous because it wraps the code in try-catch by itself

const { validateBody, schemas } = require('../helpers/routerHelpers');
const UserController = require('../controllers/users');

//client makes a request - will be a body with data
//will call validateBody - if it is ok
//will call it in controllers/signup
//if it's not ok - will return 400 and controller will not be called
router.route('/signup')
	.post(validateBody(schemas.authSchema), UserController.signUp);

//done by Passport.js
router.route('/signin')
	.post(UserController.signIn);

//no need of validation here
router.route('/secret')
	.get(UserController.secret);

module.exports = router;
