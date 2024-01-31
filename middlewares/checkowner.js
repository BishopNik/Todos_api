/** @format */

import { Contact } from '../models';
import { HttpError } from '../utils';

const checkOwner = async ({ params, user }, _res, next) => {
	const { contactId } = params;
	const contact = await Contact.findOne({ _id: contactId });

	if (user._id.toString() !== contact?.owner?.toString()) {
		next(HttpError(404));
	}
	next();
};

export default checkOwner;
