/** @format */

import { Router } from 'express';

import { validateBody, isValidId, authenticate, checkOwner, isEmptyBody } from '../../middlewares';
import { contactAddSchema } from '../../models';
import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} from '../../controllers/todos';
import { ctrlWrapper } from '../../utils';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(listContacts));

router.get('/:contactId', isValidId, checkOwner, ctrlWrapper(getContactById));

router.post('/', isEmptyBody, validateBody(contactAddSchema), ctrlWrapper(addContact));

router.put(
	'/:contactId',
	isEmptyBody,
	isValidId,
	validateBody(contactAddSchema),
	ctrlWrapper(updateContact)
);

router.delete('/:contactId', isValidId, ctrlWrapper(removeContact));

export default router;
