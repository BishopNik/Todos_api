/** @format */

import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Token } from '../../models/index.js';
import { cloudinary } from '../../utils/index.js';
import Jimp from 'jimp';
import fs from 'fs/promises';

const { SECRET_KEY } = process.env;

export async function updateUserInfo(req, res) {
	const { _id } = req.user;
	const { token } = req.token;
	const { name, password = '' } = req.body;
	const user = await User.findById(_id);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	let avatarURL = user.avatarURL;

	if (req.file) {
		const image = await Jimp.read(req.file.path);
		image.resize(68, 68);
		await image.writeAsync(req.file.path);

		const result = await cloudinary.uploader.upload(req.file.path, {
			folder: 'avatars',
		});
		avatarURL = result.url;
		await fs.unlink(req.file.path);
	}

	const hashPassword = password ? await hash(password, 10) : null;

	const updateFields = {};

	if (name) updateFields.name = name;
	if (avatarURL) updateFields.avatarURL = avatarURL;
	if (hashPassword) updateFields.password = hashPassword;

	const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });

	const resp = {};
	if (password) {
		await Token.deleteMany({ userId: id, token });

		const payload = { id: updatedUser._id };
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
		const newToken = new Token({ userId: updatedUser._id, token });
		await newToken.save();

		resp.token = token;
	}
	resp.user = updatedUser;

	res.json(resp);
}
