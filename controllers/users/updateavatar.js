import fs from "fs/promises";
import path from "path";
import { User } from "../../models/index.js";
import { httpError, cloudinary } from "../../utils/index.js";
import Jimp from "jimp";

export async function updateAvatar(req, res) {
  if (!req.file) {
    throw httpError(400, "No file uploaded");
  }
  const { _id } = req.user;
  const {url: avatarURL} = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars"
  })

  
  // const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  await fs.unlink(req.file.path)

  

    const image = await Jimp.read(avatarURL);
    await image.resize(250, 250).writeAsync(avatarURL);
  
  

  res.json({
    avatarURL,
  });
}
