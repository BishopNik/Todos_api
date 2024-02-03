/** @format */

import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError, addUpdateSettings } from '../utils/index.js';

const boardsSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for board'],
		},
		icon: {
			type: String,
			required: [true, 'Set icon for contact']
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false, timestamps: true }
);

boardsSchema.post('save', handleMongooseError);
boardsSchema.pre('findOneAndUpdate', addUpdateSettings);
boardsSchema.post('findOneAndUpdate', handleMongooseError);

export const boardsAddSchema = Joi.object({
	name: Joi.string().required().messages({
        "message": `"missing required name field"`
	}),
	icon: Joi.string().required().messages({
        "message": `"missing required icon field"`
    }),
});

export const boardUpdateSchema = Joi.object({
    name: Joi.string(),
    icon: Joi.string(),
})

export const Boards = model('board', boardsSchema);
