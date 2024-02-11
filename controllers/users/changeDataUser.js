/** @format */

import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import { httpError } from "../../utils/index.js";

export async function updateUserEmail(req, res) {

  const { _id } = req.user;
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw httpError(400, "email is already exists");
  }

  await User.findByIdAndUpdate(_id, { email });
  res.json({ message: "Email update successfully", email });
}

export async function updateUserName(req, res) {
  
  const { _id } = req.user;
  const { name } = req.body;

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    throw httpError(400, "name already exists");
  }

  await User.findByIdAndUpdate(_id, { name });

  res.json({ message: "Name updated successfully", name });
}
