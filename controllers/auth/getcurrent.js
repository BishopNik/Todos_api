/** @format */

import { User } from '../../models';

const getCurrent = async ({ user }, res) => {
	const { _id } = user;

	const currentUser = await User.findOne({ _id });

	res.json({
		id: currentUser._id,
		avatarURL: currentUser.avatarURL,
		name: currentUser.name,
		email: currentUser.email,
	});
};

export default getCurrent;
