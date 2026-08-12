'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { formatCurrency } from '../../../lib/utils';
import type { CartItem as CartItemModel } from '../types/purchase-request';
import { CartItem } from './CartItem';

export interface CartModalProps {
  isOpen: boolean;
  cart: CartItemModel[];
  subtotal: number;
  totalItems: number;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClearCart: () => void;
  onClose: () => void;
  onContinueShopping: () => void;
  onReviewRequest: () => void;
}

export function CartModal({
  isOpen,
  cart,
  subtotal,
  totalItems,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
  onClose,
  onContinueShopping,
  onReviewRequest,
}: CartModalProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsRendered(false);
    }
  };

  if (!isRendered) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        aria-label="Close cart overlay"
        className={`absolute inset-0 bg-stone-950/55 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Current request cart"
        onTransitionEnd={handleAnimationEnd}
        className={`relative z-10 flex max-h-[calc(100vh-24px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:max-h-[86vh] ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 bg-[#1f1e1c] px-5 py-5 text-white sm:px-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Your Cart</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.20em] text-stone-400">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-stone-100 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d99a91]"
          >
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {cart.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Add operational supplies to prepare your outlet request."
              icon={
                <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5h2l2 10h12l3-7H6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="17" cy="20" r="1.5" fill="currentColor" />
                </svg>
              }
              action={
                <Button type="button" variant="primary" size="md" onClick={() => {
                  onContinueShopping();
                  onClose();
                }}>
                  Continue Shopping
                </Button>
              }
            />
          ) : (
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
          )}
        </div>

        {cart.length > 0 ? (
          <div className="border-t border-stone-200 bg-[#f4f1ec] px-4 py-5 sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Total Items</span>
              <span className="text-sm font-bold text-stone-950">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Subtotal</span>
              <span className="text-xl font-bold text-stone-950">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="primary" size="md" className="flex-1" onClick={() => {
                onReviewRequest();
              }}>
                Review Request
              </Button>
              <Button type="button" variant="secondary" size="md" onClick={() => {
                onContinueShopping();
                onClose();
              }}>
                Continue Shopping
              </Button>
              <Button type="button" variant="secondary" size="md" onClick={onClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
