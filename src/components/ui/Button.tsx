import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'default';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#b54a3f] text-white shadow-sm hover:bg-[#9f3f36] focus-visible:outline-[#b54a3f]',
  secondary: 'bg-white text-stone-800 ring-1 ring-stone-200 hover:bg-stone-50 focus-visible:outline-[#b54a3f]',
  destructive: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus-visible:outline-rose-600',
  default: 'bg-[#1e1d1b] text-white shadow-sm hover:bg-[#11100f] focus-visible:outline-[#1e1d1b]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  className = '',
  children,
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${[
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transform-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}`}
      {...props}
    >
      {loading ? (
        <span className="inline-flex h-4 w-4 items-center justify-center">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        </span>
      ) : (
        leftIcon
      )}
      <span>{loading ? 'Loading...' : children}</span>
      {!loading && rightIcon}
    </button>
  );
}
