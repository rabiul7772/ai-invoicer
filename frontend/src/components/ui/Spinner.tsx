interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
  xl: 'w-16 h-16 border-4'
};

export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`
        ${sizeMap[size]}
        rounded-full
        border-[rgba(255,255,255,0.15)]
        border-t-(--color-primary)
        animate-spin
        ${className}
      `}
    />
  );
};

/** Full-page centered spinner, useful for page-level loading states */
export const PageSpinner = ({
  size = 'lg'
}: {
  size?: SpinnerProps['size'];
}) => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <Spinner size={size} />
  </div>
);
