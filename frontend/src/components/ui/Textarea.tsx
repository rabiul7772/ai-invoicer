import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-semibold text-(--color-text-bright)">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 bg-(--color-bg-deep) border border-[rgba(255,255,255,0.1)] rounded-md 
            text-(--color-text-white) text-sm focus:outline-none focus:border-(--color-primary) 
            transition-colors duration-200 placeholder:text-(--color-text-muted) resize-y
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
