/** @format */

import { Router } from 'express';

import {
	authenticate,
	checkOwner,
	isEmptyBody,
	isValidId,
	validateBody,
} from '../../middlewares/index.js';
import { todoAddSchema } from '../../models/index.js';
import {
	listTodos,
	getTodoById,
	addTodo,
	updateTodo,
	removeTodo,
} from '../../controllers/todos/index.js';
import { ctrlWrapper } from '../../utils/index.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(listTodos));

router.get('/:todoId', isValidId, checkOwner, ctrlWrapper(getTodoById));

router.post('/', isEmptyBody, validateBody(todoAddSchema), ctrlWrapper(addTodo));

router.put(
	'/:todoId',
	isEmptyBody,
	isValidId,
	validateBody(todoAddSchema),
	ctrlWrapper(updateTodo)
);

router.delete('/:todoId', isValidId, ctrlWrapper(removeTodo));

export default router;
