import Joi from 'joi';

export const SignUpJoiSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().required().messages({
      'string.empty': `"First Name" is required`,
    }),
    middle: Joi.string().optional(),
    last: Joi.string().required().messages({
      'string.empty': `"Last Name" is required`,
    }),
  }),
  phone: Joi.string()
    .pattern(/^[0-9\s\-\(\)]+$/) // Permite solo números y algunos caracteres especiales
    .min(9) // Asegúrate de tener un mínimo de 10 dígitos
    .required()
    .messages({
      'string.pattern.base': `"Phone number" must be a valid phone number`,
      'string.min': `"Phone number" should have a minimum length of {#limit}`,
      'any.required': `"Phone number" is a required field`,
    }),
  email: Joi.string().email().required().messages({
    'string.email': `"Email" must be a valid email`,
    'string.empty': `"Email" is required`,
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': `"Password" should have a minimum length of {#limit}`,
    'string.empty': `"Password" is required`,
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': `"Confirm Password" must match "Password"`,
    'string.empty': `"Confirm Password" is required`,
  }),
  address: Joi.object({
    street: Joi.string().required().messages({
      'string.empty': `"Street" is required`,
    }),
    city: Joi.string().required().messages({
      'string.empty': `"City" is required`,
    }),
    state: Joi.string().required().messages({
      'string.empty': `"State" is required`,
    }),
    country: Joi.string().required().messages({
      'string.empty': `"Country" is required`,
    }),
    houseNumber: Joi.number().integer().min(1).required().messages({
      'number.base': `"House Number" must be a number`,
      'number.min': `"House Number" must be at least 1`,
      'any.required': `"House Number" is a required field`,
    }),
    zip: Joi.number().integer().required().messages({
      'number.base': `"Zip Code" must be a number`,
      'any.required': `"Zip Code" is a required field`,
    }),
  }),
  isBusiness: Joi.boolean().required(),
});
