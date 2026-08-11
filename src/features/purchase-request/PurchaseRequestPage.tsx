'use client';

import { useMemo, useState } from 'react';
import { Header } from '../../components/layout/Header';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { CartModal } from './components/CartModal';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductFilters } from './components/ProductFilters';
import { RequestDetailsForm, type PurchaseRequestDetails } from './components/RequestDetailsForm';
import { RequestSuccess } from './components/RequestSuccess';
import { RequestSummary } from './components/RequestSummary';
import { RequestDetailsView } from './components/RequestDetailsView';
import { usePurchaseCart } from './hooks/usePurchaseCart';
import { productCategories, products } from './data/products';
import type { PaymentMethod, Priority, PurchaseRequestPurpose, SubmittedPurchaseRequest } from './types/purchase-request';

export function PurchaseRequestPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [view, setView] = useState<'catalog' | 'review' | 'success' | 'details'>('catalog');
  const [submittedRequest, setSubmittedRequest] = useState<SubmittedPurchaseRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cart = usePurchaseCart();

  const [requestDetails, setRequestDetails] = useState<PurchaseRequestDetails>({
    outlet: 'Kebon Jeruk Outlet',
    requiredBy: getDefaultRequiredBy(),
    priority: 'normal' as Priority,
    purpose: 'regular-stock-replenishment' as PurchaseRequestPurpose,
    paymentMethod: 'company-account' as PaymentMethod,
    notes: '',
  });

  const [requestErrors, setRequestErrors] = useState<Partial<Record<keyof PurchaseRequestDetails | 'cart', string>>>({});

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesQuery = normalizedQuery
        ? product.name.toLowerCase().includes(normalizedQuery) || product.category.toLowerCase().includes(normalizedQuery)
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleBrowseProducts = () => {
    const catalogElement = document.getElementById('product-catalog-section');

    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReviewRequest = () => {
    setIsCartModalOpen(false);
    setView('review');
  };

  const handleBackToCatalog = () => {
    setView('catalog');
    setIsCartModalOpen(false);
    handleBrowseProducts();
  };

  const updateRequestDetail = (field: keyof PurchaseRequestDetails, value: string) => {
    setRequestDetails((current) => ({
      ...current,
      [field]: value,
    }));

    setRequestErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.cart;
      return next;
    });
  };

  const validateRequest = () => {
    const nextErrors: Partial<Record<keyof PurchaseRequestDetails | 'cart', string>> = {};

    if (cart.cart.length === 0) {
      nextErrors.cart = 'Add at least one product before submitting.';
    }

    if (!requestDetails.outlet.trim()) {
      nextErrors.outlet = 'Outlet is required.';
    }

    if (!requestDetails.requiredBy || Number.isNaN(new Date(requestDetails.requiredBy).getTime())) {
      nextErrors.requiredBy = 'Required By date is required.';
    }

    if (!requestDetails.priority) {
      nextErrors.priority = 'Priority is required.';
    }

    if (!requestDetails.purpose) {
      nextErrors.purpose = 'Purpose is required.';
    }

    if (!requestDetails.paymentMethod) {
      nextErrors.paymentMethod = 'Payment method is required.';
    }

    setRequestErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitRequest = async () => {
    if (!validateRequest()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const requestId = createRequestId();

    const finalizedRequest: SubmittedPurchaseRequest = {
      requestId,
      outlet: requestDetails.outlet,
      requiredBy: requestDetails.requiredBy,
      priority: requestDetails.priority,
      purpose: requestDetails.purpose,
      paymentMethod: requestDetails.paymentMethod,
      notes: requestDetails.notes,
      cartItems: cart.cart,
      totalItems: cart.totalItems,
      estimatedTotal: cart.subtotal,
      status: 'submitted',
      submittedAt: new Date(),
    };

    setSubmittedRequest(finalizedRequest);
    cart.clearCart();
    setIsSubmitting(false);
    setView('success');
  };

  const renderCatalog = () => (
    <>
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-950">Purchase Request</h2>
          <p className="mt-2 text-sm font-medium text-stone-500">Order operational supplies for your outlet</p>
        </div>
        <div className="inline-flex w-fit items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-stone-600">
          {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in cart
        </div>
      </div>

      <ProductFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={productCategories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onClear={() => {
          setSearchQuery('');
          setSelectedCategory('');
        }}
      />

      <section id="product-catalog-section" className="rounded-2xl border border-stone-200 bg-[#f4f1ec] p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-stone-950">Product Catalog</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              {filteredProducts.length} products available
            </p>
          </div>
          <span className="rounded-full bg-[#1f1e1c] px-3 py-1 text-xs font-bold text-white">
            {cart.totalItems} selected
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductCatalog
            products={filteredProducts}
            cartItems={cart.cart}
            onAddToCart={cart.addProduct}
            onIncrease={cart.increaseQuantity}
            onDecrease={cart.decreaseQuantity}
          />
        ) : (
          <EmptyState
            title="No products found"
            description="Try another search term or reset the category filter."
            action={<Button type="button" variant="secondary" size="md" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}>Reset filters</Button>}
          />
        )}
      </section>
    </>
  );

  const renderReview = () => (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-950">Purchase Request</h2>
          <p className="mt-2 text-sm font-medium text-stone-500">Review your request before submitting</p>
        </div>
        <Button type="button" variant="secondary" size="md" onClick={() => setView('catalog')}>Back to Catalog</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <RequestDetailsForm
          values={requestDetails}
          errors={requestErrors}
          onChange={updateRequestDetail}
          onSubmit={handleSubmitRequest}
          isSubmitting={isSubmitting}
        />

        <RequestSummary cart={cart.cart} subtotal={cart.subtotal} totalItems={cart.totalItems} paymentMethod={requestDetails.paymentMethod} />
      </div>

      {requestErrors.cart ? (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {requestErrors.cart}
        </div>
      ) : null}
    </section>
  );

  const renderSuccess = () => {
    if (!submittedRequest) {
      return null;
    }

    return (
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
        <RequestSuccess
          requestId={submittedRequest.requestId}
          totalItems={submittedRequest.totalItems}
          subtotal={submittedRequest.estimatedTotal}
          paymentMethod={submittedRequest.paymentMethod}
          onBackToCatalog={handleBackToCatalog}
          onViewDetails={() => setView('details')}
        />
      </section>
    );
  };

  const renderDetails = () => {
    if (!submittedRequest) {
      return null;
    }

    return (
      <RequestDetailsView
        request={submittedRequest}
        onBack={() => setView('success')}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#eeeae3] text-stone-950">
      <Header cartItemCount={cart.totalItems} onCartClick={() => setIsCartModalOpen(true)} />

      <CartModal
        isOpen={isCartModalOpen}
        cart={cart.cart}
        subtotal={cart.subtotal}
        totalItems={cart.totalItems}
        onIncrease={cart.increaseQuantity}
        onDecrease={cart.decreaseQuantity}
        onRemove={cart.removeProduct}
        onClearCart={cart.clearCart}
        onClose={() => setIsCartModalOpen(false)}
        onContinueShopping={() => {
          setIsCartModalOpen(false);
          handleBrowseProducts();
        }}
        onReviewRequest={handleReviewRequest}
      />

      <PageContainer>
        {view === 'catalog' ? renderCatalog() : null}
        {view === 'review' ? renderReview() : null}
        {view === 'success' ? renderSuccess() : null}
        {view === 'details' ? renderDetails() : null}
      </PageContainer>
    </div>
  );
}

function getDefaultRequiredBy() {
  const date = new Date();
  date.setDate(date.getDate() + 14);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function createRequestId() {
  const year = new Date().getFullYear();
  const randomCode = Math.floor(4200 + Math.random() * 5800).toString().padStart(5, '0');
  return `PR-${year}-${randomCode}`;
}
