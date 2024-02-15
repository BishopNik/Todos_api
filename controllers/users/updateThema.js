/** @format */

import { httpError } from '../../utils/index.js';
import { User } from '../../models/index.js';

export async function updateThema(req, res) {
	const { id: _id, name, email } = req.user;
	const { thema } = req.body;

	const result = await User.findByIdAndUpdate({ _id }, { thema }, { new: true });
	if (!result) {
		throw httpError(404);
	} else {
		res.json({
			user: {
				_id,
				name,
				email,
				thema,
			},
		});
	}
}
