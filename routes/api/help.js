/** @format */

import { Router } from 'express';

import { validateBody, authenticate, isEmptyBody } from '../../middlewares/index.js';
import { changeDataSchema } from '../../models/index.js';
import { changeDataUser } from '../../controllers/users/index.js';
import { ctrlWrapper } from '../../utils/index.js';

const helpRouter = Router();

helpRouter.use(authenticate);

helpRouter.patch('/', isEmptyBody, validateBody(changeDataSchema), ctrlWrapper(changeDataUser));

export default helpRouter;
