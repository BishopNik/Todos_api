/** @format */

import { Router } from "express";

import { authenticate, isEmptyBody, upload, validateBody } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../utils/index.js";
import { updateAvatar,updateUserEmail,updateUserName,changePassword} from "../../controllers/users/index.js";
import { changeDataSchema } from "../../models/user.js";
import { updateUserInfo } from "../../controllers/users/changeUserInfo.js";


const usersRouter = Router();

usersRouter.use(authenticate);

// User settings
usersRouter.patch("/avatar", upload.single("avatarURL"), ctrlWrapper(updateAvatar));

usersRouter.patch("/name", isEmptyBody,validateBody(changeDataSchema), ctrlWrapper(updateUserName))

usersRouter.patch("/email", isEmptyBody, validateBody(changeDataSchema), ctrlWrapper(updateUserEmail))

usersRouter.patch("/password", isEmptyBody, validateBody(changeDataSchema), ctrlWrapper (changePassword))

usersRouter.patch("/info", upload.single("avatarURL"), validateBody(changeDataSchema), ctrlWrapper(updateUserInfo))

export default usersRouter;
