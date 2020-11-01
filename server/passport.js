import { use } from 'passport';
import { Strategy as jwtStrategy } from 'passport-jwt'; // sign up
import { ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local'; // sign in
import { JWT_SECRET } from './configuration';
import { findById, findOne } from './models/user';

// JWT Strategy
use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'), // where the token will be contained
      secretOrKey: JWT_SECRET, //the secret
    },
    async (payload, done) => {
      try {
        // take the data from the payload, find the user and return it
        const user = await findById(payload.sub);

        // if user doesn't exist - handle it
        if (!user) {
          return done(null, false);
        }

        // otherwise - return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// LOCAL Strategy
use(
  new LocalStrategy(
    {
      // interested in which way the user should be authorized
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // find the user by email
        const user = await findOne({ email: email });

        // if not - handle it
        if (!user) {
          return done(null, false);
        }
        // check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // if not - handle it
        if (!isMatch) {
          return done(null, false);
        }
        // return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
