/** @format */

import { Router } from 'express';

// import { validateBody } from '../../middlewares/index.js';
// import { isEmptyBody } from '../../middlewares/index.js';
import { authenticate } from '../../middlewares/index.js';
// import { changeDataSchema } from '../../models/index.js';
// import { changeDataUser } from '../../controllers/users/index.js';
// import { ctrlWrapper } from '../../utils/index.js';

const boardsRouter = Router();

boardsRouter.use(authenticate);

// boardsRouter.patch('/', isEmptyBody, validateBody(changeDataSchema), ctrlWrapper(changeDataUser));

export default boardsRouter;
