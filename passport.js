const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy; //sign up
const { ExtractJwt } = require('passport-jwt');
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
