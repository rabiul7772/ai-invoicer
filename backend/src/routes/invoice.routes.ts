import { Router } from 'express';
import {
  createInvoice,
  getInvoiceById,
  sendInvoiceEmail,
  getAllInvoices,
  updateInvoiceStatus,
  updateInvoice,
  deleteInvoice
} from '../controllers/invoice.controller.js';
import { generateInvoicePdf } from '../controllers/pdf.controller.js';

const invoiceRouter = Router();

// GET /api/v1/invoices
invoiceRouter.get('/', getAllInvoices);

// POST /api/v1/invoices
invoiceRouter.post('/', createInvoice);

// GET /api/v1/invoices/:id
invoiceRouter.get('/:id', getInvoiceById);

// PUT /api/v1/invoices/:id
invoiceRouter.put('/:id', updateInvoice);

// POST /api/v1/invoices/:id/send
invoiceRouter.post('/:id/send', sendInvoiceEmail);

// PATCH /api/v1/invoices/:id/status
invoiceRouter.patch('/:id/status', updateInvoiceStatus);

// POST /api/v1/invoices/generate-pdf
invoiceRouter.post('/generate-pdf', generateInvoicePdf);

// DELETE /api/v1/invoices/:id
invoiceRouter.delete('/:id', deleteInvoice);

export default invoiceRouter;
