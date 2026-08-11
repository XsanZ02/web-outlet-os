import type { PropsWithChildren } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#f7e4df] text-[#923b33] ring-[#edc7c0]',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  warning: 'bg-amber-50 text-amber-700 ring-amber-100',
  error: 'bg-rose-50 text-rose-700 ring-rose-100',
  neutral: 'bg-stone-100 text-stone-700 ring-stone-200',
};

export function Badge({
  variant = 'default',
  className = '',
  children,
}: PropsWithChildren<BadgeProps>) {
  return (
    <span className={`${[
      'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ring-1 ring-inset',
      variantClasses[variant],
      className,
    ].join(' ')}`}>{children}</span>
  );
}
