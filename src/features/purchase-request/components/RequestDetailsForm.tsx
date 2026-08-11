import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { PaymentMethod, Priority, PurchaseRequestPurpose } from '../types/purchase-request';

export interface PurchaseRequestDetails {
  outlet: string;
  requiredBy: string;
  priority: Priority;
  purpose: PurchaseRequestPurpose;
  paymentMethod: PaymentMethod;
  notes: string;
}

export interface RequestDetailsFormProps {
  values: PurchaseRequestDetails;
  errors: Partial<Record<keyof PurchaseRequestDetails | 'cart', string>>;
  onChange: (field: keyof PurchaseRequestDetails, value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function RequestDetailsForm({ values, errors, onChange, onSubmit, isSubmitting = false }: RequestDetailsFormProps) {
  const paymentOptions: Array<{ id: PaymentMethod; label: string; description: string }> = [
    { id: 'company-account', label: 'Company Account', description: 'Charged to the company account' },
    { id: 'petty-cash', label: 'Petty Cash', description: 'For eligible small operational purchases' },
    { id: 'corporate-card', label: 'Corporate Card', description: 'Charged to the assigned company card' },
  ];

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-stone-950">Request Details</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Purchase Request</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="outlet" className="mb-2 block text-xs font-bold uppercase tracking-[0.20em] text-stone-600">Outlet</label>
          <Input
            id="outlet"
            value={values.outlet}
            onChange={(event) => onChange('outlet', event.target.value)}
            error={errors.outlet}
            placeholder="Outlet name"
          />
        </div>

        <div>
          <label htmlFor="requiredBy" className="mb-2 block text-xs font-bold uppercase tracking-[0.20em] text-stone-600">Required By</label>
          <Input
            id="requiredBy"
            type="date"
            value={values.requiredBy}
            onChange={(event) => onChange('requiredBy', event.target.value)}
            error={errors.requiredBy}
          />
        </div>

        <div>
          <label htmlFor="priority" className="mb-2 block text-xs font-bold uppercase tracking-[0.20em] text-stone-600">Priority</label>
          <select
            id="priority"
            value={values.priority}
            onChange={(event) => onChange('priority', event.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-950 shadow-sm outline-none transition duration-200 focus:border-[#b54a3f] focus:ring-2 focus:ring-[#f0d2cd]"
            aria-invalid={errors.priority ? 'true' : 'false'}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
          {errors.priority ? <span className="mt-1 block text-xs font-medium text-rose-600">{errors.priority}</span> : null}
        </div>

        <div>
          <label htmlFor="purpose" className="mb-2 block text-xs font-bold uppercase tracking-[0.20em] text-stone-600">Purpose</label>
          <select
            id="purpose"
            value={values.purpose}
            onChange={(event) => onChange('purpose', event.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-950 shadow-sm outline-none transition duration-200 focus:border-[#b54a3f] focus:ring-2 focus:ring-[#f0d2cd]"
            aria-invalid={errors.purpose ? 'true' : 'false'}
          >
            <option value="regular-stock-replenishment">Regular stock replenishment</option>
            <option value="new-outlet-setup">New outlet setup</option>
            <option value="event-promotion">Event / promotion</option>
            <option value="maintenance">Maintenance</option>
            <option value="other">Other</option>
          </select>
          {errors.purpose ? <span className="mt-1 block text-xs font-medium text-rose-600">{errors.purpose}</span> : null}
        </div>

        <fieldset>
          <legend className="mb-2 block text-xs font-bold uppercase tracking-[0.20em] text-stone-600">Payment Method</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {paymentOptions.map((option) => (
              <label key={option.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  value={option.id}
                  checked={values.paymentMethod === option.id}
                  onChange={(event) => onChange('paymentMethod', event.target.value)}
                  className="sr-only"
                  aria-label={option.label}
                />
                <span className={`${[
                  'flex min-h-[98px] flex-col rounded-2xl border p-4 transition duration-200',
                  values.paymentMethod === option.id
                    ? 'border-[#b54a3f] bg-[#f7e4df] shadow-sm ring-2 ring-[#f0d2cd]'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                ].join(' ')}`}> 
                  <span className="text-sm font-bold text-stone-950">{option.label}</span>
                  <span className="mt-2 text-xs leading-5 text-stone-500">{option.description}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.paymentMethod ? <span className="mt-2 block text-xs font-medium text-rose-600">{errors.paymentMethod}</span> : null}
        </fieldset>

        <div>
          <label htmlFor="notes" className="mb-2 block text-xs font-bold uppercase tracking-[0.20em] text-stone-600">Notes</label>
          <textarea
            id="notes"
            value={values.notes}
            onChange={(event) => onChange('notes', event.target.value)}
            rows={4}
            placeholder="Add any information the purchasing team should know..."
            className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-950 shadow-sm outline-none transition duration-200 placeholder:text-stone-400 focus:border-[#b54a3f] focus:ring-2 focus:ring-[#f0d2cd]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="button" variant="primary" size="md" loading={isSubmitting} onClick={onSubmit}>
            Submit Request
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={() => onChange('requiredBy', '')}>
            Reset date
          </Button>
        </div>
      </div>
    </section>
  );
}
