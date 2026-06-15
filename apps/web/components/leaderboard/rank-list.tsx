"use client";

import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/shell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

var mockData = [
  { rank: 1, name: "Champion_2026", points: 485 },
  { rank: 2, name: "FootballGuru", points: 460 },
  { rank: 3, name: "KwekuPredicts", points: 445 },
  { rank: 4, name: "AccraFan", points: 420 },
  { rank: 5, name: "GoalMachine", points: 410 },
  { rank: 6, name: "PredictionKing", points: 395 },
  { rank: 7, name: "SoccerNerd", points: 380 },
  { rank: 8, name: "WC26Master", points: 370 },
  { rank: 9, name: "GhanaRising", points: 355 },
  { rank: 10, name: "BracketBoss", points: 340 },
];

function getRankBadge(rank: number) {
  if (rank === 1) return { emoji: "\u{1F947}", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" };
  if (rank === 2) return { emoji: "\u{1F948}", color: "text-gray-300 bg-gray-400/10 border-gray-400/20" };
  if (rank === 3) return { emoji: "\u{1F949}", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" };
  return { emoji: "", color: "text-white/40 bg-white/[0.03] border-white/[0.06]" };
}

export function RankList() {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-white">Top Players</h3>
        <span className="text-[10px] uppercase tracking-wider text-white/25">Global</span>
      </div>
      <div className="space-y-2">
        {mockData.map(function(entry, i) {
          var badge = getRankBadge(entry.rank);
          return (
            <BlurFade key={entry.rank} delay={i * 0.04}>
              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn("flex items-center justify-between rounded-xl border px-4 py-3 transition-all", badge.color)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 text-center">
                    {badge.emoji ? <span className="text-lg">{badge.emoji}</span> : <span className="text-sm font-bold text-white/30">#{entry.rank}</span>}
                  </div>
                  <span className="text-sm font-medium text-white/80">{entry.name}</span>
                </div>
                <span className="text-sm font-bold text-white tabular-nums">{entry.points} pts</span>
              </motion.div>
            </BlurFade>
          );
        })}
      </div>
    </GlassPanel>
  );
}
