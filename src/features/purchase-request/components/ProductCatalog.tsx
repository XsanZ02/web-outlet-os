import type { CartItem, Product } from '../types/purchase-request';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

export function ProductCatalog({
  products,
  cartItems,
  onAddToCart,
  onIncrease,
  onDecrease,
}: ProductCatalogProps) {
  const cartMap = new Map(cartItems.map((item) => [item.product.id, item.quantity]));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in-up motion-reduce:animate-none"
          style={{ animationFillMode: 'backwards', animationDelay: `${index * 50}ms` }}
        >
          <ProductCard
            product={product}
            quantityInCart={cartMap.get(product.id) ?? 0}
            onAddToCart={onAddToCart}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      ))}
    </div>
  );
}
