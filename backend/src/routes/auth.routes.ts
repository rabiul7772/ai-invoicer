import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe
} from '../controllers/auth.controller.js';
import {
  forgotPassword,
  resetPassword
} from '../controllers/password.controller.js';
import { protect, optionalProtect } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.patch('/reset-password/:token', resetPassword);
authRouter.get('/me', optionalProtect, getMe);

export default authRouter;
