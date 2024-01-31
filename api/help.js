/** @format */

import { Router } from 'express';

import { validateBody, authenticate, isEmptyBody } from '../../middlewares';
import { favoriteSchema } from '../../models';
import { changeSubscription } from '../../controllers/users';
import { ctrlWrapper } from '../../utils';

const helpRouter = Router();

helpRouter.use(authenticate);

helpRouter.patch('/', isEmptyBody, validateBody(favoriteSchema), ctrlWrapper(changeSubscription));

export default helpRouter;
