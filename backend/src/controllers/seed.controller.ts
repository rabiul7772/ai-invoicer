import type { Response } from 'express';
import { Invoice } from '../models/invoice.model.js';

const CLIENTS = [
  {
    name: 'TechFlow Solutions',
    address: '123 Innovation Drive, San Francisco, CA',
    phone: '+1 (555) 123-4567',
    email: 'billing@techflow.com'
  },
  {
    name: 'Global Logistics Inc.',
    address: '789 Supply Chain Ave, Chicago, IL',
    phone: '+1 (555) 987-6543',
    email: 'accounts@globallogistics.com'
  },
  {
    name: 'Stellar Marketing',
    address: '456 Creative Way, New York, NY',
    phone: '+1 (555) 246-8135',
    email: 'finance@stellarmarketing.com'
  },
  {
    name: 'Pure Water Co.',
    address: '321 Crystal Springs Rd, Austin, TX',
    phone: '+1 (555) 369-2580',
    email: 'pay@purewater.com'
  },
  {
    name: 'Apex Engineering',
    address: '159 Construction Blvd, Seattle, WA',
    phone: '+1 (555) 159-7531',
    email: 'invoices@apexeng.com'
  },
  {
    name: 'Green Leaf Organic',
    address: '753 Harvest Ln, Portland, OR',
    phone: '+1 (555) 852-9630',
    email: 'hello@greenleaf.com'
  },
  {
    name: 'Blue Ridge Design',
    address: '951 Mountain View Dr, Denver, CO',
    phone: '+1 (555) 456-7890',
    email: 'design@blueridge.com'
  },
  {
    name: 'Urban Eataries',
    address: '852 Downtown St, Miami, FL',
    phone: '+1 (555) 789-0123',
    email: 'admin@urbaneats.com'
  }
];

const ITEMS = [
  { name: 'UX Design Audit', priceRange: [800, 2500] },
  { name: 'Website Development', priceRange: [3000, 15000] },
  { name: 'SEO Optimization', priceRange: [500, 2000] },
  { name: 'Social Media Management', priceRange: [1200, 4000] },
  { name: 'Cloud Hosting (Annual)', priceRange: [150, 600] },
  { name: 'API Integration', priceRange: [1500, 5000] },
  { name: 'Consultancy Services', priceRange: [200, 1000] },
  { name: 'Logo Design & Branding', priceRange: [2000, 8000] },
  { name: 'E-commerce Setup', priceRange: [4000, 12000] }
];

const STATUSES = ['PAID', 'OVERDUE', 'SENT', 'DRAFT'];

export const seedDemoData = async (req: any, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized'
      });
    }

    const userId = user._id;

    // 1. Delete existing invoices
    await Invoice.deleteMany({ userId });

    const invoices = [];
    const now = new Date();

    // 2. Generate 225 invoices
    for (let i = 0; i < 225; i++) {
      const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
      const numItems = Math.floor(Math.random() * 3) + 1;
      const invoiceItems = [];
      let subtotal = 0;

      for (let j = 0; j < numItems; j++) {
        const itemTemplate = ITEMS[
          Math.floor(Math.random() * ITEMS.length)
        ] as any;
        const priceRange = itemTemplate.priceRange;
        const price =
          Math.floor(Math.random() * (priceRange[1] - priceRange[0])) +
          priceRange[0];
        const quantity = Math.floor(Math.random() * 3) + 1;
        const total = price * quantity;

        invoiceItems.push({
          name: itemTemplate?.name,
          quantity,
          price,
          tax: 0,
          total
        });
        subtotal += total;
      }

      // Random date between 6 months ago and today
      const date = new Date();
      date.setMonth(now.getMonth() - Math.floor(Math.random() * 6));
      date.setDate(Math.floor(Math.random() * 28) + 1);

      const dueDate = new Date(date);
      dueDate.setDate(date.getDate() + 14);

      invoices.push({
        userId,
        billFrom: {
          businessName: user.businessName || user.fullName,
          email: user.email,
          address: user.address || 'N/A',
          phoneNumber: user.phoneNumber || 'N/A',
          companyLogoUrl: user.companyLogoUrl
        },
        billTo: {
          clientName: client?.name,
          clientEmail: client?.email,
          clientAddress: client?.address,
          clientPhone: client?.phone
        },
        items: invoiceItems,
        dueDate: dueDate.toISOString().split('T')[0],
        subtotal,
        taxTotal: 0,
        totalAmount: subtotal,
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
        createdAt: date
      });
    }

    // 3. Bulk insert
    await Invoice.insertMany(invoices);

    res.status(200).json({
      status: 'success',
      message: `${invoices.length} demo invoices seeded successfully`
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
