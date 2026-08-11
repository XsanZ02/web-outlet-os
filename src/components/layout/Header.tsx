import React from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
    
        <div className="flex items-center gap-3">
  <div className="h-16 w-16 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
    <img
      src="/assets/logo2.png"
      alt="Outlet OS Logo"
      className="h-full w-full object-contain rounded-2xl"
    />
  </div>

  <div>
    <div className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">
      OUTLET OS
    </div>
    <h1 className="text-xl font-bold leading-tight text-stone-950">
      Purchase Request
    </h1>
  </div>
</div>
        {/* Right side: Actions and User */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            type="button"
            aria-label="Open cart"
            onClick={onCartClick}
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-stone-200 text-stone-700 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 5h2l2 10h12l3-7H6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="20" r="1.5" fill="currentColor" />
              <circle cx="17" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {cartItemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            ) : null}
          </button>

          {/* Notifications Button */}
          <button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-stone-200 text-stone-600 transition hover:bg-stone-50">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M18 15h5l-2-3V9a7 7 0 0 0-14 0v3l-2 3h5l2 4h6l2-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
          </button>

          {/* User Avatar */}
          <div className="hidden items-center gap-3 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-stone-900 text-xs font-bold text-white">AK</span>
            <div className="leading-tight">
              <div className="text-sm font-bold text-stone-900">Ahmad Kurnia</div>
              <div className="text-xs text-stone-500">Kebon Jeruk Outlet</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}