import { X, Send } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useSendInvoiceForm } from '../hooks/useSendInvoiceForm';
import { SendInvoiceInput } from './SendInvoiceInput';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
  defaultData: {
    clientName: string;
    clientEmail: string;
    businessName: string;
  };
}

export const SendInvoiceModal = ({
  isOpen,
  onClose,
  invoiceId,
  defaultData
}: Props) => {
  const { register, onSubmit, errors, isLoading } = useSendInvoiceForm({
    invoiceId,
    onClose,
    defaultData
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-(--color-bg-card) border border-(--color-border) rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-(--color-border)">
          <h2 className="text-xl font-bold text-(--color-text-bright)">
            Send Invoice
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <SendInvoiceInput
            label="Recipient Name"
            register={register('recipientName')}
            error={errors.recipientName?.message}
          />
          <SendInvoiceInput
            label="Recipient Email"
            type="email"
            register={register('recipientEmail')}
            error={errors.recipientEmail?.message}
          />
          <SendInvoiceInput
            label="Subject"
            register={register('subject')}
            error={errors.subject?.message}
          />
          <SendInvoiceInput
            label="Message"
            type="textarea"
            register={register('message')}
            error={errors.message?.message}
          />

          <div className="pt-4 flex gap-4">
            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
              className="flex-1 border border-(--color-border)"
            >
              Cancel
            </Button>
            <Button
              variant="neon"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              icon={Send}
              className="flex-1"
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
