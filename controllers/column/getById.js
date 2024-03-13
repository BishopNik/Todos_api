/** @format */

import { Columns } from '../../models/index.js';

export const getById = async (req, res) => {
	const { boardId } = req.params;
	const { _id: owner } = req.user;

	const result = await Columns.find({ boardId, owner });

	res.json(result);
};
