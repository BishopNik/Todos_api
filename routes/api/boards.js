/** @format */

import { Router } from 'express';

import { isValidId, validateBody } from '../../middlewares/index.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { authenticate } from '../../middlewares/index.js';
import { boardUpdateSchema, boardsAddSchema } from '../../models/index.js';
import { addBorder, deleteBorderById, getBorderAll, getBorderById, updateBorderById } from '../../controllers/board/index.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';


const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.get('/', ctrlWrapper(getBorderAll));

boardsRouter.get('/:borderId', ctrlWrapper(getBorderById));

boardsRouter.post("/", isEmptyBody, validateBody(boardsAddSchema), ctrlWrapper(addBorder));

boardsRouter.put("/:borderId", isValidId, isEmptyBody, validateBody(boardUpdateSchema), ctrlWrapper(updateBorderById));

boardsRouter.delete("/:borderId", isValidId, ctrlWrapper(deleteBorderById))

//boardsRouter.patch('/', isEmptyBody, validateBody(changeDataSchema), ctrlWrapper(changeDataUser));


export default boardsRouter;
