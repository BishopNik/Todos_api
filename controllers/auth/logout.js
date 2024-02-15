/** @format */

import { User, Token } from '../../models/index.js';

export const logout = async ({ user, token }, res) => {
	const { _id: id } = user;

	await User.findByIdAndUpdate(id, { token: '' });
	await Token.deleteMany({ userId: id, token });

	res.status(204).json({});
};
