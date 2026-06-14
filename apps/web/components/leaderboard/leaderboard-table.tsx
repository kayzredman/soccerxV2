'use client';

import { motion } from 'motion/react';
import { leaderboard } from '@/lib/mock-data';
import { GlassPanel } from '@/components/ui/shell';

export function LeaderboardTable() {
  return (
    <GlassPanel className="overflow-hidden p-0">
      <div className="grid grid-cols-[72px_1.4fr_112px_100px_84px] border-b border-white/8 px-5 py-4 text-xs uppercase tracking-[0.2em] text-white/38">
        <span>Rank</span>
        <span>Player</span>
        <span className="text-right">Points</span>
        <span className="text-right">Streak</span>
        <span className="text-right">Country</span>
      </div>
      <div>
        {leaderboard.map((row, index) => (
          <motion.div
            key={row.rank}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.28 }}
            className="grid grid-cols-[72px_1.4fr_112px_100px_84px] items-center border-b border-white/6 px-5 py-4 text-sm text-white/78 last:border-b-0"
          >
            <span className="font-semibold text-white">#{row.rank}</span>
            <span>{row.name}</span>
            <span className="text-right font-semibold text-white">{row.points}</span>
            <span className="text-right text-brand-300">{row.streak}</span>
            <span className="text-right text-white/48">{row.country}</span>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
