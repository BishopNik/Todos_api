/** @format */

import multer, { diskStorage } from 'multer';
import path from 'path';

const tempDir = path.resolve('temp');

const multerConfig = diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}-${file.originalname}`;
		cb(null, fileName);
	},
});

export const upload = multer({
	storage: multerConfig,
});
