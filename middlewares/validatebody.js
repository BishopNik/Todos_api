/** @format */

import { HttpError } from '../utils';

const validateBody = (schema, message) => {
	const func = ({ body }, res, next) => {
		const { error } = schema.validate(body);
		if (error) {
			next(HttpError(400, message || error.message));
		}
		next();
	};

	return func;
};

export default validateBody;
