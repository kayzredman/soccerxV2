"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/shell";
import type { Team, Match } from "@/lib/types";
import { getFlag } from "@/lib/types";

interface Props { match: Match; home: Team | null; away: Team | null; }

export function DailyMatchPreview({ match, home, away }: Props) {
  var time = match.kickoffAt
    ? new Date(match.kickoffAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "TBD";
  var isLive = match.status === "LIVE";
  var isFinished = match.status === "FINISHED";
  var meta = match.meta as any;
  var detail = meta && meta.detail ? meta.detail : "";
  var espnId = meta && meta.espnEventId ? meta.espnEventId : "";

  var card = (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={espnId ? { y: -4, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <GlassPanel live={isLive} featured={isLive} className={"p-5 group " + (espnId && (isFinished || isLive) ? "cursor-pointer" : "")}>
        {/* Status bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">{match.stage}</span>
          {isLive && (
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {detail || "Live"}
            </motion.span>
          )}
          {isFinished && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/30">FT</span>
          )}
          {!isLive && !isFinished && <span className="text-xs text-white/20 font-medium">{time}</span>}
        </div>

        {/* Teams + Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{home ? getFlag(home.code) : "\u{1F3F3}\u{FE0F}"}</span>
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{home ? home.name : "TBD"}</span>
            </div>
            {(isFinished || isLive) && (
              <span className={"text-2xl font-black tabular-nums score-display " + (isLive ? "text-emerald-300" : "text-white")}>{match.homeScore != null ? match.homeScore : "-"}</span>
            )}
          </div>
          <div className="h-px bg-white/[0.04]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{away ? getFlag(away.code) : "\u{1F3F3}\u{FE0F}"}</span>
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{away ? away.name : "TBD"}</span>
            </div>
            {(isFinished || isLive) && (
              <span className={"text-2xl font-black tabular-nums score-display " + (isLive ? "text-emerald-300" : "text-white")}>{match.awayScore != null ? match.awayScore : "-"}</span>
            )}
          </div>
        </div>

        {/* View Details CTA */}
        {espnId && (isFinished || isLive) && (
          <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[10px] text-white/15 uppercase tracking-wider">Stats & Lineups</span>
            <span className="text-[10px] text-brand-400/40 group-hover:text-brand-400 transition-colors uppercase tracking-wider flex items-center gap-1">
              View Details
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        )}
      </GlassPanel>
    </motion.div>
  );

  if (espnId && (isFinished || isLive)) {
    return <Link href={"/daily/" + espnId}>{card}</Link>;
  }
  return card;
}
