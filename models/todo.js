/** @format */

import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError, addUpdateSettings } from '../utils/index.js';

const todoSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for todo'],
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false, timestamps: true }
);

todoSchema.post('save', handleMongooseError);
todoSchema.pre('findOneAndUpdate', addUpdateSettings);
todoSchema.post('findOneAndUpdate', handleMongooseError);

export const todoAddSchema = Joi.object({
	//
});

export const Todo = model('todo', todoSchema);
