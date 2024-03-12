/** @format */

import { Boards } from '../../models/index.js';

export const getAll = async (req, res) => {
	const { _id: owner } = req.user;

	const result = await Boards.find({ owner }).populate('owner', 'username');
	res.json(result);
};
