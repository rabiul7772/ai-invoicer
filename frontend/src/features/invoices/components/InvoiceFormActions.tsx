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
    <div className="flex justify-end gap-6 pt-12 border-t border-[rgba(255,255,255,0.05)]">
      <Button
        variant="ghost"
        type="button"
        className="border border-(--color-primary)"
        onClick={() => reset()}
      >
        Discard
      </Button>
      <Button
        variant="outline"
        size="md"
        type="button"
        onClick={onPreview}
        isLoading={isGeneratingPdf}
      >
        Preview PDF
      </Button>
      <Button
        type="submit"
        variant="neon"
        size="md"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isEditing ? 'Update Invoice' : 'Generate Invoice'}
      </Button>
    </div>
  );
};
