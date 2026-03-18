import { Mail, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { ModalPortal } from '../../../components/ui/ModalPortal';
import { useSendInvoiceForm } from '../hooks/useSendInvoiceForm';
import { SendInvoiceInput } from './SendInvoiceInput';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
  status: string;
  defaultData: {
    clientName: string;
    clientEmail: string;
    businessName: string;
  };
  onSuccess?: () => void;
}

export const SendInvoiceModal = ({
  isOpen,
  onClose,
  invoiceId,
  status,
  defaultData,
  onSuccess
}: Props) => {
  const { register, onSubmit, errors, isLoading } = useSendInvoiceForm({
    invoiceId,
    onClose,
    status,
    defaultData,
    onSuccess
  });

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-lg bg-(--color-bg-card) border border-(--color-border) rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-1 px-4 border-b border-(--color-border) shrink-0">
            <h2 className="text-xl font-bold text-(--color-text-bright)">
              {status === 'DRAFT' ? 'Send Invoice' : 'Send Reminder'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={onSubmit}
            className="p-2 sm:p-4 space-y-2 sm:space-y-4 overflow-y-auto custom-scrollbar"
          >
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
              rows={8}
              register={register('message')}
              error={errors.message?.message}
            />

            <div className="pt-1 sm:pt-4 flex gap-4">
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
                icon={Mail}
                className="flex-1"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};
