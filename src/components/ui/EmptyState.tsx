import type { PropsWithChildren, ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: PropsWithChildren<EmptyStateProps>) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-8 py-12 text-center">
      {icon ? <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-stone-700 ring-1 ring-stone-200">{icon}</div> : null}
      <h3 className="text-lg font-bold text-stone-950">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
