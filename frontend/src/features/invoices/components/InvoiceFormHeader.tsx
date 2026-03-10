import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { useFormContext } from 'react-hook-form';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { CreateWithAIModal } from './CreateWithAIModal';

interface InvoiceFormHeaderProps {
  isEditing: boolean;
}

export const InvoiceFormHeader = ({ isEditing }: InvoiceFormHeaderProps) => {
  const { reset, getValues } = useFormContext();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <div className="space-y-6 mb-10">
      {isEditing && (
        <Link
          to="/invoices"
          className="inline-flex items-center gap-2 text-sm font-medium text-(--color-text-dim) hover:text-(--color-primary) transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Invoices
        </Link>
      )}

      <div className="flex justify-between items-center text-left">
        <div className="flex-1">
          <h1 className="text-4xl font-black text-(--color-text-bright) tracking-tight">
            {isEditing ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
          <p className="text-(--color-text-dim) mt-2">
            {isEditing
              ? 'Update the details below to refine your invoice.'
              : 'Fill in the details below to generate a professional invoice.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-[rgba(0,255,136,0.2)] text-[#00ff88] hover:bg-[rgba(0,255,136,0.05)]"
            icon={Sparkles}
            onClick={() => setIsAIModalOpen(true)}
          >
            Create with AI
          </Button>
          <Button
            variant="ghost"
            type="button"
            className="border border-(--color-primary)"
            onClick={() => reset()}
          >
            Discard
          </Button>
        </div>
      </div>

      <CreateWithAIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onDataExtracted={data => {
          reset({
            ...getValues(),
            billTo: {
              clientName: data.clientName,
              clientEmail: data.email,
              clientAddress: data.address,
              clientPhone: ''
            },
            items: data.items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              tax: 0,
              total: item.quantity * item.price
            }))
          });
        }}
      />
    </div>
  );
};
