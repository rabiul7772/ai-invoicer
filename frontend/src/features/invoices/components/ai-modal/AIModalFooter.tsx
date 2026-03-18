import { Button } from '../../../../components/ui/Button';
import { GeminiIcon } from '../../../../components/ui/GeminiIcon';

interface Props {
  onClose: () => void;
  onGenerate: () => void;
  isExtracting: boolean;
  canGenerate: boolean;
}

export const AIModalFooter = ({
  onClose,
  onGenerate,
  isExtracting,
  canGenerate
}: Props) => {
  return (
    <div className="pt-4 flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      <Button
        variant="ghost"
        type="button"
        onClick={onClose}
        className="flex-1 border border-(--color-border)"
        disabled={isExtracting}
      >
        Cancel
      </Button>
      <Button
        variant="neon"
        icon={GeminiIcon}
        className="flex-1"
        onClick={onGenerate}
        isLoading={isExtracting}
        disabled={isExtracting || !canGenerate}
      >
        {isExtracting ? 'Extracting...' : 'Generate Invoice'}
      </Button>
    </div>
  );
};
