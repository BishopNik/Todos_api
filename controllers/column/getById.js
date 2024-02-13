/** @format */

import { Columns } from '../../models/index.js';
import { httpError } from '../../utils/httpError.js';

export const getById = async (req, res, next) => {
	const { boardId } = req.params;
	const { _id: owner } = req.user;
	const result = await Columns.find({ boardId }, owner);
	if (!result) {
		throw httpError(404, `Columns with id=${boardId} not found`);
	}
	res.json(result);
};
