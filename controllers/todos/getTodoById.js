/** @format */

import { Todo } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const getTodoById = async ({ params }, res) => {
	const { todoId } = params;
	const data = await Todo.findById(todoId).populate('owner', 'name email');
	if (!data) {
		throw httpError(404, 'Not found');
	}
	res.json(data);
};
