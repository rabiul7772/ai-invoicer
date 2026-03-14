import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe
} from '../controllers/auth.controller.js';
import { protect, optionalProtect } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/me', optionalProtect, getMe);

export default authRouter;
