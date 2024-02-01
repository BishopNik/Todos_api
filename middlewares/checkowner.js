/** @format */

import { Todo } from '../models/index.js';
import { httpError } from '../utils/index.js';

export const checkOwner = async ({ params, user }, _res, next) => {
	const { todoId } = params;
	const todo = await Todo.findOne({ _id: todoId });

	if (user._id.toString() !== todo?.owner?.toString()) {
		next(httpError(404));
	}
	next();
};
