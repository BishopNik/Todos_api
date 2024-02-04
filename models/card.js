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
            type: String,
            required: [true, 'Set deadline for card'],
        },
        priority: {
            type: String,
            enum: ["without","low", "medium", "high"],
            default: "without"
        },
        columnId: {
            type: String,
            required: [true, 'Set deadline for card'],
        },
		owner:{
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false, timestamps: true }
);

cardSchema.post('save', handleMongooseError);
cardSchema.pre('findOneAndUpdate', addUpdateSettings);
cardSchema.post('findOneAndUpdate', handleMongooseError);

export const cardAddSchema = Joi.object({
	name: Joi.string().required().messages({
        "message": `"missing required name field"`
    }),
    deadline: Joi.string().required().messages({
        "message": `"missing required deadline field"`
    }),
    columnId: Joi.string().required().messages({
        "message": `"missing required columnId field"`
    }),
    text: Joi.string(),
    priority: Joi.string(),
});

export const cardUpdateSchema = Joi.object({
    name: Joi.string(),
    text: Joi.string(),
    deadline: Joi.string(),
    priority: Joi.string(),
    columnId: Joi.string(),
})

export const Cards = model('card', cardSchema);
