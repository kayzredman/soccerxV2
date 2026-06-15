import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShellProps { children: ReactNode; className?: string; }

export function Shell({ children, className }: ShellProps) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function GlassPanel({ children, className }: ShellProps) {
  return <div className={cn("glass glass-hover p-5", className)}>{children}</div>;
}
