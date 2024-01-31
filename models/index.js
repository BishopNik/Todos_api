/** @format */

import { Boards, boardsAddSchema } from './board.js';
import { Contact, contactAddSchema } from './todo.js';
import { User, registerSchema, loginSchema, changeDataSchema } from './user.js';
import { helpSchema } from './help.js';

export default {
	Boards,
	boardsAddSchema,
	Contact,
	contactAddSchema,
	User,
	registerSchema,
	loginSchema,
	changeDataSchema,
	helpSchema,
};
