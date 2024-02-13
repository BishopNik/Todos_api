import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Token } from "../../models/index.js";
import { cloudinary } from "../../utils/index.js";
import Jimp from "jimp";
import fs from "fs/promises";

const { SECRET_KEY } = process.env;

export async function updateUserInfo(req, res) {
  const { _id } = req.user;
  const { email, name, password = "" } = req.body;
  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  let avatarURL = user.avatarURL;

  if (req.file) {
    const image = await Jimp.read(req.file.path);
    await image.resize(68, 68);
    await image.writeAsync(req.file.path);

    // Загружаем аватар в Cloudinary и получаем URL
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });
    avatarURL = result.url;
    await fs.unlink(req.file.path);
  }

  let token = "";

  if (password) {
    const payload = { id: user._id };
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    const newToken = new Token({ userId: user._id, token });
    await newToken.save();
  }
  const hashPassword = await hash(password, 10);

  await User.findByIdAndUpdate(_id, {
    email,
    name,
    avatarURL,
    password: hashPassword,
  });

  res.json({
    token: token,
    user: {
      _id,
      name,
      email,
      avatarURL,
      thema: user.thema,
    },
  });
}
