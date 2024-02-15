/** @format */

import Joi from 'joi';
import { emailRegexp } from './user.js';

export const helpSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	text: Joi.string().required(),
});
