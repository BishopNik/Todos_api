/** @format */

import { object, string } from 'joi';

// Check body help message
const helpSchema = object({
	email: string().pattern(emailRegexp).required(),
	text: string().required(),
});

export default {
	helpSchema,
};
