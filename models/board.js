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
	//
});

export const Boards = model('board', boardsSchema);
