/** @format */

import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError, addUpdateSettings } from '../utils/index.js';

const columnSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for board'],
		},
		boardId: {
			type: String,
			required: [true, 'Set boardId for board'],
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false }
);

columnSchema.post('save', handleMongooseError);
columnSchema.pre('findOneAndUpdate', addUpdateSettings);
columnSchema.post('findOneAndUpdate', handleMongooseError);

export const columnAddSchema = Joi.object({
	name: Joi.string().required().messages({
		message: `"missing required name field"`,
	}),
	boardId: Joi.string().required().messages({
		message: `"missing required name field"`,
	}),
});

export const columnUpdateSchema = Joi.object({
	name: Joi.string(),
	boardId: Joi.string(),
});

export const Columns = model('column', columnSchema);
