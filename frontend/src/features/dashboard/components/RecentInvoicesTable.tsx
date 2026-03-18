import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { RecentInvoiceRow } from './RecentInvoiceRow';
import { STATUS_COLORS } from '../../../constants';

export const RecentInvoicesTable = () => {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="card-premium border-[rgba(0,255,136,0.05)]! animate-pulse">
        <div className="h-8 w-48 bg-[rgba(255,255,255,0.05)] mb-8 rounded" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-[rgba(255,255,255,0.02)] rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium border-[rgba(0,255,136,0.05)]! overflow-hidden p-4 md:p-0!">
      <div className="flex items-center justify-between mb-4 md:mb-6 md:px-6 md:pt-6">
        <h2 className="text-lg sm:text-xl font-bold">Recent Invoices</h2>
        <Link
          to="/invoices"
          className="text-[#00ff88] text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline"
        >
          View All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[rgba(255,255,255,0.3)] text-[10px] md:text-[9px] font-black uppercase tracking-widest border-b border-[rgba(255,255,255,0.05)]">
              <th className="pb-2 md:py-2.5 md:pl-6 font-black">Client</th>
              <th className="pb-2 md:py-2.5 md:pr-4 font-black">Amount</th>
              <th className="pb-2 md:py-2.5 md:pr-4 font-black">Status</th>
              <th className="pb-2 md:py-2.5 md:pr-4 font-black hidden sm:table-cell">
                Due Date
              </th>
              <th className="pb-2 md:py-2.5 md:pr-6 text-right font-black">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
            {data && data.recentInvoices.length > 0 ? (
              data.recentInvoices.map(invoice => (
                <RecentInvoiceRow
                  key={invoice._id}
                  _id={invoice._id}
                  status={invoice.status}
                  totalAmount={invoice.totalAmount}
                  dueDate={invoice.dueDate}
                  clientName={invoice.billTo.clientName}
                  color={STATUS_COLORS[invoice.status] || '#94a3b8'}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-(--color-text-dim) font-medium">
                    No invoices created yet. Your recent activity will appear
                    here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
