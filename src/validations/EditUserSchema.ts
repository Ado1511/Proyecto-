import Joi from "joi";

// Definición del esquema de validación para la edición de usuario
const EditUserSchema = Joi.object({
    name: Joi.object().keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().allow(""),
        last: Joi.string().min(2).max(256).required()
    }).required(),

    

    phone: Joi.string().pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/).message('must be a valid phone number').required(),

    

    image: Joi.object().keys({
        url: Joi.string().uri().allow("").message('must be a valid image URL'),
        alt: Joi.string().min(2).max(256).allow("")
    }).required(),

    address: Joi.object().keys({
        country: Joi.string().required(),
        state: Joi.string().allow(""),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().required(),
    }).required(),
});

export default EditUserSchema;
