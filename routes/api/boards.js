/** @format */

import { Router } from 'express';

import { isValidId, validateBody } from '../../middlewares/index.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { authenticate } from '../../middlewares/index.js';
import { boardUpdateSchema, boardsAddSchema } from '../../models/index.js';
import { add, deleteById, getAll, getById, updateById } from '../../controllers/board/index.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.get('/', ctrlWrapper(getAll));

boardsRouter.get('/:boardId', ctrlWrapper(getById));

boardsRouter.post('/', isEmptyBody, validateBody(boardsAddSchema), ctrlWrapper(add));

boardsRouter.patch(
	'/:boardId',
	isEmptyBody,
	validateBody(boardUpdateSchema),
	ctrlWrapper(updateById)
);

boardsRouter.delete('/:boardId', ctrlWrapper(deleteById));

export default boardsRouter;
