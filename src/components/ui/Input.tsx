import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
          {label}
        </span>
      ) : null}
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        className={`${[
          'w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-950 shadow-sm outline-none transition duration-200 placeholder:text-stone-400 focus:border-[#b54a3f] focus:ring-2 focus:ring-[#f0d2cd]',
          error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : '',
          className,
        ].join(' ')}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}
