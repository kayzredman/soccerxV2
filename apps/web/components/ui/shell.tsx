import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
