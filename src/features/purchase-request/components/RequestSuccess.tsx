import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../lib/utils';
import type { PaymentMethod } from '../types/purchase-request';
import { getPaymentMethodLabel } from '../utils/getPaymentMethodLabel';
import { RequestStatusTimeline } from './RequestStatusTimeline';

export interface RequestSuccessProps {
  requestId: string;
  totalItems: number;
  subtotal: number;
  paymentMethod: PaymentMethod;
  onBackToCatalog: () => void;
  onViewDetails: () => void;
}

export function RequestSuccess({
  requestId,
  totalItems,
  subtotal,
  paymentMethod,
  onBackToCatalog,
  onViewDetails,
}: RequestSuccessProps) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-[#1f1e1c] p-6 text-white sm:p-8">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-300/30">
            <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
              <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">Request Submitted</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">Your purchase request has been sent for approval and is ready for procurement review.</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <SummaryBlock label="Purchase Request ID" value={requestId} />
          <SummaryBlock label="Status" value="Submitted" />
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryBlock label="Request Summary" value={`${totalItems} ${totalItems === 1 ? 'item' : 'items'}`} compact />
            <SummaryBlock label="Estimated Total" value={formatCurrency(subtotal)} compact />
            <SummaryBlock label="Payment Method" value={getPaymentMethodLabel(paymentMethod)} compact />
          </div>
        </div>

        <div className="mt-6">
          <RequestStatusTimeline />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" variant="primary" size="md" onClick={onViewDetails}>
            View Request Details
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={onBackToCatalog}>
            Back to Purchase Request
          </Button>
        </div>
      </div>
    </section>
  );
}

function SummaryBlock({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={compact ? '' : 'rounded-2xl border border-stone-200 bg-stone-50 p-5'}>
      <div className="text-[11px] font-bold uppercase tracking-[0.20em] text-stone-500">{label}</div>
      <div className={`${compact ? 'text-sm' : 'text-xl'} mt-2 font-bold text-stone-950`}>{value}</div>
    </div>
  );
}
