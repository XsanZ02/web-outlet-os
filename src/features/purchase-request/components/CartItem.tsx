import { QuantityInput } from '../../../components/ui/QuantityInput';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../lib/utils';
import type { CartItem as CartItemModel } from '../types/purchase-request';

export interface CartItemProps {
  item: CartItemModel;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const stockMax = item.product.stock;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:w-20">
        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-stone-950">{item.product.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{item.product.category}</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={() => onRemove(item.product.id)}>
            Remove
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Unit Price</span>
            <div className="mt-1 text-xs font-bold text-stone-950">{formatCurrency(item.product.price)}</div>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Quantity</span>
            <div className="mt-1">
              <QuantityInput
                value={item.quantity}
                min={0}
                max={stockMax}
                ariaLabel={`${item.product.name} cart item quantity`}
                onIncrease={() => onIncrease(item.product.id)}
                onDecrease={() => onDecrease(item.product.id)}
              />
            </div>
          </div>
          <div className="ml-auto text-right">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Line Total</span>
            <div className="mt-1 text-sm font-bold text-stone-950">{formatCurrency(item.quantity * item.product.price)}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
