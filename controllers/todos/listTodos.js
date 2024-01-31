/** @format */

import { Todos } from '../../models';

const listTodos = async ({ user, query }, res) => {
	const { _id: idUser } = user;

	const { page = 1, perPage = 20, favorite } = query;
	const skip = (page - 1) * perPage;
	const data =
		favorite === undefined
			? await Todos.find({ owner: idUser }, '-createdAt -updatedAt', {
					skip,
					perPage,
			  }).populate('owner', 'name email')
			: await Todos.find({ owner: idUser, favorite }, '-createdAt -updatedAt', {
					skip,
					perPage,
			  }).populate('owner', 'name email');

	res.json(data);
};

export default listTodos;
