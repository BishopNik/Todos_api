/** @format */

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import boardsRouter from './routes/api/boards.js';
import todosRouter from './routes/api/todos.js';
import authRouter from './routes/api/auth.js';
import usersRouter from './routes/api/users.js';
import helpRouter from './routes/api/help.js';

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Auth
app.use('/api/auth', authRouter);

// Todos
app.use('/api/todos', todosRouter);

// Change data user
app.use('/api/users', usersRouter);

// Change data board
app.use('/api/boards', boardsRouter);

// Send mail
app.use('/api/help', helpRouter);

app.use((_req, res) => {
	res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, next) => {
	const { status = 500, message = 'Server error' } = err;
	res.status(status).json({ message });
});

export default app;
