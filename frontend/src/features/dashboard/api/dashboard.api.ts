import { api } from '../../../services/api';

export interface DashboardStats {
  allTimeStats: Array<{
    totalAmount: number;
    paidAmount: number;
    unpaidAmount: number;
    overdueAmount: number;
  }>;
  recentInvoices: Array<{
    _id: string;
    totalAmount: number;
    status: string;
    dueDate: string;
    billTo: { clientName: string };
  }>;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return response.data.data;
};
