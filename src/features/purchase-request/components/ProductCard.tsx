import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { QuantityInput } from '../../../components/ui/QuantityInput';
import { formatCurrency } from '../../../lib/utils';
import type { Product } from '../types/purchase-request';

export interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

export function ProductCard({
  product,
  quantityInCart,
  onAddToCart,
  onIncrease,
  onDecrease,
}: ProductCardProps) {
  const stockStatusMap = {
    available: { label: 'Available', variant: 'success' as const, stockClassName: 'text-stone-700' },
    'low-stock': { label: 'Low Stock', variant: 'warning' as const, stockClassName: 'text-amber-700' },
    'out-of-stock': { label: 'Out of Stock', variant: 'error' as const, stockClassName: 'text-rose-700' },
  };

  const stockStatus = stockStatusMap[product.status];
  const isInCart = quantityInCart > 0;
  const isUnavailable = product.status === 'out-of-stock' || product.stock <= 0;

  return (
    <article
      className={[
        'flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200',
        isInCart ? 'border-[#d99a91] ring-1 ring-[#f0d2cd]' : 'border-stone-200 hover:border-stone-300 hover:shadow-md',
      ].join(' ')}
    >
      <div className="relative h-40 overflow-hidden bg-stone-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        {isInCart ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#1f1e1c] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            In Cart
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{product.category}</p>
            <h3 className="mt-2 text-base font-bold leading-snug text-stone-950">{product.name}</h3>
          </div>
          <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
        </div>

        <p className="mt-3 min-h-[44px] text-sm leading-6 text-stone-600">{product.description}</p>

        <div className="mt-4 flex items-end justify-between gap-4 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Unit Price</p>
            <p className="mt-1 text-lg font-bold text-stone-950">{formatCurrency(product.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Stock</p>
            <p className={`mt-1 text-sm font-bold ${stockStatus.stockClassName}`}>{product.stock} units</p>
          </div>
        </div>

        <div className="mt-5 min-h-12">
          {isInCart ? (
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#f7e4df] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#923b33]">
                In Cart
              </span>
              <QuantityInput
                value={quantityInCart}
                min={0}
                max={product.stock}
                ariaLabel={`${product.name} quantity`}
                onIncrease={() => onIncrease(product.id)}
                onDecrease={() => onDecrease(product.id)}
              />
            </div>
          ) : (
            <Button
              type="button"
              size="md"
              variant="primary"
              disabled={isUnavailable}
              className="w-full"
              onClick={() => onAddToCart(product)}
            >
              {isUnavailable ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
          {isUnavailable ? (
            <p className="mt-2 text-xs font-semibold text-rose-700">This item is currently unavailable.</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
