import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  createProfile
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const userRouter = Router();

// Secure all routes
userRouter.use(protect);

// GET /api/v1/user/profile
userRouter.get('/profile', getProfile);

// POST /api/v1/user/profile
userRouter.post('/profile', createProfile);

// PUT /api/v1/user/profile
userRouter.put('/profile', updateProfile);

export default userRouter;
