import { AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { useNavigate } from 'react-router';

interface Props {
  onClose: () => void;
}

export const AIProfileRequired = ({ onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-10">
      <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
        <AlertCircle className="w-10 h-10 text-amber-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-(--color-text-bright)">
          Business Info Required
        </h3>
        <p className="text-(--color-text-dim) max-w-xs mx-auto">
          Please fill up your business info to create an invoice with AI. This
          information is needed to populate the invoice properly.
        </p>
      </div>
      <Button
        onClick={() => {
          navigate('/profile');
          onClose();
        }}
        icon={ArrowRight}
        className="mt-2"
      >
        Go to Profile
      </Button>
    </div>
  );
};
