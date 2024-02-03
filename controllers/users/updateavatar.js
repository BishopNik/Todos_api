import fs from "fs/promises";
import path from "path";
import { Todo } from "../../models/index.js";


export async function updateAvatar(req, res) {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const resultUpload = path.join("avatars", filename);
  await fs.rename(oldPath, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await Todo.findByIdAndUpdate(_id, { avatarURL });

  // await Jimp.read(resultUpload)
  //   .then((image) => {
  //     return image.resize(250, 250).writeAsync(resultUpload);
  //   })
  //   .catch((error) => {
  //     HttpError(404, error.message);
  //   });

  res.json({
    avatarURL,
  });
}
