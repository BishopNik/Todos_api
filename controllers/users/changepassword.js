/** @format */

import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/index.js";
import { httpError } from "../../utils/index.js";
const { SECRET_KEY } = process.env;

export async function changePassword(req, res) {
  if (!req.body.password) {
    throw httpError(400, "password is required");
  }

  const { _id, password } = req.user;
  const { password: newPassword } = req.body;

  const hashPassword = await hash(newPassword, 10);
  const isPasswordValid = await compare(newPassword, password);

  if (isPasswordValid) {
    throw httpError(
      400,
      "new password must be different from current password"
    );
  }
  const payload = { _id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  await User.findByIdAndUpdate(_id, { password: hashPassword });
  res.json({ message: "password updated successfully", token });
}
