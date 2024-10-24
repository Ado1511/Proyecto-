import Joi from "joi";

const EditUserSchema = Joi.object({
    name: Joi.object().keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().allow(""),
        last: Joi.string().min(2).max(256).required()
    }).required(),

    phone: Joi.string()
        .pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .required()
        .messages({
            "string.pattern.base": "Must be a valid phone number",
            "string.empty": "Phone number cannot be empty",
            "any.required": "Phone number is required",
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Must be a valid email address",
            "string.empty": "Email cannot be empty",
            "any.required": "Email is required",
        }),

    image: Joi.object().keys({
        url: Joi.string()
            .uri()
            .allow("")
            .messages({
                "string.uri": "Must be a valid image URL",
            }),
        alt: Joi.string().min(2).max(256).allow("")
    }).required(),

    address: Joi.object().keys({
        country: Joi.string().required(),
        state: Joi.string().allow(""),
        city: Joi.string().allow(""),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().required(),
    }).required(),
});

export default EditUserSchema;
