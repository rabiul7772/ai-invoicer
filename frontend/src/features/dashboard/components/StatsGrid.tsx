import { FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { formatCurrency } from '../../../lib/utils';

export const StatsGrid = () => {
  const { data, isLoading } = useDashboardStats();

  const current = data?.allTimeStats[0] || {
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    overdueAmount: 0
  };

  const stats = [
    {
      label: 'Total Invoices',
      value: formatCurrency(current.totalAmount),
      icon: FileText
    },
    {
      label: 'Total Paid',
      value: formatCurrency(current.paidAmount),
      icon: CheckCircle2
    },
    {
      label: 'Total Unpaid',
      value: formatCurrency(current.unpaidAmount),
      icon: Clock
    },
    {
      label: 'Total Overdue',
      value: formatCurrency(current.overdueAmount),
      icon: AlertCircle
    }
  ] as const;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-[rgba(255,255,255,0.05)] rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};
