export interface RequestStatusTimelineProps {
  activeStep?: 'submitted' | 'pending-approval' | 'approved' | 'processing' | 'completed';
}

export function RequestStatusTimeline({ activeStep = 'submitted' }: RequestStatusTimelineProps) {
  const steps = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'pending-approval', label: 'Pending Approval' },
    { key: 'approved', label: 'Approved' },
    { key: 'processing', label: 'Processing' },
    { key: 'completed', label: 'Completed' },
  ] as const;

  const activeIndex = steps.findIndex((step) => step.key === activeStep);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-stone-950">Approval Status</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.20em] text-stone-500">Progress</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-5">
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;

          return (
            <div key={step.key} className="relative flex items-center gap-3 sm:block">
              {index > 0 ? (
                <span className="absolute left-[-50%] top-3 hidden h-px w-full bg-stone-200 sm:block" aria-hidden="true" />
              ) : null}
              <span
                className={[
                  'relative z-10 grid h-7 w-7 place-items-center rounded-full border text-xs font-bold',
                  isActive ? 'border-[#b54a3f] bg-[#b54a3f] text-white' : 'border-stone-300 bg-white text-stone-400',
                ].join(' ')}
              >
                {index + 1}
              </span>
              <span className={`text-xs font-bold sm:mt-2 sm:block ${isActive ? 'text-[#923b33]' : 'text-stone-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
