import { Router } from 'express';
import {
  extractInvoiceData,
  generateSampleInvoiceText,
  getDashboardInsights
} from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const aiRouter = Router();

aiRouter.post('/extract', extractInvoiceData);
aiRouter.get('/sample', generateSampleInvoiceText);
aiRouter.get('/insights', protect as any, getDashboardInsights);

export default aiRouter;
