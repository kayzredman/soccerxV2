"use client";

import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/shell";
import type { Team, Match } from "@/lib/types";
import { getFlag } from "@/lib/types";

interface Props { match: Match; home: Team | null; away: Team | null; delay?: number; }

export function MatchCard({ match, home, away, delay = 0 }: Props) {
  var time = match.kickoffAt ? new Date(match.kickoffAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "TBD";
  var isLive = match.status === "LIVE";
  var isFinished = match.status === "FINISHED";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: delay }}
    >
      <GlassPanel className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">{match.stage}</span>
          {isLive && (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
            </span>
          )}
          {isFinished && <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/35">FT</span>}
          {!isLive && !isFinished && <span className="text-xs text-white/25">{time}</span>}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{home ? getFlag(home.code) : "🏳️"}</span>
              <span className="text-sm font-medium text-white/80">{home ? home.name : "TBD"}</span>
            </div>
            {(isFinished || isLive) && <span className="text-xl font-bold text-white tabular-nums">{match.homeScore != null ? match.homeScore : "-"}</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{away ? getFlag(away.code) : "🏳️"}</span>
              <span className="text-sm font-medium text-white/80">{away ? away.name : "TBD"}</span>
            </div>
            {(isFinished || isLive) && <span className="text-xl font-bold text-white tabular-nums">{match.awayScore != null ? match.awayScore : "-"}</span>}
          </div>
        </div>
        {match.venue && <p className="mt-3 text-[10px] text-white/15 uppercase tracking-wider">{match.venue}</p>}
      </GlassPanel>
    </motion.div>
  );
}
