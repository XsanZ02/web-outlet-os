import { useEffect, useRef } from 'react';

export interface QuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  ariaLabel?: string;
}

export function QuantityInput({
  value,
  min = 0,
  max,
  disabled = false,
  onIncrease,
  onDecrease,
  ariaLabel = 'Quantity',
}: QuantityInputProps) {
  const increaseDisabled = disabled || (typeof max === 'number' && value >= max);
  const decreaseDisabled = disabled || value <= min;

  const valueRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (valueRef.current) {
      valueRef.current.classList.remove('animate-pop-in');
      void valueRef.current.offsetWidth; // Force reflow to restart animation
      valueRef.current.classList.add('animate-pop-in');
    }
  }, [value]);

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <button
        type="button"
        aria-label={`Decrease ${ariaLabel}`}
        disabled={decreaseDisabled}
        onClick={onDecrease}
        className="grid h-9 w-9 place-items-center text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b54a3f] disabled:cursor-not-allowed disabled:text-stone-300 active:scale-95 motion-reduce:transform-none"
      >
        -
      </button>

      <span ref={valueRef} className="min-w-10 border-x border-stone-200 px-2 text-center text-sm font-bold text-stone-950 motion-reduce:animate-none" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        aria-label={`Increase ${ariaLabel}`}
        disabled={increaseDisabled}
        onClick={onIncrease}
        className="grid h-9 w-9 place-items-center text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b54a3f] disabled:cursor-not-allowed disabled:text-stone-300 active:scale-95 motion-reduce:transform-none"
      >
        +
      </button>
    </div>
  );
}
