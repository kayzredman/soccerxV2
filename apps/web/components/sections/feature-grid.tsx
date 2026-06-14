'use client';

import { motion } from 'motion/react';
import { features } from '@/lib/mock-data';
import { GlassPanel, Shell } from '@/components/ui/shell';

export function FeatureGrid() {
  return (
    <Shell className="py-6 sm:py-10 lg:py-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Product spine</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          The frontend is designed around retention, explainability, and social pull.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassPanel className="h-full min-h-[220px]">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-brand-300">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{feature.body}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}
