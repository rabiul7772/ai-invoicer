import { Router } from 'express';
import {
  extractInvoiceData,
  generateSampleInvoiceText
} from '../controllers/ai.controller.js';

const aiRouter = Router();

aiRouter.post('/extract', extractInvoiceData);
aiRouter.get('/sample', generateSampleInvoiceText);

export default aiRouter;
