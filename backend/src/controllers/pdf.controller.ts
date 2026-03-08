import type { Request, Response, NextFunction } from 'express';
import { generateInvoiceHtml } from '../utils/invoice-template.js';
import { generatePDF } from '../utils/pdfGenerator.js';

export const generateInvoicePdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoiceData = req.body;
    const htmlContent = generateInvoiceHtml(invoiceData);

    const pdfBuffer = await generatePDF(htmlContent);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    next(error);
  }
};
