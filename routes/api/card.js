/** @format */

import { Router } from 'express';

import { isValidId, validateBody } from '../../middlewares/index.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { authenticate } from '../../middlewares/index.js';
import { cardUpdateSchema, cardAddSchema } from '../../models/index.js';
import { add, deleteById, getAll, getById, updateById } from '../../controllers/card/index.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';


const cardRouter = Router();

cardRouter.use(authenticate);

cardRouter.get('/', ctrlWrapper(getAll));

cardRouter.get('/:columnId', ctrlWrapper(getById));

cardRouter.post("/", isEmptyBody, validateBody(cardAddSchema), ctrlWrapper(add));

cardRouter.put("/:cardId", isEmptyBody, validateBody(cardUpdateSchema), ctrlWrapper(updateById));

cardRouter.delete("/:cardId", ctrlWrapper(deleteById))

export default cardRouter;