/** @format */

import { Todos } from '../../models';

const addTodo = async ({ user, body }, res) => {
	const { _id: owner } = user;
	const data = await Todos.create({ ...body, owner });
	res.status(201).json(data);
};

export default addTodo;
