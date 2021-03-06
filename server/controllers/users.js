import { sign } from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET } from '../configuration';

signToken = (user) => {
  return sign(
    {
      // 1st arg - { payload }, 2nd arg - secret key
      iss: 'myServer', // our server's name. optional
      sub: user._id, // the meaty part: code that connects the token with user
      iat: new Date().getTime(), // the time when the token was signed. optional
      exp: new Date().setDate(new Date().getDate() + 1), // expiration time. optional
    },
    JWT_SECRET
  );
};

export async function signUp(req, res, next) {
  // will expect to get email & pasword from user
  const { email, password } = req.value.body;
  // check if there is a user with the same email
  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    return res.status(403).json({ error: 'email already used' }); //403 forbidden
  }
  // create new user
  const newUser = new User({ email, password });
  // save it to db
  await newUser.save();
  // generate the token
  const token = signToken(newUser);
  // respond with token
  res.status(200).json({ token: token });
}
export async function signIn(req, res, next) {
  // generate token
  // here it will be done by Passport.js - will validate the user
  // check if the user exists & generate a token
  const token = signToken(req.user);
  res.status(200).json({ token: token });
  console.log('signIn');
}
export async function secret(req, res, next) {
  // no validations here
  console.log('secret');
  res.json({ secret: 'resource' });
}
