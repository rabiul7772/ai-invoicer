import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const dashboardRouter = Router();

dashboardRouter.get('/stats', protect as any, getDashboardData);

export default dashboardRouter;
