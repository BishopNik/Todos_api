/** @format */

import { Boards, Columns, Cards } from '../../models/index.js';
import { httpError } from '../../utils/index.js';

export const deleteById = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { boardId } = req.params;
	const resColumn = await Columns.find({ boardId, owner });
	await Promise.all(
		resColumn.map(async item => {
			await Cards.deleteMany({ columnId: item._id, owner });
		})
	);
	await Columns.deleteMany({ boardId, owner });
	const result = await Boards.findByIdAndDelete({ _id: boardId, owner });
	if (!result) {
		throw httpError(404, `Boarder with id=${boardId} not found`);
	}

	res.json({
		name: result.name,
		_id: result._id,
	});
};
