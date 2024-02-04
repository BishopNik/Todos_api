/** @format */

import { Router } from 'express';

import { isValidId, validateBody } from '../../middlewares/index.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { authenticate } from '../../middlewares/index.js';
import { columnUpdateSchema, columnAddSchema } from '../../models/index.js';
import { add, deleteById, getAll, getById, updateById } from '../../controllers/column/index.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';


const columnRouter = Router();

columnRouter.use(authenticate);

columnRouter.get('/', ctrlWrapper(getAll));

columnRouter.get('/:borderId', ctrlWrapper(getById));

columnRouter.post("/", isEmptyBody, validateBody(columnAddSchema), ctrlWrapper(add));

columnRouter.put("/:columnId", isValidId, isEmptyBody, validateBody(columnUpdateSchema), ctrlWrapper(updateById));

columnRouter.delete("/:columnId", isValidId, ctrlWrapper(deleteById))

export default columnRouter;