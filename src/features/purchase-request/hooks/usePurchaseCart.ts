'use client';

import { useMemo, useState } from 'react';
import type { CartItem, Product } from '../types/purchase-request';

export interface UsePurchaseCartResult {
  cart: CartItem[];
  addProduct: (product: Product) => boolean;
  increaseQuantity: (productId: string) => boolean;
  decreaseQuantity: (productId: string) => boolean;
  setQuantity: (productId: string, quantity: number) => boolean;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export function usePurchaseCart(): UsePurchaseCartResult {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = (product: Product): boolean => {
    if (product.status === 'out-of-stock' || product.stock <= 0) {
      return false;
    }

    setCart((currentCart) => {
      const existing = currentCart.find((entry) => entry.product.id === product.id);

      if (existing) {
        const nextQuantity = Math.min(existing.quantity + 1, product.stock);

        if (nextQuantity === existing.quantity) {
          return currentCart;
        }

        return currentCart.map((entry) =>
          entry.product.id === product.id
            ? { ...entry, quantity: nextQuantity }
            : entry
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });

    return true;
  };

  const increaseQuantity = (productId: string): boolean => {
    let changed = false;

    setCart((currentCart) => {
      const existing = currentCart.find((entry) => entry.product.id === productId);

      if (!existing) {
        return currentCart;
      }

      const nextQuantity = Math.min(existing.quantity + 1, existing.product.stock);

      if (nextQuantity === existing.quantity) {
        return currentCart;
      }

      changed = true;

      return currentCart.map((entry) =>
        entry.product.id === productId
          ? { ...entry, quantity: nextQuantity }
          : entry
      );
    });

    return changed;
  };

  const decreaseQuantity = (productId: string): boolean => {
    let changed = false;

    setCart((currentCart) => {
      const existing = currentCart.find((entry) => entry.product.id === productId);

      if (!existing) {
        return currentCart;
      }

      changed = true;

      if (existing.quantity <= 1) {
        return currentCart.filter((entry) => entry.product.id !== productId);
      }

      return currentCart.map((entry) =>
        entry.product.id === productId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      );
    });

    return changed;
  };

  const setQuantity = (productId: string, quantity: number): boolean => {
    let changed = false;

    setCart((currentCart) => {
      const existing = currentCart.find((entry) => entry.product.id === productId);

      if (!existing) {
        return currentCart;
      }

      if (quantity <= 0) {
        changed = true;
        return currentCart.filter((entry) => entry.product.id !== productId);
      }

      const nextQuantity = Math.min(quantity, existing.product.stock);

      if (nextQuantity === existing.quantity) {
        return currentCart;
      }

      changed = true;

      return currentCart.map((entry) =>
        entry.product.id === productId
          ? { ...entry, quantity: nextQuantity }
          : entry
      );
    });

    return changed;
  };

  const removeProduct = (productId: string) => {
    setCart((currentCart) => currentCart.filter((entry) => entry.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totals = useMemo(() => {
    const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = cart.reduce((sum, entry) => sum + entry.quantity * entry.product.price, 0);

    return { totalItems, subtotal };
  }, [cart]);

  return {
    cart,
    addProduct,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    removeProduct,
    clearCart,
    totalItems: totals.totalItems,
    subtotal: totals.subtotal,
  };
}
