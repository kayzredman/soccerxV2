"use client";

import { motion } from "motion/react";

interface TeamStats {
  team: { displayName: string; abbreviation: string };
  statistics: Array<{ label: string; displayValue: string; name: string }>;
}
interface Props { home: TeamStats; away: TeamStats; }

var KEYS = ["Possession","SHOTS","Shots on Target","Corner Kicks","Fouls","Yellow Cards","Red Cards","Saves","Offsides"];

function find(stats: Array<{label:string;displayValue:string}>, label: string): string {
  for (var i = 0; i < stats.length; i++) { if (stats[i].label === label) return stats[i].displayValue; }
  return "0";
}

export function MatchStats({ home, away }: Props) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.05]">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Team Stats</h3>
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.04]">
        <span className="text-xs font-bold text-white/60">{home.team.abbreviation}</span>
        <span className="text-xs font-bold text-white/60">{away.team.abbreviation}</span>
      </div>
      <div className="divide-y divide-white/[0.03]">
        {KEYS.map(function(key, i) {
          var hv = find(home.statistics, key);
          var av = find(away.statistics, key);
          var hn = parseFloat(hv) || 0;
          var an = parseFloat(av) || 0;
          var total = hn + an || 1;
          var hp = (hn / total) * 100;

          return (
            <div key={key} className="px-4 py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-black text-white tabular-nums">{hv}</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-white/25">{key}</span>
                <span className="text-sm font-black text-white tabular-nums">{av}</span>
              </div>
              <div className="flex gap-0.5 h-1.5">
                <motion.div
                  className="rounded-l-full bg-gradient-to-r from-brand-500 to-brand-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: hp + "%" }}
                  transition={{ duration: 0.8, delay: i * 0.04 }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="rounded-r-full bg-white/10"
                  initial={{ width: 0 }}
                  whileInView={{ width: (100 - hp) + "%" }}
                  transition={{ duration: 0.8, delay: i * 0.04 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
