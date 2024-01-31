/** @format */

import { Router } from 'express';

import { validateBody, authenticate, isEmptyBody } from '../../middlewares';
import { registerSchema, loginSchema } from '../../models';
import { register, login, logout, getCurrent } from '../../controllers/auth';
import { ctrlWrapper } from '../../utils';

const authRouter = Router();

// Register
authRouter.post('/register', isEmptyBody, validateBody(registerSchema), ctrlWrapper(register));

// Login
authRouter.post('/login', isEmptyBody, validateBody(loginSchema), ctrlWrapper(login));

// Log out
authRouter.post('/logout', authenticate, ctrlWrapper(logout));

// Refresh
authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

export default authRouter;
