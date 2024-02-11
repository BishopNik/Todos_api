/** @format */

import { Router } from "express";

import { authenticate, isEmptyBody, upload, validateBody } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../utils/index.js";
import {updateUserInfo} from "../../controllers/users/index.js";
import { changeDataSchema } from "../../models/user.js";

const usersRouter = Router();

usersRouter.use(authenticate);

// User settings

usersRouter.patch("/update-user", upload.single("avatarURL"), isEmptyBody, validateBody(changeDataSchema), ctrlWrapper(updateUserInfo))

export default usersRouter;
