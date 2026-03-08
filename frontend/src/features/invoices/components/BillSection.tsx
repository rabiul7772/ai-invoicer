import type { LucideIcon } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { useFormContext } from 'react-hook-form';
import type { InvoiceFormValues } from '../validation';

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
}

interface BillSectionProps {
  title: string;
  icon: LucideIcon;
  fields: Field[];
  prefix: 'billFrom' | 'billTo';
}

export const BillSection = ({
  title,
  icon: Icon,
  fields,
  prefix
}: BillSectionProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<InvoiceFormValues>();

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center gap-2 text-(--color-primary) font-bold text-sm tracking-wide uppercase">
        <Icon className="w-5 h-5" />
        <span>{title}</span>
      </div>

      <div className="space-y-4">
        {fields.map(field =>
          field.isTextarea ? (
            <Textarea
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              {...register(`${prefix}.${field.name}` as any)}
              error={(errors[prefix] as any)?.[field.name]?.message}
              rows={3}
            />
          ) : (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              {...register(`${prefix}.${field.name}` as any)}
              error={(errors[prefix] as any)?.[field.name]?.message}
            />
          )
        )}
      </div>
    </div>
  );
};
