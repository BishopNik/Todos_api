import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Token } from "../../models/index.js";
import { httpError } from "../../utils/index.js";
import Jimp from "jimp";
import fs from "fs/promises";

const { SECRET_KEY } = process.env;

export async function updateUserInfo(req, res) {
  const { _id, password } = req.user;
  const { email, name, password: newPassword } = req.body;
  const user = await User.findOne({ email, name });

//   const existingUserEmail = await User.findOne({ email });
//   if (existingUserEmail) {
//     throw httpError(400, "Email is already exists");
//   }

//   const existingUserName = await User.findOne({ name });
//   if (existingUserName) {
//     throw httpError(400, "Name already exists");
//   }
  //avatar
  if(req.file){
    const image = await Jimp.read(req.file.path);
  await image.resize(68, 68);
  await image.writeAsync(req.file.path);
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars",
});
}
const { url: avatarURL } = result;

  //password
//   const hashPassword = await hash(newPassword, 10);
//   const isPasswordValid = await compare(newPassword, password);
//   if (isPasswordValid) {
//     throw httpError(
//       400,
//       "new password must be different from current password"
//     );
//   }
//   const payload = {
//     id: newUser._id,
//   };
//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

//   await Token.create({
//     userId: newUser._id,
//     token: token,
//   });

  await User.findByIdAndUpdate(_id, {
    email,
    name,
    avatarURL,
    // password: hashPassword,
  });
//   await fs.unlink(req.file.path);

  res.json({
    user: {
        _id,
        name,
        email,
    //   avatarURL: avatarURL,
    },
  });
}



