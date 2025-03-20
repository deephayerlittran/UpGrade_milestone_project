import Joi, { ObjectSchema } from "joi";

// Schema for updating a post
export const updatePostSchema: ObjectSchema = Joi.object({
	id: Joi.string().required().messages({
		"any.required": "Post ID is required",
		"string.empty": "Post ID cannot be empty",
	}),
	userId: Joi.string().required().messages({
		"any.required": "User ID is required",
		"string.empty": "User ID cannot be empty",
	}),
	content: Joi.string().required().messages({
		"any.required": "Content is required",
		"string.empty": "Content cannot be empty",
	}),
	createdAt: Joi.date().default(() => new Date()),
	updatedAt: Joi.date().default(() => new Date()),
});

export const postModelSchema: ObjectSchema = Joi.object({
	id: Joi.string(),
	userId: Joi.string().required(),
	content: Joi.string().required(),
	createdAt: Joi.date().required(),
	updatedAt: Joi.date().required(),
});