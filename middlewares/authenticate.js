/** @format */

import jwt from 'jsonwebtoken';
import { httpError } from '../utils/index.js';
import { User, Token } from '../models/index.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
	  return next(httpError(401, "Not authorized"));
	}
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer") {
	  return next(httpError(401, "Not authorized"));
	}
	try {
	  const { id } = jwt.verify(token, SECRET_KEY);
	  const user = await User.findById(id);
  
	  if (!user) {
		return next(httpError(401, "Not authorized"));
	  }
  
	  const tokenData = await Token.findOne({ userId: id, token: token }); //запрос для поиска токена, соответствующего пользователю и данному токену
	  if (!tokenData) {
		return next(httpError(401, "Not authorized"));
	  }
  
	  req.user = user;
	  next();
	} catch (error) {
	  next(httpError(401, "Not authorized"));
	}
  };


