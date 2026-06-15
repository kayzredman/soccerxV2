"use client";

import { GlassPanel } from "@/components/ui/shell";

interface MatchEvent {
  type: string;
  minute: string;
  player: string;
  team: string;
}

interface Props { events: MatchEvent[]; }

export function MatchEvents({ events }: Props) {
  if (!events || events.length === 0) {
    return (
      <GlassPanel className="text-center py-6">
        <p className="text-white/30 text-xs">No events yet</p>
      </GlassPanel>
    );
  }

  function getIcon(type: string) {
    if (type === "Goal" || type === "goal") return "\u26BD";
    if (type === "Yellow Card" || type === "yellowCard") return "\uD83D\uDFE8";
    if (type === "Red Card" || type === "redCard") return "\uD83D\uDFE5";
    if (type === "Substitution" || type === "substitution") return "\uD83D\uDD04";
    return "\u25CF";
  }

  return (
    <GlassPanel>
      <div className="space-y-2">
        {events.map(function(ev, i) {
          return (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-10 text-right text-xs text-white/30 font-mono">{ev.minute}</span>
              <span>{getIcon(ev.type)}</span>
              <span className="text-white/70">{ev.player}</span>
              <span className="text-white/25 text-xs">({ev.team})</span>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
