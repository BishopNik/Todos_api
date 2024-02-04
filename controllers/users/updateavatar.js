import fs from "fs/promises";
import path from "path";
import { User } from "../../models/index.js";
import { httpError } from "../../utils/index.js";
import Jimp from "jimp";

export async function updateAvatar(req, res) {
  if (!req.file) {
    throw httpError(400, "No file uploaded");
  }
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const resultUpload = path.join("avatars", filename);
  await fs.rename(oldPath, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  await Jimp.read(resultUpload)
    .then((image) => {
      return image.resize(250, 250).writeAsync(resultUpload);
    })
    .catch((error) => {
      httpError(404, error.message);
    });

  res.json({
    avatarURL,
  });
}
