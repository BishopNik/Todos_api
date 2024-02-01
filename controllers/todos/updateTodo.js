/** @format */

import { Todo } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const updateTodo = async ({ params, body }, res) => {
	const { todoId } = params;
	const data = await Todo.findByIdAndUpdate(todoId, body, { new: true });
	if (!data) {
		throw httpError(404, 'Not found');
	}
	res.status(200).json(data);
};
