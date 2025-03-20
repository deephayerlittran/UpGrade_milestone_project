import Joi, { ObjectSchema } from 'joi';

export const createBranchSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty"
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty"
    }),
    phone: Joi.string().regex(/^[+]?[\d\s-()]+$/).required().messages({ 
        "any.required": "Phone is required",
        "string.pattern.base": "Phone must be a valid phone number"
    }),
});

export const updateBranchSchema: ObjectSchema = Joi.object({
    name: Joi.string().messages({ 
        "string.base": "Name should be a type of 'text'",
    }),
    address: Joi.string().messages({ 
        "string.base": "Address should be a type of 'text'",
    }),
    phone: Joi.string().regex(/^[+]?[\d\s-()]+$/).messages({ 
        "string.pattern.base": "Phone must be a valid phone number"
    }),
}).min(1).messages({'object.min': 'At least one field must be provided for update'});