import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import { JWT_SECRET, NODE_ENV } from '../config/env.js';

export const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET!, {
    expiresIn: '30d'
  });
};

export const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV === 'production' ? ('none' as const) : ('lax' as const)
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: { user }
  });
};
