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

boardsRouter.get('/:borderId', ctrlWrapper(getById));

boardsRouter.post("/", isEmptyBody, validateBody(boardsAddSchema), ctrlWrapper(add));

boardsRouter.put("/:borderId", isValidId, isEmptyBody, validateBody(boardUpdateSchema), ctrlWrapper(updateById));

boardsRouter.delete("/:borderId", isValidId, ctrlWrapper(deleteById))

export default boardsRouter;
