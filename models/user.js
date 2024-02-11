/** @format */

import { Schema, model } from "mongoose";
import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const themaType = ["Light", "Violet", "Dark"]

const userRegisterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Set email for user"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    thema: {
      type: String,
      enum: themaType,
      default: "Dark",
    }
  },
  { versionKey: false, timestamps: true }
);

userRegisterSchema.post("save", (err, _data, next) => {
  err.status = 400;
  next();
});

// Check body for register
export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
// Check body for register google
export const registerSchemaForGoogle = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});


// Check body for login
export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

// Check body for change user data
export const changeDataSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6),
});

export const updateThemaSchema = Joi.object({
  thema: Joi.string()
    .valid(...themaType)
    .required(),
});

export const User = model("user", userRegisterSchema);
