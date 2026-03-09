import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { ModalPortal } from '../../../components/ui/ModalPortal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const DeleteInvoiceModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading
}: Props) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm bg-(--color-bg-card) border border-(--color-border) rounded-2xl p-6 shadow-2xl space-y-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-(--color-text-bright)">
                Delete Invoice
              </h3>
              <p className="text-sm text-(--color-text-dim)">
                Are you sure to delete the invoice? This action cannot be
                undone.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="flex-1 border border-(--color-border)"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={onConfirm}
              isLoading={isLoading}
              icon={Trash2}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
