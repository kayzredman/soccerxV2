"use client";

import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/shell";
import { BlurFade } from "@/components/ui/blur-fade";
import type { Team } from "@/lib/types";
import { getFlag } from "@/lib/types";

interface GroupData {
  letter: string;
  teams: Team[];
}

interface Props {
  groups: GroupData[];
}

export function BracketView({ groups }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {groups.map(function(group, index) {
        return (
          <BlurFade key={group.letter} delay={index * 0.05}>
            <GlassPanel>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-sm font-black text-brand-300">
                    {group.letter}
                  </div>
                  <h3 className="text-base font-bold text-white">Group {group.letter}</h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">{group.teams.length} teams</span>
              </div>
              <div className="space-y-1.5">
                {group.teams.map(function(team, ti) {
                  var flag = getFlag(team.code);
                  return (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 + ti * 0.04 }}
                      className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-sm transition-all duration-200 hover:border-brand-400/25 hover:bg-brand-400/[0.05] cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{flag}</span>
                        <span className="w-9 text-center text-[10px] font-bold text-brand-400/60 bg-brand-400/10 rounded-md px-1.5 py-0.5">{team.code}</span>
                        <span className="text-white/80 group-hover:text-white transition-colors">{team.name}</span>
                      </div>
                      <svg className="w-4 h-4 text-white/10 group-hover:text-brand-400/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  );
                })}
              </div>
            </GlassPanel>
          </BlurFade>
        );
      })}
    </div>
  );
}
