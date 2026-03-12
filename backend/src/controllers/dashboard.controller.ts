import type { Request, Response, NextFunction } from 'express';
import { Invoice } from '../models/invoice.model.js';
import { User } from '../models/user.model.js';

const STATS_GROUP = {
  $group: {
    _id: null,
    totalAmount: { $sum: '$totalAmount' },
    paidAmount: {
      $sum: { $cond: [{ $eq: ['$status', 'PAID'] }, '$totalAmount', 0] }
    },
    unpaidAmount: {
      $sum: { $cond: [{ $ne: ['$status', 'PAID'] }, '$totalAmount', 0] }
    },
    overdueAmount: {
      $sum: { $cond: [{ $eq: ['$status', 'OVERDUE'] }, '$totalAmount', 0] }
    }
  }
};

export const getDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    const stats = await Invoice.aggregate([
      { $match: { userId: user._id } },
      {
        $facet: {
          allTimeStats: [STATS_GROUP],
          recentInvoices: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $project: {
                _id: 1,
                totalAmount: 1,
                status: 1,
                dueDate: 1,
                'billTo.clientName': 1
              }
            }
          ]
        }
      }
    ]).allowDiskUse(true);

    res.status(200).json({ success: true, data: stats[0] });
  } catch (error) {
    next(error);
  }
};
