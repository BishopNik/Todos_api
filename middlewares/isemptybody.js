/** @format */

import { httpError } from '../utils/index.js';

export const isEmptyBody = (req, res, next) => {
	const { length } = Object.keys(req.body);
	if (!length) {
		return next(httpError(400, 'Body must have fields'));
	}
	next();
};
