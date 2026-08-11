import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Purchase Request',
  description: 'Operational purchasing workspace for outlets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
