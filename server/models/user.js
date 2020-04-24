const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema; //create a shortcut for the schema

//create a schema: how it will look inside the db (collection)
const userSchema = new Schema({
  //all the fields the user should have
  email: {
    type: String,
    required: true, //not mandatory to write this because Joi check it
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true, //same as above
  },
});

//this function will run before save() is run
userSchema.pre('save', async function (next) {
  try {
    //generate a salt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);

    //reassign the password with the hashed password
    this.password = passwordHash;
    next(); //otherwise the request will hang on here
  } catch (error) {
    next(error);
  }
});

//a method to check if the introduced passwor matches the one from DB
userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    //1st arg: plain text pass, 2nd: hashed pass
    return await bcrypt.compare(newPassword, this.password); // returns boolean
  } catch (error) {
    //cannot access next(), create error & throw it
    throw new Error(error);
  }
};

//create a model
//1st arg: name of the model. will create +(s) in the collection
//2nd arg: the created schema from above
const User = mongoose.model('user', userSchema);

//export the model
module.exports = User;
