"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MatchCard } from "@/components/matches/match-card";
import type { Team, Match } from "@/lib/types";

interface Props { matches: Match[]; teamMap: Record<string, Team>; }

export function MatchList({ matches, teamMap }: Props) {
  var grouped: Record<string, Match[]> = {};
  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    var date = m.kickoffAt ? m.kickoffAt.slice(0, 10) : "TBD";
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(m);
  }
  var days = Object.keys(grouped).sort();

  return (
    <div className="space-y-8">
      {days.map(function(date, dayIndex) {
        var dayMatches = grouped[date];
        return (
          <BlurFade key={date} delay={dayIndex * 0.04}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <h2 className="text-xs uppercase tracking-[0.25em] text-white/30 font-medium">{date}</h2>
              <span className="text-[10px] text-white/20">{dayMatches.length} matches</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {dayMatches.map(function(match, mi) {
                var home = match.homeTeamId ? teamMap[match.homeTeamId] || null : null;
                var away = match.awayTeamId ? teamMap[match.awayTeamId] || null : null;
                return <MatchCard key={match.id} match={match} home={home} away={away} delay={mi * 0.02} />;
              })}
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
}
