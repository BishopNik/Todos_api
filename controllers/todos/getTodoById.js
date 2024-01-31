/** @format */

import { Todos } from '../../models';
import { HttpError } from '../../utils';

const getTodoById = async ({ params }, res) => {
	const { todoId } = params;
	const data = await Todos.findById(todoId).populate('owner', 'name email');
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json(data);
};

export default getTodoById;
