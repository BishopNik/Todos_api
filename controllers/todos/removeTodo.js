/** @format */

import { Todo } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const removeTodo = async ({ params }, res) => {
	const { todoId } = params;
	const data = await Todo.findByIdAndDelete(todoId);
	if (!data) {
		throw httpError(404, 'Not found');
	}
	res.json({
		id: todoId,
		message: 'Delete success',
	});
};
