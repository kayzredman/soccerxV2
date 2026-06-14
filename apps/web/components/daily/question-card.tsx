'use client';

import { motion } from 'motion/react';
import { GlassPanel } from '@/components/ui/shell';

export function QuestionCard({ title, meta, options }: { title: string; meta: string; options: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <GlassPanel>
        <p className="text-xs uppercase tracking-[0.24em] text-brand-300">Today’s bonus</p>
        <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/48">{meta}</p>
        <div className="mt-5 grid gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-left text-sm text-white/82 transition hover:border-brand-400/40 hover:bg-brand-400/10"
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
