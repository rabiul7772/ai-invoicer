import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

export const GeminiIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M12 0L14.65 8.16L24 12L14.65 15.84L12 24L9.35 15.84L0 12L9.35 8.16L12 0Z" />
      </svg>
    );
  }
);

GeminiIcon.displayName = 'GeminiIcon';
