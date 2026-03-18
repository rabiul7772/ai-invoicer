import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { formatCurrency, getInitials } from '../../../lib/utils';

interface RecentInvoiceRowProps {
  _id: string;
  status: string;
  totalAmount: number;
  dueDate: string;
  clientName: string;
  color: string;
}

export const RecentInvoiceRow = ({
  _id,
  status,
  totalAmount,
  dueDate,
  clientName,
  color
}: RecentInvoiceRowProps) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/invoices/${_id}`)}
      className="group hover:bg-[rgba(255,255,255,0.012)] transition-colors cursor-pointer"
    >
      <td className="py-3 sm:py-6 pr-2 sm:pr-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-black shrink-0"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {getInitials(clientName)}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-xs sm:text-sm truncate">
              {clientName}
            </p>
            <p className="text-[10px] text-[rgba(255,255,255,0.3)] truncate">
              INV-{_id.slice(-5).toUpperCase()}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 sm:py-6 pr-2 sm:pr-6 font-bold text-xs sm:text-sm text-white">
        {formatCurrency(totalAmount)}
      </td>
      <td className="py-3 sm:py-6 pr-2 sm:pr-6">
        <span
          className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md"
          style={{ backgroundColor: `${color}10`, color }}
        >
          {status}
        </span>
      </td>
      <td className="py-3 sm:py-6 pr-2 sm:pr-6 text-xs sm:text-sm text-[rgba(255,255,255,0.5)] font-medium hidden sm:table-cell">
        {new Date(dueDate).toLocaleDateString()}
      </td>
      <td className="py-3 sm:py-6 text-right">
        <button className="inline-block p-1 sm:p-2 rounded-lg text-[#00ff88]">
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </td>
    </tr>
  );
};
