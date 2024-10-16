import Joi from 'joi';

export const SignUpJoiSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(1).required().messages({
      'string.base': `"First name" should be a type of 'text'`,
      'string.empty': `"First name" cannot be an empty field`,
      'any.required': `"First name" is a required field`,
    }),
    middle: Joi.string().allow(''), 
    last: Joi.string().min(1).required().messages({
      'string.base': `"Last name" should be a type of 'text'`,
      'string.empty': `"Last name" cannot be an empty field`,
      'any.required': `"Last name" is a required field`,
    }),
  }).required(),

  phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
    'string.pattern.base': `"Phone number" must be a 10 digit number`,
    'any.required': `"Phone number" is a required field`,
  }),

  email: Joi.string().email().required().messages({
    'string.email': `"Email" must be a valid email`,
    'string.empty': `"Email" cannot be an empty field`,
    'any.required': `"Email" is a required field`,
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': `"Password" should be a type of 'text'`,
    'string.empty': `"Password" cannot be an empty field`,
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'any.required': `"Password" is a required field`,
  }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': `"Confirm password" must match "Password"`,
    'any.required': `"Confirm password" is a required field`,
  }),

  image: Joi.object({
    url: Joi.string().allow(''), 
    alt: Joi.string().allow(''), 
  }),

  address: Joi.object({
    state: Joi.string().min(1).required().messages({
      'string.base': `"State" should be a type of 'text'`,
      'string.empty': `"State" cannot be an empty field`,
      'any.required': `"State" is a required field`,
    }),
    country: Joi.string().min(1).required().messages({
      'string.base': `"Country" should be a type of 'text'`,
      'string.empty': `"Country" cannot be an empty field`,
      'any.required': `"Country" is a required field`,
    }),
    city: Joi.string().min(1).required().messages({
      'string.base': `"City" should be a type of 'text'`,
      'string.empty': `"City" cannot be an empty field`,
      'any.required': `"City" is a required field`,
    }),
    street: Joi.string().min(1).required().messages({
      'string.base': `"Street" should be a type of 'text'`,
      'string.empty': `"Street" cannot be an empty field`,
      'any.required': `"Street" is a required field`,
    }),
    houseNumber: Joi.number().integer().positive().required().messages({
      'number.base': `"House number" should be a number`,
      'any.required': `"House number" is a required field`,
    }),
    zip: Joi.number().integer().positive().required().messages({
      'number.base': `"Zip code" should be a number`,
      'any.required': `"Zip code" is a required field`,
    }),
  }).required(),

  isBusiness: Joi.boolean().required(), 
});
