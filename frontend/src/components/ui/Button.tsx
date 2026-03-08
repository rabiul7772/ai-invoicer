import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Utility for merging Tailwind classes safely
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-black uppercase tracking-widest transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
  {
    variants: {
      variant: {
        neon: 'bg-[#00ff88] text-[#06120c] hover:bg-[#00e67a] shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]',
        outline:
          'border border-[rgba(0,255,136,0.5)] text-[#00ff88] bg-transparent hover:bg-[#00ff88]/5 hover:border-[#00ff88]',
        ghost:
          'bg-transparent text-[#94a3b8] hover:text-white normal-case tracking-normal font-bold',
        danger:
          'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'
      },
      size: {
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-6 py-2.5 text-xs',
        lg: 'px-10 py-4 text-sm',
        icon: 'p-2'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'neon',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: LucideIcon;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      icon: Icon,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {!isLoading && Icon && (
          <Icon
            className={cn('w-4 h-4', size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')}
          />
        )}
        {children}
        {isLoading && (
          <div className="w-4 h-4 border-2 border-[rgba(0,0,0,0.3)] border-t-white rounded-full animate-spin shrink-0" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
