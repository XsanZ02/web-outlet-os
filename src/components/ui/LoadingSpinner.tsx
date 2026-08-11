export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <span className="inline-flex items-center justify-center">
      <span className={`${[
        'animate-spin rounded-full border-slate-600 border-t-transparent',
        sizeMap[size],
        className,
      ].join(' ')}`}
        aria-hidden="true"
      />
    </span>
  );
}
