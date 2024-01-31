/** @format */

import { Router } from 'express';

import { authenticate, isEmptyBody } from '../../middlewares';
import { ctrlWrapper } from '../../utils';

const usersRouter = Router();

usersRouter.use(authenticate);

// User settings
usersRouter.patch('/avatar', isEmptyBody, upload.single('avatar'), ctrlWrapper(changeAvatar));

export default usersRouter;
