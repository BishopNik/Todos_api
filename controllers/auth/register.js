/** @format */

import bcrypt from 'bcrypt';

import { User } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });
	if (user) {
		throw httpError(409, 'Email in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const avatarURL = '';

	const newUser = await User.create({
		...body,
		password: hashPassword,
		avatarURL,
	});

	res.status(201).json({
		user: {
			avatarURL: newUser.avatarURL,
			name: newUser.name,
			email: newUser.email,
		},
	});
};
