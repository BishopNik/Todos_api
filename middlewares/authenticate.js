/** @format */

import jwt from 'jsonwebtoken';
import { httpError } from '../utils/index.js';
import { User } from '../models/index.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');

	if (!bearer) next(httpError(401));

	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);

		req.user = user;
		if (!user || !user.token || user.token !== token) next(HttpError(401, 'User not found'));
		next();
	} catch {
		next(httpError(401));
	}
};
