/** @format */

import { Router } from "express";

import {
  validateBody,
  authenticate,
  isEmptyBody,
} from "../../middlewares/index.js";
import { helpSchema } from "../../models/index.js";
import { ctrlWrapper } from "../../utils/index.js";
import { sendEmailNeedHelp } from "../../controllers/help/index.js";

const helpRouter = Router();

helpRouter.use(authenticate);

helpRouter.post("/", isEmptyBody, validateBody(helpSchema), ctrlWrapper(sendEmailNeedHelp));

export default helpRouter;
