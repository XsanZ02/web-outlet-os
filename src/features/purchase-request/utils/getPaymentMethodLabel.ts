import type { PaymentMethod } from '../types/purchase-request';

const paymentMethodLabels = {
  'company-account': 'Company Account',
  'petty-cash': 'Petty Cash',
  'corporate-card': 'Corporate Card',
} satisfies Record<PaymentMethod, string>;

export function getPaymentMethodLabel(paymentMethod: PaymentMethod) {
  return paymentMethodLabels[paymentMethod];
}
