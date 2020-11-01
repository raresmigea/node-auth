const Joi = require('joi'); // helps validating the schema

module.exports = {
  // everything will be exported
  validateBody: (schema) => {
    // one function - takes a schema as arg
    return (req, res, next) => {
      // check the data
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error); //pass it to client
      }
      // if no error - attach to req obj a prop called value
      // & to value - a prop called body
      // it will be: req.value.body instead of req.body
      if (!req.value) {
        req.value = {}; //initialize it if doesn't exist
      }
      req.value['body'] = result.value;
      next(); // if no next(), it will blocked & wouldn't pass the controller
    };
  },

  schemas: {
    // an obj that will contain all the needed schemas in this proj
    authSchema: Joi.object().keys({
      // here all the props to be validated
      email: Joi.string().email().required(),
      password: Joi.string().required(), // can add constraints on it
    }),
  },
};
