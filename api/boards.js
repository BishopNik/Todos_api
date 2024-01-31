/** @format */

import { Router } from 'express';

import { validateBody, authenticate, isEmptyBody } from '../../middlewares';
import { favoriteSchema } from '../../models';
import { changeSubscription } from '../../controllers/users';
import { ctrlWrapper } from '../../utils';

const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.patch('/', isEmptyBody, validateBody(favoriteSchema), ctrlWrapper(changeSubscription));

export default boardsRouter;
