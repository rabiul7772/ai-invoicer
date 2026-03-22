import type { NextFunction, Response } from 'express';
import { type AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { Invoice } from '../models/invoice.model.js';
import { emailService } from '../utils/emailService.js';
import { generateInvoiceEmailHtml } from '../utils/invoice-email-template.js';

/**
 * Controller for invoice operations.
 */
export const createInvoice = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const invoiceData = req.body;
    const userId = req.user!._id;

    const newInvoice = await Invoice.create({
      ...invoiceData,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: newInvoice
    });
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const invoice = await Invoice.findOne({ _id: id, userId } as any);

    if (!invoice) {
      res.status(404).json({
        success: false,
        message: 'Invoice not found or unauthorized'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    next(error);
  }
};

export const sendInvoiceEmail = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { recipientEmail, subject, message } = req.body;
    const userId = req.user!._id;

    const invoice = await Invoice.findOne({ _id: id, userId } as any);
    if (!invoice) {
      res.status(404).json({
        success: false,
        message: 'Invoice not found or unauthorized'
      });
      return;
    }

    // 1. Generate professional email HTML using the email-specific template
    const invoiceEmailHtml = generateInvoiceEmailHtml(invoice);

    // 2. Prepend the user message above the invoice card
    const messageBlock = `<div style="background-color:#f3f4f6;padding:24px 16px 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px 16px 0 0;padding:28px 40px;"><tr><td><p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p></td></tr></table></td></tr></table></div>`;
    const emailHtml = messageBlock + invoiceEmailHtml;

    // 3. Send Email
    await emailService.sendEmail({
      to: recipientEmail,
      subject: subject || `Invoice from ${invoice.billFrom.businessName}`,
      html: emailHtml
    });

    // 3. Update Status
    invoice.status = 'SENT';
    await invoice.save();

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInvoices = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 7;
    const search = req.query.search as string;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;
    const userId = req.user!._id;

    // Check for overdue invoices and update them
    const now = new Date();
    await Invoice.updateMany(
      {
        userId,
        status: 'SENT',
        dueDate: { $lt: now.toISOString() }
      },
      { $set: { status: 'OVERDUE' } }
    );

    const query: Record<string, unknown> = { userId };

    if (status) {
      const upperStatus = status.toUpperCase();
      if (['DRAFT', 'SENT', 'PAID', 'OVERDUE'].includes(upperStatus)) {
        query.status = upperStatus;
      }
    }

    if (search) {
      query.$or = [
        { 'billTo.clientName': { $regex: search, $options: 'i' } },
        { 'billTo.clientEmail': { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch total count and paginated data in parallel
    const [total, invoices] = await Promise.all([
      Invoice.countDocuments(query),
      Invoice.find(query).lean().sort({ createdAt: -1 }).skip(skip).limit(limit)
    ]);

    res.status(200).json({
      success: true,
      data: invoices,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvoiceStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!._id;

    const validStatuses = ['DRAFT', 'SENT', 'PAID', 'OVERDUE'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
      return;
    }

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, userId } as any,
      { status },
      { returnDocument: 'after' }
    );

    if (!invoice) {
      res.status(404).json({
        success: false,
        message: 'Invoice not found or unauthorized'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Invoice status updated successfully',
      data: invoice
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user!._id;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, userId } as any,
      updateData,
      {
        returnDocument: 'after',
        runValidators: true
      }
    );

    if (!invoice) {
      res.status(404).json({
        success: false,
        message: 'Invoice not found or unauthorized'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Invoice updated successfully',
      data: invoice
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const invoice = await Invoice.findOneAndDelete({ _id: id, userId } as any);

    if (!invoice) {
      res.status(404).json({
        success: false,
        message: 'Invoice not found or unauthorized'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
