/** @format */

import { Todos } from '../../models';
import { HttpError } from '../../utils';

const updateTodo = async ({ params, body }, res) => {
	const { todoId } = params;
	const data = await Todos.findByIdAndUpdate(todoId, body, { new: true });
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.status(200).json(data);
};

export default updateTodo;
