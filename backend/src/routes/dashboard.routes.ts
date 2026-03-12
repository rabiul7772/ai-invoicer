import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller.js';

const dashboardRouter = Router();

dashboardRouter.get('/stats', getDashboardData);

export default dashboardRouter;
