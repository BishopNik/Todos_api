/** @format */

import { Todo } from '../../models/index.js';

export const listTodos = async ({ user }, res) => {
	const { _id: idUser } = user;

	const data = await Todo.find({ owner: idUser }, '-createdAt -updatedAt', {
		skip,
		perPage,
	}).populate('owner', 'name email');
	res.json(data);
};
