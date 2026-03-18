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
  const { reset, setValue } = useFormContext();
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 text-left">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-(--color-text-bright) tracking-tight">
            {isEditing ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
          <p className="text-sm md:text-base text-(--color-text-dim) mt-2">
            {isEditing
              ? 'Update the details below to refine your invoice.'
              : 'Fill in the details below to generate a professional invoice.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none md:px-6 md:py-2.5 md:text-xs border-[rgba(0,255,136,0.2)] text-[#00ff88] hover:bg-[rgba(0,255,136,0.05)]"
            icon={Sparkles}
            onClick={() => setIsAIModalOpen(true)}
          >
            Create with AI
          </Button>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className="flex-1 md:flex-none md:px-6 md:py-2.5 md:text-xs border border-(--color-primary)"
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
          setValue('billTo.clientName', data.clientName);
          setValue('billTo.clientEmail', data.email);
          setValue('billTo.clientAddress', data.address);
          setValue('billTo.clientPhone', data.phone || '');
          setValue(
            'items',
            data.items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              tax: 0,
              total: item.quantity * item.price
            }))
          );
        }}
      />
    </div>
  );
};
