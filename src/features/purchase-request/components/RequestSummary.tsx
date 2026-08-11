import { formatCurrency } from '../../../lib/utils';
import type { CartItem, PaymentMethod } from '../types/purchase-request';
import { getPaymentMethodLabel } from '../utils/getPaymentMethodLabel';

export interface RequestSummaryProps {
  cart: CartItem[];
  subtotal: number;
  totalItems: number;
  paymentMethod: PaymentMethod;
}

export function RequestSummary({ cart, subtotal, totalItems, paymentMethod }: RequestSummaryProps) {
  return (
    <aside className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-stone-950">Request Summary</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Current Cart</p>
      </div>

      <div className="space-y-4">
        {cart.map((entry) => (
          <div key={entry.product.id} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <div className="h-14 w-14 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <img src={entry.product.image} alt={entry.product.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-stone-950">{entry.product.name}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{entry.product.category}</div>
              <div className="mt-2 text-xs font-semibold text-stone-600">
                {entry.quantity} x {formatCurrency(entry.product.price)}
              </div>
            </div>
            <div className="text-sm font-bold text-stone-950">{formatCurrency(entry.quantity * entry.product.price)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-stone-200 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">Total Items</span>
          <span className="text-sm font-bold text-stone-950">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">Estimated Total</span>
          <span className="text-lg font-bold text-stone-950">{formatCurrency(subtotal)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">Payment Method</span>
          <span className="text-sm font-bold text-stone-950">{getPaymentMethodLabel(paymentMethod)}</span>
        </div>
      </div>
    </aside>
  );
}
