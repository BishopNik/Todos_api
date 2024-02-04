/** @format */

import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import { httpError } from "../../utils/index.js";

export async function updateUserName(req, res) {
  if (!req.body.name) {
    throw httpError(400, "Name is required");
  }
  const { _id, password } = req.user;
  const { name, password: enteredPassword } = req.body;
  const isPasswordValid = await bcrypt.compare(enteredPassword, password);
  if (!isPasswordValid) {
    throw httpError(400, "Invalid password");
  }
  await User.findByIdAndUpdate(_id, { name });

  res.json({ message: "Name updated successfully", name });
}

export async function updateUserEmail(req, res) {
  if (!req.body.email) {
    throw httpError(400, "Email is required");
  }

  const { _id, password } = req.user;
  const { email, password: enteredPassword } = req.body;

  const isPasswordValid = await bcrypt.compare(enteredPassword, password);
  if (!isPasswordValid) {
    throw httpError(400, "Invalid password");
  }

  await User.findByIdAndUpdate(_id, { email });
  res.json({ message: "Email update successfully", email });
}
