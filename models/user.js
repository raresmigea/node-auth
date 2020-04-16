const mongoose = require('mongoose');
const Schema = mongoose.Schema; //create a shortcut for the schema

//create a schema: how it will look inside the db (collection)
const userSchema = new Schema({
  //all the fields the user should have
  email: {
    type: String,
    required: true, //not mandatory to write this because Joi check it
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true //same as above
  }
});

//create a model
//1st arg: name of the model. will create +(s) in the collection
//2nd arg: the created schema from above
const User = mongoose.model('user', userSchema);

//export the model
module.exports = User;
