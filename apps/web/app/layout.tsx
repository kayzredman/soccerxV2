import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { SiteHeader } from '@/components/navigation/site-header';

export const metadata: Metadata = {
  title: 'SoccerX',
  description: 'A motion-first social football prediction game for World Cup 2026 and beyond.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SiteHeader />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
