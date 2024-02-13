/** @format */

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import boardsRouter from './routes/api/boards.js';
import columnRouter from './routes/api/column.js';
import cardRouter from './routes/api/card.js';
import authRouter from './routes/api/auth.js';
import usersRouter from './routes/api/users.js';
import helpRouter from './routes/api/help.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth
app.use('/api/auth', authRouter);

// Change data user
app.use('/api/users', usersRouter);

// Change data board
app.use('/api/boards', boardsRouter);

// Change data column
app.use('/api/column', columnRouter);

// Change data column
app.use('/api/card', cardRouter);

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
