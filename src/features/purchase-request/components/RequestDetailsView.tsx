import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../lib/utils';
import type { SubmittedPurchaseRequest } from '../types/purchase-request';
import { getPaymentMethodLabel } from '../utils/getPaymentMethodLabel';
import { RequestStatusTimeline } from './RequestStatusTimeline';

const formatDateSimple = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface RequestDetailsViewProps {
  request: SubmittedPurchaseRequest;
  onBack: () => void;
}

function DetailItem({ label, value, valueClassName = '' }: { label: string; value: string | number; valueClassName?: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.20em] text-stone-500">{label}</div>
      <div className={`mt-2 text-sm font-bold text-stone-950 ${valueClassName}`}>{value}</div>
    </div>
  );
}

export function RequestDetailsView({ request, onBack }: RequestDetailsViewProps) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#923b33]">Request Details</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-950">{request.requestId}</h2>
          <p className="mt-2 text-sm font-medium text-stone-500">Submitted {formatDateSimple(request.submittedAt)}</p>
        </div>
        <Button type="button" variant="secondary" size="md" onClick={onBack}>
          Back to Submitted
        </Button>
      </div>

      <div className="mb-6">
        <RequestStatusTimeline activeStep={request.status} />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailItem label="Status" value={request.status} valueClassName="capitalize" />
        <DetailItem label="Outlet" value={request.outlet} />
        <DetailItem label="Required By" value={formatDateSimple(request.requiredBy)} />
        <DetailItem label="Priority" value={request.priority} valueClassName="capitalize" />
        <DetailItem label="Purpose" value={request.purpose.replace(/-/g, ' ')} valueClassName="capitalize" />
        <DetailItem label="Payment Method" value={getPaymentMethodLabel(request.paymentMethod)} />
        <DetailItem label="Request Summary" value={`${request.totalItems} ${request.totalItems === 1 ? 'item' : 'items'}`} />
        <DetailItem label="Estimated Total" value={formatCurrency(request.estimatedTotal)} valueClassName="text-lg" />
      </div>

      {request.notes.trim() ? (
        <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.20em] text-stone-500">Notes</div>
          <p className="mt-2 text-sm leading-6 text-stone-700">{request.notes}</p>
        </div>
      ) : null}

      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-stone-950">Requested Items</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.20em] text-stone-500">{request.totalItems} total units</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-sm">
            <thead className="bg-[#1f1e1c] text-white">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                  Category
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                  Unit Price
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                  Line Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {request.cartItems.map((item) => (
                <tr key={item.product.id}>
                  <td className="px-4 py-3 font-bold text-stone-950">{item.product.name}</td>
                  <td className="px-4 py-3 text-stone-600">{item.product.category}</td>
                  <td className="px-4 py-3 text-right text-stone-600">{formatCurrency(item.product.price)}</td>
                  <td className="px-4 py-3 text-center font-bold text-stone-950">{item.quantity}</td>
                  <td className="px-4 py-3 text-right font-bold text-stone-950">{formatCurrency(item.product.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
