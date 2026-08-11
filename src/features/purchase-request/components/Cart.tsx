import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { formatCurrency } from '../../../lib/utils';
import type { CartItem as CartItemModel } from '../types/purchase-request';
import { CartItem } from './CartItem';

export interface CartProps {
  cart: CartItemModel[];
  subtotal: number;
  totalItems: number;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClearCart: () => void;
  onBrowseProducts: () => void;
}

export function Cart({
  cart,
  subtotal,
  totalItems,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
  onBrowseProducts,
}: CartProps) {
  if (cart.length === 0) {
    return (
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-950">Current Request</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Cart</p>
          </div>
        </div>
        <EmptyState
          title="Your cart is empty"
          description="Add operational supplies to prepare your outlet request."
          action={
            <Button type="button" variant="primary" size="md" onClick={onBrowseProducts}>
              Browse Products
            </Button>
          }
        />
      </section>
    );
  }

  return (
    <aside className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-stone-950">Current Request</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Cart</p>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={onClearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Total Items</span>
          <span className="text-sm font-bold text-stone-950">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Subtotal</span>
          <span className="text-lg font-bold text-stone-950">{formatCurrency(subtotal)}</span>
        </div>
      </div>
    </aside>
  );
}
