"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { GlassPanel } from "@/components/ui/shell";
import type { Match } from "@/lib/types";

interface Props {
  matches: Match[];
}

var stageLabels: Record<string, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-Finals",
  SF: "Semi-Finals",
  THIRD_PLACE: "3rd Place",
  FINAL: "Final",
};

var stageOrder = ["R32", "R16", "QF", "SF", "THIRD_PLACE", "FINAL"];

export function KnockoutTree({ matches }: Props) {
  if (matches.length === 0) {
    return (
      <GlassPanel className="text-center py-12">
        <p className="text-3xl mb-3">{"🏟️"}</p>
        <p className="text-white/40 text-sm">Knockout matches will appear after the group stage.</p>
      </GlassPanel>
    );
  }

  var grouped: Record<string, Match[]> = {};
  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    if (!grouped[m.stage]) grouped[m.stage] = [];
    grouped[m.stage].push(m);
  }

  return (
    <div className="space-y-6">
      {stageOrder.map(function(stage, si) {
        if (!grouped[stage]) return null;
        return (
          <BlurFade key={stage} delay={si * 0.1}>
            <div>
              <h3 className="text-sm font-bold text-white/60 mb-3 uppercase tracking-wider">
                {stageLabels[stage] || stage}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {grouped[stage].map(function(match) {
                  return (
                    <GlassPanel key={match.id} className="p-4">
                      <p className="text-xs text-white/25 mb-2">
                        {match.kickoffAt ? new Date(match.kickoffAt).toLocaleDateString() : "TBD"}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="text-white/70">{match.homeTeamId ? "Home" : "TBD"}</p>
                        <p className="text-white/40 text-xs">vs</p>
                        <p className="text-white/70">{match.awayTeamId ? "Away" : "TBD"}</p>
                      </div>
                    </GlassPanel>
                  );
                })}
              </div>
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
}
