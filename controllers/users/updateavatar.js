import fs from "fs/promises";
import { User } from "../../models/index.js";
import { httpError, cloudinary } from "../../utils/index.js";
import Jimp from "jimp";

export async function updateAvatar(req, res) {
  if (!req.file) {
    throw httpError(400, "No file uploaded");
  }
  const { _id } = req.user;

  const image = await Jimp.read(req.file.path);
  await image.resize(68, 68);

  // Сохраняем измененное изображение
  await image.writeAsync(req.file.path);

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars",
  });

  const { url: avatarURL } = result;

  await User.findByIdAndUpdate(_id, { avatarURL });
  await fs.unlink(req.file.path);

  res.json({ avatarURL });
}
