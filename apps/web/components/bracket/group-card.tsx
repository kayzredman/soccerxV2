'use client';

import { motion } from 'motion/react';
import { GlassPanel } from '@/components/ui/shell';

export function GroupCard({ group, teams }: { group: string; teams: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <GlassPanel>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{group}</h3>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs uppercase tracking-[0.2em] text-white/45">Pick 1st & 2nd</span>
        </div>
        <div className="mt-4 space-y-3">
          {teams.map((team, index) => (
            <button
              key={team}
              className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-left text-sm text-white/85 transition hover:border-brand-400/40 hover:bg-brand-400/10"
            >
              <span>{team}</span>
              <span className="text-xs text-white/40">Slot {index + 1}</span>
            </button>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
