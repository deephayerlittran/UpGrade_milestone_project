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