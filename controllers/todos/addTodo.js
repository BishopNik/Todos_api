/** @format */

import { Todo } from '../../models/index.js';

export const addTodo = async ({ user, body }, res) => {
	const { _id: owner } = user;
	const data = await Todo.create({ ...body, owner });
	res.status(201).json(data);
};
