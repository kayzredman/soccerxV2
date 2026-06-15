"use client";

import { GlassPanel } from "@/components/ui/shell";
import { BlurFade } from "@/components/ui/blur-fade";

export function PickHistory() {
  return (
    <BlurFade delay={0.2}>
      <GlassPanel>
        <h3 className="text-base font-bold text-white mb-5">Pick History</h3>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">\u26BD</div>
          <p className="text-white/40 text-sm max-w-xs">
            Your picks will appear here once you start making predictions.
            Head to the Bracket page to begin!
          </p>
          <a href="/bracket" className="mt-6 inline-block rounded-xl border border-brand-400/20 bg-brand-400/10 px-6 py-2.5 text-sm font-semibold text-brand-300 transition hover:bg-brand-400/20">
            Start Picking
          </a>
        </div>
      </GlassPanel>
    </BlurFade>
  );
}
