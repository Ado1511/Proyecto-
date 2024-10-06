import Joi from 'joi';

export const SignUpJoiSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.base': `Name should be a type of 'text'`,
    'string.empty': `Name cannot be an empty field`,
    'any.required': `Name is a required field`
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.base': `Email should be a type of 'text'`,
    'string.empty': `Email cannot be an empty field`,
    'string.email': `Email must be a valid email`,
    'any.required': `Email is a required field`
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': `Passwords must match`,
    'any.required': `Confirm password is required`,
  }),
});
