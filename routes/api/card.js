/** @format */

import { Router } from 'express';

import { isValidId, validateBody } from '../../middlewares/index.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { authenticate } from '../../middlewares/index.js';
import { cardSchemaJoi } from '../../models/index.js';
import { add, deleteById, getAll, getById, updateById } from '../../controllers/card/index.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const cardRouter = Router();

cardRouter.use(authenticate);

cardRouter.get('/', ctrlWrapper(getAll));

cardRouter.get('/:columnId', isValidId, ctrlWrapper(getById));

cardRouter.post('/', isEmptyBody, validateBody(cardSchemaJoi), ctrlWrapper(add));

cardRouter.put(
	'/:cardId',
	isValidId,
	isEmptyBody,
	validateBody(cardSchemaJoi),
	ctrlWrapper(updateById)
);

cardRouter.delete('/:cardId', isValidId, ctrlWrapper(deleteById));

export default cardRouter;
