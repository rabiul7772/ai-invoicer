import { Router } from 'express';
import { seedDemoData } from '../controllers/seed.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const seedRouter = Router();

seedRouter.post('/demo', protect as any, seedDemoData);

export default seedRouter;
