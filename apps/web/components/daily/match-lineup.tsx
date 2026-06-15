"use client";

import { motion } from "motion/react";

interface Entry {
  athlete: { displayName: string };
  starter: boolean; jersey: string;
  position: { abbreviation: string };
  subbedIn?: boolean; subbedOut?: boolean;
}
interface Roster { team: { displayName: string; abbreviation: string }; roster: Entry[]; formation?: { name: string }; }
interface Props { home: Roster; away: Roster; }

export function MatchLineup({ home, away }: Props) {
  var hStarters = home.roster.filter(function(e) { return e.starter; });
  var aStarters = away.roster.filter(function(e) { return e.starter; });
  var hBench = home.roster.filter(function(e) { return !e.starter; });
  var aBench = away.roster.filter(function(e) { return !e.starter; });

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.05]">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Formations & Lineups</h3>
      </div>

      {/* Starting XI - Home */}
      <div className="px-3 py-2 border-b border-white/[0.04]">
        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-400/60 mb-2">{home.team.displayName}</p>
        <div className="space-y-0.5">
          {hStarters.map(function(e, i) {
            return (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.02 }} viewport={{ once: true }} className="flex items-center gap-2 py-1 px-1 rounded hover:bg-white/[0.02] transition-colors">
                <span className="w-5 text-center text-[10px] font-bold text-brand-300/50">{"#" + e.jersey}</span>
                <span className="text-xs text-white/70 flex-1">{e.athlete.displayName}</span>
                <span className="text-[9px] text-white/15 uppercase">{e.position.abbreviation}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Starting XI - Away */}
      <div className="px-3 py-2 border-b border-white/[0.04]">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2">{away.team.displayName}</p>
        <div className="space-y-0.5">
          {aStarters.map(function(e, i) {
            return (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.02 }} viewport={{ once: true }} className="flex items-center gap-2 py-1 px-1 rounded hover:bg-white/[0.02] transition-colors">
                <span className="w-5 text-center text-[10px] font-bold text-white/25">{"#" + e.jersey}</span>
                <span className="text-xs text-white/70 flex-1">{e.athlete.displayName}</span>
                <span className="text-[9px] text-white/15 uppercase">{e.position.abbreviation}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bench */}
      <div className="px-3 py-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/15 mb-2">Bench</p>
        <div className="grid grid-cols-1 gap-0">
          {hBench.concat(aBench).slice(0, 12).map(function(e, i) {
            return (
              <div key={i} className="flex items-center gap-2 py-0.5 px-1 opacity-40">
                <span className="w-5 text-center text-[9px] text-white/20">{"#" + e.jersey}</span>
                <span className="text-[11px] text-white/30 flex-1 truncate">{e.athlete.displayName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
