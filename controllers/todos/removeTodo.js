/** @format */

import { Todos } from '../../models';
import { HttpError } from '../../utils';

const removeTodo = async ({ params }, res) => {
	const { todoId } = params;
	const data = await Todos.findByIdAndDelete(todoId);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json({
		id: todoId,
		message: 'Delete success',
	});
};

export default removeTodo;
