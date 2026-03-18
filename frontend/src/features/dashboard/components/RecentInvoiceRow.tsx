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
      <td className="py-6 pr-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {getInitials(clientName)}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{clientName}</p>
            <p className="text-xs text-[rgba(255,255,255,0.3)]">
              INV-{_id.slice(-5).toUpperCase()}
            </p>
          </div>
        </div>
      </td>
      <td className="py-6 pr-6 font-bold text-sm text-white">
        {formatCurrency(totalAmount)}
      </td>
      <td className="py-6 pr-6">
        <span
          className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md"
          style={{ backgroundColor: `${color}10`, color }}
        >
          {status}
        </span>
      </td>
      <td className="py-6 pr-6 text-sm text-[rgba(255,255,255,0.5)] font-medium hidden sm:table-cell">
        {new Date(dueDate).toLocaleDateString()}
      </td>
      <td className="py-6 text-right">
        <button className="inline-block p-2 rounded-lg text-[#00ff88]">
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
