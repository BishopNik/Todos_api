import { Schema, model } from "mongoose";
import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userRegisterSchemaGoogle = new Schema(
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
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userRegisterSchemaGoogle.post("save", (err, _data, next) => {
  err.status = 400;
  next();
});


export const registerSchemaForGoogle = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

export const GoogleUser = model("googleuser", userRegisterSchemaGoogle);