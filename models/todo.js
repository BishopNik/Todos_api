/** @format */

import { Schema, model } from 'mongoose';
import { object } from 'joi';
import { handleMongooseError, addUpdateSettings } from '../utils';

const todosSchema = new Schema(
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

todosSchema.post('save', handleMongooseError);
todosSchema.pre('findOneAndUpdate', addUpdateSettings);
todosSchema.post('findOneAndUpdate', handleMongooseError);

const todosAddSchema = object({
	//
});

const Todos = model('todo', todosSchema);

export default {
	Todos,
	todosAddSchema,
};
