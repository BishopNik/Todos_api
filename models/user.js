/** @format */

import { Schema, model } from 'mongoose';
import { object, string } from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userRegisterSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for user'],
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, 'Set email for user'],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Set password for user'],
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
	},
	{ versionKey: false, timestamps: true }
);

userRegisterSchema.post('save', (err, _data, next) => {
	err.status = 400;
	next();
});

// Check body for register
const registerSchema = object({
	name: string().required(),
	email: string().pattern(emailRegexp).required(),
	password: string().min(6).required(),
});

// Check body for login
const loginSchema = object({
	email: string().pattern(emailRegexp).required(),
	password: string().min(6).required(),
});

// Check body for change user data
const changeDataSchema = object({
	name: string().required(),
	password: string().min(6).required(),
});

const User = model('user', userRegisterSchema);

export default {
	User,
	registerSchema,
	loginSchema,
	changeDataSchema,
};
