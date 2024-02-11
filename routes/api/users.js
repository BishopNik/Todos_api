/** @format */

import { Router } from "express";

import { authenticate, isEmptyBody, upload, validateBody } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../utils/index.js";
import {updateThema, updateUserInfo} from "../../controllers/users/index.js";
import { changeDataSchema, updateThemaSchema } from "../../models/index.js";

const usersRouter = Router();

usersRouter.use(authenticate);

// User settings

usersRouter.patch("/update-user", upload.single("avatarURL"), isEmptyBody, validateBody(changeDataSchema), ctrlWrapper(updateUserInfo))

usersRouter.patch("/thema", isEmptyBody, validateBody(updateThemaSchema), ctrlWrapper(updateThema))

export default usersRouter;
