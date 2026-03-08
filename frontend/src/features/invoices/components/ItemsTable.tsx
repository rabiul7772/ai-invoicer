import { Trash2, Plus } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { InvoiceFormValues } from '../validation';

interface ItemsRowProps {
  index: number;
  remove: (index: number) => void;
  isOnlyRow: boolean;
}

// We avoid using the wrapper <Input> component here to prevent the flex-col wrapper
// from disrupting the CSS grid alignment. Using raw <input> elements instead.
const ItemsRow = ({ index, remove, isOnlyRow }: ItemsRowProps) => {
  const { register, control } = useFormContext<InvoiceFormValues>();

  // useWatch subscribes reactively to the computed total written by setValue() in the hook.
  // Regular watch() does not always re-render when setValue is called programmatically.
  const total = useWatch({ control, name: `items.${index}.total` as any });

  const inputCls =
    'w-full h-12 px-4 bg-[#0b1a13] border border-[#1a2e25] rounded-md text-white text-sm font-medium focus:outline-none focus:border-[#00ff88] transition-colors placeholder:text-[#3a4a44]';

  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: '1fr 80px 120px 100px 140px 40px',
        gap: '16px'
      }}
    >
      <input
        placeholder="Project Management"
        {...register(`items.${index}.name` as const)}
        className={inputCls}
      />
      <input
        type="number"
        placeholder="0"
        {...register(`items.${index}.quantity` as const, {
          valueAsNumber: true
        })}
        className={`${inputCls} text-center px-2`}
      />
      <input
        type="number"
        placeholder="0"
        {...register(`items.${index}.price` as const, { valueAsNumber: true })}
        className={`${inputCls} text-center px-2`}
      />
      <input
        type="number"
        placeholder="0"
        {...register(`items.${index}.tax` as const, { valueAsNumber: true })}
        className={`${inputCls} text-center px-2`}
      />
      <span className="text-white font-black text-xl tracking-tight pl-1">
        $
        {Number(total || 0).toLocaleString(undefined, {
          minimumFractionDigits: 2
        })}
      </span>
      <div className="flex items-center justify-center">
        {!isOnlyRow && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

interface ItemsTableProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
}

export const ItemsTable = ({ fields, append, remove }: ItemsTableProps) => {
  const headerCols = {
    gridTemplateColumns: '1fr 80px 120px 100px 140px 40px',
    gap: '16px'
  };

  return (
    <div className="w-full mt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 text-[#00ff88] font-black text-sm tracking-widest uppercase mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/20">
          <div className="grid grid-cols-2 gap-[3px]">
            <div className="w-[6px] h-[6px] bg-[#00ff88] rounded-[1px]" />
            <div className="w-[6px] h-[6px] bg-[#00ff88] rounded-[1px]" />
            <div className="w-[6px] h-[6px] bg-[#00ff88] rounded-[1px]" />
            <div className="w-[6px] h-[6px] bg-[#00ff88] rounded-[1px]" />
          </div>
        </div>
        <span>Items</span>
      </div>
      <div className="h-px bg-[#1a2e25] w-full mb-8" />

      {/* Table Headers */}
      <div
        className="items-center px-1 text-[11px] font-black text-white tracking-widest uppercase mb-4 grid"
        style={headerCols}
      >
        <div>Item</div>
        <div className="text-center">Qty</div>
        <div className="text-center">Price</div>
        <div className="text-center">Tax (%)</div>
        <div className="pl-1">Total</div>
        <div></div>
      </div>

      {/* Rows */}
      <div className="space-y-5">
        {fields.map((field, index) => (
          <ItemsRow
            key={field.id}
            index={index}
            remove={remove}
            isOnlyRow={fields.length === 1}
          />
        ))}
      </div>

      {/* Add Item Button */}
      <button
        type="button"
        onClick={() =>
          append({ name: '', quantity: 1, price: 0, tax: 0, total: 0 })
        }
        className="mt-8 inline-flex items-center h-12 px-6 border border-[#1a2e25] bg-[#0b1a13] text-[#00ff88] hover:bg-[#00ff88]/5 hover:border-[#00ff88]/30 transition-all text-xs font-black uppercase tracking-widest rounded-lg"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </button>
    </div>
  );
};
