/** @format */

import { Schema, model } from 'mongoose';
import { object } from 'joi';
import { handleMongooseError, addUpdateSettings } from '../utils';

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

const boardsAddSchema = object({
	//
});

const Boards = model('board', boardsSchema);

export default {
	Boards,
	boardsAddSchema,
};
