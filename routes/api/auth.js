/** @format */

import { Router } from 'express';

import { validateBody, authenticate, isEmptyBody } from '../../middlewares/index.js';
import { registerSchema, loginSchema } from '../../models/index.js';
import {
	register,
	login,
	logout,
	getCurrent,
	googleAuth,
	googleRedirect,
} from '../../controllers/auth/index.js';
import { ctrlWrapper } from '../../utils/index.js';

const authRouter = Router();

//Register
authRouter.post('/register', isEmptyBody, validateBody(registerSchema), ctrlWrapper(register));

// Login
authRouter.post('/login', isEmptyBody, validateBody(loginSchema), ctrlWrapper(login));

// Log out
authRouter.post('/logout', authenticate, ctrlWrapper(logout));

// Refresh
authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

//Google
authRouter.get('/google', ctrlWrapper(googleAuth));

//Google-Redirect
authRouter.get('/google-redirect', ctrlWrapper(googleRedirect));

export default authRouter;
