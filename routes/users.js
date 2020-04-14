
const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();	//it's better than previous because it wraps the code in try-catch by itself

const UserController = require('../controllers/users');

router.route('./singup')
	.post(UserController.singUp);

router.route('./singin')
	.post(UserController.singIn);

router.route('./secret')
	.get(UserController.secret);

module.exports = router;
