import * as Joi from 'joi';

export const createEmployeeSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required'
    }),
    position: Joi.string().required().messages({
        'any.required': 'Position is required'
    }),
    department: Joi.string().required().messages({
        'any.required': 'Department is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email format.'
    }),
    phone: Joi.string().regex(/^[+]?[\d\s-()]{7,}$/).required().messages({ // Updated regex here
        "any.required": "Phone is required",
        "string.pattern.base": "Phone must be a valid phone number (at least 7 digits/symbols)" // Updated message
    }),
    branchId: Joi.number().integer().required().messages({
        'any.required': 'Branch ID is required',
        'number.base': 'Branch ID must be a number.'
    })
});

export const updateEmployeeSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().optional(),
    position: Joi.string().optional(),
    department: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        'string.email': 'Invalid email format.'
    }),
    phone: Joi.string().regex(/^[+]?[\d\s-()]{7,}$/).optional().messages({ // Updated regex here
        "string.pattern.base": "Phone must be a valid phone number (at least 7 digits/symbols)" // Updated message
    }),
    branchId: Joi.number().integer().optional().messages({
        'number.base': 'Branch ID must be a number.'
    })
}).min(1).messages({ // Ensure at least one field is provided for update
    'object.min': 'At least one field to update must be provided'
});