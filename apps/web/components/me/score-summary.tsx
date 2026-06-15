"use client";

import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/shell";
import { SparklesCore } from "@/components/ui/sparkles";

export function ScoreSummary() {
  return (
    <GlassPanel className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore id="score-sparkles" background="transparent" minSize={0.3} maxSize={0.6} particleDensity={15} particleColor="#60a5fa" />
      </div>
      <div className="relative text-center py-6">
        <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-3">Your Total Score</p>
        <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-6xl font-black gradient-text tabular-nums">0</motion.p>
        <p className="text-xs text-white/25 mt-3">Points earned</p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Bracket picks</span>
          <span className="text-white/60 font-semibold">0 / 48</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Daily picks</span>
          <span className="text-white/60 font-semibold">0</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Leagues joined</span>
          <span className="text-white/60 font-semibold">0</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Global rank</span>
          <span className="text-white/60 font-semibold">--</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:shadow-brand-500/40">
          Sign In to Track Picks
        </button>
      </div>
    </GlassPanel>
  );
}
