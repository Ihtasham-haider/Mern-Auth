import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('_password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('not authorized , invalid token');
    }
  } else {
    res.status(401);
    throw new Error('not authorized , no token');
  }
});
export { protect };
