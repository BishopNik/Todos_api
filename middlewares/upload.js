/** @format */

import multer, { diskStorage } from 'multer';
import { join } from 'path';

const tempDir = join(__dirname, '../', 'temp');

const multerConfig = diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}-${file.originalname}`;
		cb(null, fileName);
	},
});

const upload = multer({
	storage: multerConfig,
});

export default upload;
