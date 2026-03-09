import { useState } from 'react';
import { Edit2, Mail, Trash2 } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Link } from 'react-router';
import { useUpdateInvoiceStatus } from '../hooks/useUpdateInvoiceStatus';
import { useDeleteInvoice } from '../hooks/useDeleteInvoice';
import { DeleteInvoiceModal } from './DeleteInvoiceModal';

interface InvoiceRowProps {
  _id: string;
  billTo: {
    clientName: string;
    clientEmail: string;
  };
  billFrom: {
    businessName: string;
  };
  totalAmount: number;
  dueDate: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  onSendEmail: (invoiceData: any) => void;
}

export const InvoiceRow = (props: InvoiceRowProps) => {
  const { _id, billTo, totalAmount, dueDate, status, onSendEmail } = props;
  const { mutate: updateStatus, isPending } = useUpdateInvoiceStatus();
  const { mutate: deleteInvoice, isPending: isDeleting } = useDeleteInvoice();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Generate a random color for the initials badge based on client name
  const initials = billTo.clientName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const statusMap = {
    DRAFT: 'unpaid',
    SENT: 'unpaid',
    PAID: 'paid',
    OVERDUE: 'overdue'
  } as const;

  const isOverdue = new Date(dueDate) < new Date() && status === 'SENT';
  const displayVariant = isOverdue ? 'overdue' : statusMap[status] || 'unpaid';
  const displayText = isOverdue ? 'OVERDUE' : status;

  return (
    <tr className="group border-b border-[rgba(255,255,255,0.03)] last:border-0 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
      <td className="py-2.5 pl-6">
        <span className="font-bold text-sm text-(--color-text-bright) whitespace-nowrap">
          #INV-{_id.slice(-6).toUpperCase()}
        </span>
      </td>
      <td className="py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-(--color-primary)/10 border border-(--color-primary)/20 flex items-center justify-center text-[10px] font-bold text-(--color-primary) shrink-0">
            {initials}
          </div>
          <span className="font-medium text-sm text-(--color-text-bright) truncate max-w-[150px]">
            {billTo.clientName}
          </span>
        </div>
      </td>
      <td className="py-2.5">
        <span className="font-bold text-sm text-(--color-text-bright)">
          ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </td>
      <td className="py-2.5 text-xs text-(--color-text-dim)">
        {new Date(dueDate).toLocaleDateString()}
      </td>
      <td className="py-2.5">
        <Badge variant={displayVariant} className="scale-90 origin-left">
          {displayText}
        </Badge>
      </td>
      <td className="py-2.5 pr-6">
        <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
          {status !== 'PAID' && (
            <>
              <button
                onClick={() => updateStatus({ id: _id, status: 'PAID' })}
                disabled={isPending}
                className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-(--color-primary) bg-[rgba(0,255,136,0.05)] border border-[rgba(0,255,136,0.1)] rounded-md hover:bg-[rgba(0,255,136,0.1)] transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                Mark Paid
              </button>

              <Link to={`/edit-invoice/${_id}`}>
                <button className="p-1.5 text-(--color-text-dim) hover:text-(--color-primary) hover:bg-[rgba(255,255,255,0.03)] rounded-md transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </Link>
              <button
                onClick={() => onSendEmail(props)}
                className="p-1.5 text-(--color-text-dim) hover:text-(--color-primary) hover:bg-[rgba(255,255,255,0.03)] rounded-md transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-1.5 text-(--color-text-dim) hover:text-red-500 hover:bg-red-500/5 rounded-md transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <DeleteInvoiceModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() =>
            deleteInvoice(_id, { onSuccess: () => setIsDeleteModalOpen(false) })
          }
          isLoading={isDeleting}
        />
      </td>
    </tr>
  );
};
