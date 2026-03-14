import type { Response, NextFunction } from 'express';
import { User } from '../models/user.model.js';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';

/**
 * Controller for user profile operations.
 */
export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.user is already populated by protect middleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileData = req.body;
    const userId = req.user?._id;

    // Profile is part of User model, so we update the existing user
    const user = await User.findByIdAndUpdate(userId, profileData, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileData = req.body;
    const userId = req.user?._id;

    const user = await User.findByIdAndUpdate(userId, profileData, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
