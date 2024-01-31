/** @format */

import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../../models';
import { HttpError } from '../../utils';

const { SECRET_KEY } = process.env;

const changePassword = async ({ user, body }, res) => {
	const { oldPassword, newPassword } = body;
	const { _id: id } = user;

	const currentUser = await User.findById(id);

	if (!currentUser) {
		throw HttpError(500);
	}

	const passwordCompare = await compare(oldPassword, currentUser.password);
	if (!passwordCompare) {
		throw HttpError(401, 'Password is wrong');
	}

	const hashPassword = await hash(newPassword, 10);

	const payload = {
		id,
	};

	const token = sign(payload, SECRET_KEY, { expiresIn: '12h' });
	const updateUser = await User.findByIdAndUpdate(id, { password: hashPassword, token });

	res.json({
		token: token,
		user: {
			id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			avatarURL: updateUser.avatarURL,
		},
	});
};

export default changePassword;
