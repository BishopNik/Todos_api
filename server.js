/** @format */

import { set, connect } from 'mongoose';
import { listen } from './app';

const { DB_HOST, PORT = 4000 } = process.env;
set('strictQuery', true);

connect(DB_HOST)
	.then(() => listen(PORT))
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
