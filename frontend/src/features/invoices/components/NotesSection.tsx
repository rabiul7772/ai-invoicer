import { MessageSquareText } from 'lucide-react';
import { Textarea } from '../../../components/ui/Textarea';
import { Input } from '../../../components/ui/Input';
import { useFormContext } from 'react-hook-form';
import type { InvoiceFormValues } from '../validation';

interface NotesSectionProps {
  totals: {
    subtotal: number;
    taxTotal: number;
    totalAmount: number;
  };
}

export const NotesSection = ({ totals }: NotesSectionProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<InvoiceFormValues>();

  return (
    <div className="flex flex-col md:flex-row gap-12 pt-8 border-t border-[rgba(255,255,255,0.05)]">
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-2 text-(--color-primary) font-bold text-sm tracking-wide uppercase">
          <MessageSquareText className="w-5 h-5" />
          <span>Notes & Terms</span>
        </div>

        <div className="space-y-6">
          <Textarea
            label="Notes"
            placeholder="Thank you for your business!"
            {...register('notes')}
            error={errors.notes?.message}
            rows={4}
          />

          <Input
            label="Due Date"
            type="date"
            {...register('dueDate')}
            error={errors.dueDate?.message}
            className="max-w-[240px] "
          />
        </div>
      </div>

      <div className="w-full md:w-[350px]">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-center text-(--color-text-dim)">
            <span className="text-sm font-medium">Subtotal:</span>
            <span className="text-lg font-bold text-(--color-text-white)">
              $
              {totals?.subtotal?.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
            </span>
          </div>

          <div className="flex justify-between items-center text-(--color-text-dim)">
            <span className="text-sm font-medium">Tax:</span>
            <span className="text-lg font-bold text-(--color-text-white)">
              $
              {totals?.taxTotal?.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
            </span>
          </div>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center">
            <span className="text-xl font-black text-(--color-text-bright) uppercase tracking-tighter">
              Total:
            </span>
            <span className="text-5xl font-black text-[#00ff88] drop-shadow-[0_0_20px_rgba(0,255,136,0.3)] tracking-tighter">
              $
              {totals?.totalAmount?.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
