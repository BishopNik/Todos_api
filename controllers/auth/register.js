/** @format */

import { hash } from 'bcrypt';
import { nanoid } from 'nanoid';

import { User } from '../../models/index.js';
import { httpError, sendMailer, createMessage } from '../../utils/index.js';

export const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });
	if (user) {
		throw httpError(409, 'Email in use');
	}
	const hashPassword = await hash(password, 10);

	const avatarURL = '';
	const verificationToken = nanoid();

	const newUser = await User.create({
		...body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	await sendMailer(createMessage(newUser));

	res.status(201).json({
		user: {
			avatarURL: newUser.avatarURL,
			name: newUser.name,
			email: newUser.email,
		},
	});
};
