/** @format */

import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError, addUpdateSettings } from '../utils/index.js';

const cardSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for card'],
		},
		text: {
			type: String,
		},
		deadline: {
			type: Number,
		},
		priority: {
			type: String,
			enum: ['without', 'low', 'medium', 'high'],
			default: 'without',
		},
		columnId: {
			type: String,
			required: [true, 'Set deadline for card'],
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false }
);

cardSchema.post('save', handleMongooseError);
cardSchema.pre('findOneAndUpdate', addUpdateSettings);
cardSchema.post('findOneAndUpdate', handleMongooseError);

export const cardSchemaJoi = Joi.object({
	columnId: Joi.string().required().messages({
		message: `"missing required columnId field"`,
	}),
	name: Joi.string().required().messages({
		message: `"missing required name field"`,
	}),
	deadline: Joi.number().allow(null),
	text: Joi.string().allow(''),
	priority: Joi.string().allow(''),
});

export const Cards = model('card', cardSchema);
