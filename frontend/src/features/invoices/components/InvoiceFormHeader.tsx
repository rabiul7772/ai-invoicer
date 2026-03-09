import { Button } from '../../../components/ui/Button';
import { useFormContext } from 'react-hook-form';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

interface InvoiceFormHeaderProps {
  isEditing: boolean;
}

export const InvoiceFormHeader = ({ isEditing }: InvoiceFormHeaderProps) => {
  const { reset } = useFormContext();

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

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-(--color-text-bright) tracking-tight">
            {isEditing ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
          <p className="text-(--color-text-dim) mt-2">
            {isEditing
              ? 'Update the details below to refine your invoice.'
              : 'Fill in the details below to generate a professional invoice.'}
          </p>
        </div>
        <Button
          variant="outline"
          className="border-[rgba(0,255,136,0.2)] text-[#00ff88] hover:bg-[rgba(0,255,136,0.05)]"
          icon={Sparkles}
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
  );
};
