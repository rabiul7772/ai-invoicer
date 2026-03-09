import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
  {
    variants: {
      variant: {
        paid: 'bg-[rgba(0,255,136,0.1)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]',
        unpaid:
          'bg-[rgba(255,255,255,0.05)] text-(--color-text-dim) border border-[rgba(255,255,255,0.1)]',
        overdue:
          'bg-[rgba(255,85,85,0.1)] text-[#ff5555] border border-[rgba(255,85,85,0.2)]'
      }
    },
    defaultVariants: {
      variant: 'unpaid'
    }
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'paid' && 'bg-[#00ff88]',
          variant === 'unpaid' && 'bg-(--color-text-dim)',
          variant === 'overdue' && 'bg-[#ff5555]'
        )}
      />
      {props.children}
    </div>
  );
};
