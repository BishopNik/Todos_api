/** @format */

import { Boards, Columns, Cards } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const deleteById = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { boardId } = req.params;
	const res = await Columns.find({ boardId, owner });
	res.map(async item => await Cards.findByIdAndDelete({ columnId: item._id, owner }));
	await Columns.findByIdAndDelete({ boardId, owner });
	const result = await Boards.findByIdAndDelete({ _id: boardId, owner });
	if (!result) {
		throw httpError(404, `Boarder with id=${boardId} not found`);
	}

	res.json({
		name: result.name,
		_id: result._id,
	});
};
