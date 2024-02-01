/** @format */

import { Router } from 'express';

import { authenticate, isEmptyBody, upload } from '../../middlewares/index.js';
import { ctrlWrapper } from '../../utils/index.js';
import { changeDataUser } from '../../controllers/users/index.js';

const usersRouter = Router();

usersRouter.use(authenticate);

// User settings
usersRouter.patch('/avatar', isEmptyBody, upload.single('avatar'), ctrlWrapper(changeDataUser));

export default usersRouter;
