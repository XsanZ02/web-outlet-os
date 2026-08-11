export type ProductStatus = 'available' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  status: ProductStatus;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Priority = 'normal' | 'urgent' | 'critical';
export type PurchaseRequestPurpose =
  | 'regular-stock-replenishment'
  | 'new-outlet-setup'
  | 'event-promotion'
  | 'maintenance'
  | 'other';

export type PaymentMethod = 'company-account' | 'petty-cash' | 'corporate-card';

export interface SearchFilters {
  query: string;
  category: string;
}

export interface PurchaseRequestSubmissionState {
  isSubmitting: boolean;
  submittedAt: string | null;
  requestNumber: string | null;
}

export interface SubmittedPurchaseRequest {
  requestId: string;
  outlet: string;
  requiredBy: string;
  priority: Priority;
  purpose: PurchaseRequestPurpose;
  paymentMethod: PaymentMethod;
  notes: string;
  cartItems: CartItem[];
  totalItems: number;
  estimatedTotal: number;
  status: 'submitted';
  submittedAt: Date;
}
