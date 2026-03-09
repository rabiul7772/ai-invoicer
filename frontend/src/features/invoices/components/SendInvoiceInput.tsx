import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: 'text' | 'email' | 'textarea';
  rows?: number;
}

export const SendInvoiceInput = ({
  label,
  register,
  error,
  type = 'text',
  rows = 5
}: Props) => {
  const baseClasses =
    'w-full bg-(--color-bg-input) border border-(--color-border) rounded-lg px-4 py-2 text-(--color-text-bright) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400 capitalize">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input type={type} {...register} className={baseClasses} />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
