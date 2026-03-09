import { Router } from 'express';
import { extractInvoiceData } from '../controllers/ai.controller.js';

const aiRouter = Router();

aiRouter.post('/extract', extractInvoiceData);

export default aiRouter;
