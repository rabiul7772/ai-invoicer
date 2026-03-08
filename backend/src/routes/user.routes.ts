import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  createProfile
} from '../controllers/user.controller.js';

const userRouter = Router();

// GET /api/v1/user/profile
userRouter.get('/profile', getProfile);

// POST /api/v1/user/profile
userRouter.post('/profile', createProfile);

// PUT /api/v1/user/profile
userRouter.put('/profile', updateProfile);

export default userRouter;
