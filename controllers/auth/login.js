/** @format */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Token } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

const { SECRET_KEY } = process.env;

export const login = async ({ body }, res) => {
	const { email, password } = body;

	const user = await User.findOne({ email });

	if (!user) {
		throw httpError(401, 'Email or password is wrong');
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw httpError(401, 'Email or password is wrong');
	}
	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });

	const newToken = new Token({
		userId: user._id,
		token: token,
	});

	await newToken.save();

	res.json({
		token: token,
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			avatarURL: user.avatarURL,
			thema: user.thema,
		},
	});
};
