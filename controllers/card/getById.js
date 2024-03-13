/** @format */

import { Cards } from '../../models/index.js';

export const getById = async (req, res) => {
	const { columnId } = req.params;
	const { _id: owner } = req.user;

	const result = await Cards.find({ columnId, owner });

	res.json(result);
};
