/** @format */

import { Columns, Cards } from '../../models/index.js';
import { httpError } from '../../utils/httpError.js';

export const deleteById = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { columnId } = req.params;
	await Cards.findByIdAndDelete({ columnId, owner });
	const result = await Columns.findByIdAndDelete({ _id: columnId, owner });
	if (!result) {
		throw httpError(404, `Column with id=${columnId} not found`);
	}

	res.json({
		name: result.name,
		_id: result._id,
	});
};
