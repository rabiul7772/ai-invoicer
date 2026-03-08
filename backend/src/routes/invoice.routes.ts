import { Router } from 'express';
import {
  createInvoice,
  getInvoiceById,
  sendInvoiceEmail
} from '../controllers/invoice.controller.js';
import { generateInvoicePdf } from '../controllers/pdf.controller.js';

const invoiceRouter = Router();

// POST /api/v1/invoices
invoiceRouter.post('/', createInvoice);

// GET /api/v1/invoices/:id
invoiceRouter.get('/:id', getInvoiceById);

// POST /api/v1/invoices/:id/send
invoiceRouter.post('/:id/send', sendInvoiceEmail);

// POST /api/v1/invoices/generate-pdf
invoiceRouter.post('/generate-pdf', generateInvoicePdf);

export default invoiceRouter;
