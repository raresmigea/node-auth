const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy; //sign up
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy; // sign in
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

//JWT Strategy
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), //where the token will be contained
  secretOrKey: JWT_SECRET //the secret
}, async (payload, done) => {
  try {
    //take the data from the payload, find the user and return it
    const user = await User.findById(payload.sub);

    //if user doesn't exist - handle it
    if(!user) {
      return done(null, false);
    }

    //otherwise - return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

//LOCAL Strategy
passport.use( new LocalStrategy({ // interested in which way the user should be authorized
  usernameField: 'email'

}, async (email, password, done) => {
  try {
    //find the user by email
    const user = await User.findOne({ email: email });

    //if not - handle it
    if(!user) {
      return done(null, false);
    }
    //check if the password is correct
    const isMatch = await user.isValidPassword(password);

    //if not - handle it
    if (!isMatch) {
      return done(null, false);
    }
    //return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }

}));
