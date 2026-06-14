'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { GlassPanel, Shell } from '@/components/ui/shell';

export function CtaBand() {
  return (
    <Shell className="py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassPanel className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(183,255,102,0.18),transparent_50%)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">Launch-ready flow</p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                Ready for live data, scoring, social sharing, and the AFCON 2027 expansion path.
              </h3>
              <p className="text-sm leading-7 text-white/62 sm:text-base">
                This starter is intentionally premium in feel but strict on performance: server-first pages, small client islands, and motion only where it clarifies the product.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/leaderboard" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                Explore leaderboard
              </Link>
              <Link href="/me" className="rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white/85">
                See player dashboard
              </Link>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </Shell>
  );
}
