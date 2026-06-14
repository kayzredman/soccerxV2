'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { navItems } from '@/lib/mock-data';
import { Logo } from '@/components/ui/logo';
import { Shell } from '@/components/ui/shell';

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/6 bg-[#07111F]/70 backdrop-blur-2xl"
    >
      <Shell className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/65 transition hover:bg-white/6 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/league/GOAL2026"
          className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-400/60 hover:bg-brand-400/10"
        >
          Enter league
        </Link>
      </Shell>
    </motion.header>
  );
}
