import { Router } from 'express';
const router = Router();
import { authenticate } from 'passport';
// import passportConf from '../passport';

import { validateBody, schemas } from '../helpers/routerHelpers';
import { signUp, signIn, secret } from '../controllers/users';

// client makes a request - will be a body with data
// will call validateBody - if it is ok
// will call it in controllers/signup
// if it's not ok - will return 400 and controller will not be called
router.route('/signup').post(validateBody(schemas.authSchema), signUp);

// done by Passport.js
router
  .route('/signin')
  .post(
    validateBody(schemas.authSchema),
    authenticate('local', { session: false }),
    signIn
  );

// no need of validation here
// we hold the token so we can access the data
router.route('/secret').get(authenticate('jwt', { session: false }), secret);

export default router;
