/** @format */

import { isValidObjectId } from 'mongoose';

import { HttpError } from '../utils';

const isValidId = ({ params }, _res, next) => {
	const { contactId, userId } = params;

	if (!contactId && !userId) next(HttpError(400, `Must be id`));

	if (contactId && !isValidObjectId(contactId))
		next(HttpError(400, `${contactId} is not valid id`));

	if (userId && !isValidObjectId(userId)) next(HttpError(400, `${userId} is not valid id`));

	next();
};

export default isValidId;
