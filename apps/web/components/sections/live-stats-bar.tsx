"use client";

import { motion } from "motion/react";
import { Shell } from "@/components/ui/shell";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

interface Props {
  teamCount: number; matchCount: number;
  liveMatches: number; finishedMatches: number;
  tournamentName: string;
}

export function LiveStatsBar({ teamCount, matchCount, liveMatches, finishedMatches, tournamentName }: Props) {
  var stats = [
    { label: "Tournament", value: tournamentName, highlight: true },
    { label: "Teams", value: String(teamCount) },
    { label: "Matches", value: String(matchCount) },
    { label: "Live", value: String(liveMatches), isLive: liveMatches > 0 },
    { label: "Finished", value: String(finishedMatches) },
  ];

  return (
    <Shell className="pt-6 pb-2">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-3.5"
      >
        {stats.map(function(stat) {
          return (
            <div key={stat.label} className="flex items-center gap-2 text-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{stat.label}</span>
              {stat.isLive ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-live" />
                  <AnimatedShinyText className="text-emerald-300 font-bold">{stat.value}</AnimatedShinyText>
                </span>
              ) : stat.highlight ? (
                <AnimatedShinyText className="font-semibold">{stat.value}</AnimatedShinyText>
              ) : (
                <span className="font-semibold text-white">{stat.value}</span>
              )}
            </div>
          );
        })}
      </motion.div>
    </Shell>
  );
}
