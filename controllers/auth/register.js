/** @format */

import { hash } from 'bcrypt';
import { url } from 'gravatar';
import { nanoid } from 'nanoid';

import { User } from '../../models';
import { HttpError, sendMailer, createMessage } from '../../utils';

const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}
	const hashPassword = await hash(password, 10);

	const avatarURL = url(email);
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

export default register;
