import { Button } from '../../../components/ui/Button';
import { useFormContext } from 'react-hook-form';

interface InvoiceFormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  isGeneratingPdf: boolean;
  onPreview: () => void;
}

export const InvoiceFormActions = ({
  isEditing,
  isSubmitting,
  isGeneratingPdf,
  onPreview
}: InvoiceFormActionsProps) => {
  const { reset } = useFormContext();

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 md:gap-4 pt-12 border-t border-[rgba(255,255,255,0.05)]">
      <Button
        variant="ghost"
        type="button"
        size="sm"
        className="md:px-6 md:py-2.5 md:text-xs border border-(--color-primary)"
        onClick={() => reset()}
      >
        Discard
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="md:px-6 md:py-2.5 md:text-xs"
        type="button"
        onClick={onPreview}
        isLoading={isGeneratingPdf}
      >
        Preview PDF
      </Button>
      <Button
        type="submit"
        variant="neon"
        size="sm"
        className="md:px-6 md:py-2.5 md:text-xs"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isEditing ? 'Update Invoice' : 'Generate Invoice'}
      </Button>
    </div>
  );
};
