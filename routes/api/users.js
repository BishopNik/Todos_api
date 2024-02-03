/** @format */

import { Router } from "express";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../utils/index.js";
import { changeDataUser, updateAvatar } from "../../controllers/users/index.js";

const usersRouter = Router();

usersRouter.use(authenticate);

// User settings
usersRouter.patch(
  "/avatar",
  upload.single("avatarURL"),
  ctrlWrapper(updateAvatar)
);

export default usersRouter;
