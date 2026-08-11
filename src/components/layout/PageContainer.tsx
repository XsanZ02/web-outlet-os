import type { PropsWithChildren } from 'react';

export interface PageContainerProps {
  className?: string;
}

export function PageContainer({ className = '', children }: PropsWithChildren<PageContainerProps>) {
  return (
    <div className={`${['mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8', className].join(' ')}`}>{children}</div>
  );
}
