import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model.js';
import { sendToken } from '../utils/auth.utils.js';
import { NODE_ENV } from '../config/env.js';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide all required fields'
      });
    }

    const user = await User.create({ fullName, email, password });
    sendToken(user, 201, res);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide all required fields'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid credentials' });
    }
    sendToken(user, 200, res);
  } catch (error: any) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
  });
  res.status(200).json({ status: 'success' });
};

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      status: 'success',
      data: { user: req.user || null }
    });
  } catch (error) {
    next(error);
  }
};
