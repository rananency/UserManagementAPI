const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string().pattern(/^[A-Za-z]+$/).required().messages({
    'string.pattern.base': 'First name should contain only alphabets',
  }),
  lastName: Joi.string().pattern(/^[A-Za-z]+$/).required().messages({
    'string.pattern.base': 'Last name should contain only alphabets',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
  }),
  age: Joi.number().min(0).required().messages({
    'number.min': 'Age must be a non-negative number',
  }),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
