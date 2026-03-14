import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, type IUser } from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.jwt ||
      (authHeader?.startsWith('Bearer') && authHeader.split(' ')[1]);

    if (!token) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'User no longer exists' });
    }

    req.user = currentUser;
    next();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Authentication failed';
    res.status(401).json({ status: 'fail', message });
  }
};

export const optionalProtect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.jwt ||
      (authHeader?.startsWith('Bearer') && authHeader.split(' ')[1]);

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
      const currentUser = await User.findById(decoded.id);
      if (currentUser) {
        req.user = currentUser;
      }
    }
    next();
  } catch (error) {
    // If token is invalid, just proceed without user
    next();
  }
};
