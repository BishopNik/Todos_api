/** @format */

import { Columns } from '../../models/index.js';

export const getAll = async (req, res, next) => {
	const { _id: owner } = req.user;

	const result = await Columns.find({ owner }).populate('owner', 'username');

	res.json(result);
};
