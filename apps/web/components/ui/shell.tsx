"use client";

import { cn } from "@/lib/utils";

interface ShellProps { children: React.ReactNode; className?: string; }

export function Shell({ children, className }: ShellProps) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

interface GlassPanelProps { children: React.ReactNode; className?: string; featured?: boolean; live?: boolean; }

export function GlassPanel({ children, className, featured, live }: GlassPanelProps) {
  return (
    <div className={cn(
      featured ? "glass-featured" : "glass",
      live && "live-glow",
      className
    )}>
      {children}
    </div>
  );
}
