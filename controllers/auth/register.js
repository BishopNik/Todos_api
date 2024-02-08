/** @format */

import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

import { User } from "../../models/index.js";
import { httpError } from "../../utils/index.js";
const {SECRET_KEY} = process.env;

export const register = async ({ body }, res) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
  });
  
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token: token,
    user: {
      avatarURL: newUser.avatarURL,
      name: newUser.name,
      email: newUser.email,
    },
  });
};
