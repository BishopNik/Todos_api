/** @format */

import multer from 'multer';
import path from 'path';
import { httpError } from '../utils/index.js';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
	destination,
	filename: (req, file, callback) => {
		const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
		const fileName = `${uniquePreffix}_${file.originalname}`;
		callback(null, fileName);
	},
});

const limits = {
	fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
	const extention = req.originalname.split('.').pop();
	if (extention === 'exe') {
		callback(httpError(400, 'exe not vail extention'));
	}
};

export const upload = multer({
	storage,
	limits,
});
