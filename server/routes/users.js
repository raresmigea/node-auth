const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routerHelpers');
const UserController = require('../controllers/users');

//client makes a request - will be a body with data
//will call validateBody - if it is ok
//will call it in controllers/signup
//if it's not ok - will return 400 and controller will not be called
router
  .route('/signup')
  .post(validateBody(schemas.authSchema), UserController.signUp);

//done by Passport.js
router
  .route('/signin')
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate('local', { session: false }),
    UserController.signIn
  );

//no need of validation here. we hold the token so we can access the data
router
  .route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UserController.secret);

module.exports = router;
