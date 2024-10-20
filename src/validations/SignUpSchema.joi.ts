import Joi from 'joi';

// Esquema de validación para el registro
export const SignUpJoiSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().allow("").min(2).max(256), // Opcional, puede ser vacío
    last: Joi.string().min(2).max(256).required(),
  }).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(11)
    .required()
    .messages({
      'string.pattern.base': 'El teléfono solo puede contener números',
      'string.min': 'El número de teléfono debe tener al menos 9 dígitos',
      'string.max': 'El número de teléfono debe tener como máximo 11 dígitos',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Deshabilitar TLDs
    .min(5)
    .required()
    .messages({
      'string.email': 'Por favor, proporciona un correo electrónico válido',
      'string.min': 'El correo electrónico debe tener al menos 5 caracteres',
    }),
  password: Joi.string()
    .min(7)
    .max(20)
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 7 caracteres',
      'string.max': 'La contraseña no puede tener más de 20 caracteres',
      'string.pattern.base': 'La contraseña debe contener al menos un número y un carácter especial',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Las contraseñas deben coincidir',
    }),
  image: Joi.object({
    url: Joi.string().uri().allow(""), // URL opcional
    alt: Joi.string().min(2).max(256).allow(""), // Texto alternativo opcional
  }).optional(),
  address: Joi.object({
    state: Joi.string().allow("").min(2).max(256), // Opcional
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).required(), // Se asume que la casa tiene un número válido
    zip: Joi.number().optional() // Cambia según el formato de código postal
  }).required(),
  isBusiness: Joi.boolean().required(),
});

