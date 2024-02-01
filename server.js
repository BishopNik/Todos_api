/** @format */

import { set, connect } from 'mongoose';
import app from './app.js';

const { DB_HOST, PORT = 4000 } = process.env;
set('strictQuery', true);

connect(DB_HOST)
	.then(() => app(PORT))
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
