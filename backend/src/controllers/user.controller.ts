import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model.js';

/**
 * Controller for user profile operations.
 * Temporary singleton user approach until auth is implemented.
 */
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne();

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileData = req.body;

    const existingUser = await User.findOne({ email: profileData.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const user = await User.create(profileData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileData = req.body;

    // findOneAndUpdate with upsert: true handles creation if no user exists
    const user = await User.findOneAndUpdate({}, profileData, {
      new: true,
      upsert: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
