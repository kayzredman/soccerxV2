"use client";

import { motion } from "motion/react";

interface KeyEvent {
  id?: string; type: { text: string }; clock: { displayValue: string };
  team?: { displayName: string };
  participants?: Array<{ athlete: { displayName: string } }>;
  athletesInvolved?: Array<{ displayName: string }>; text?: string; shortText?: string;
}
interface CommentaryItem { time: string; text: string; }
interface Props { events: KeyEvent[]; commentary: CommentaryItem[]; }

function icon(t: string) {
  var l = t.toLowerCase();
  if (l.indexOf("goal") >= 0) return { i: "\u26BD", c: "text-emerald-400" };
  if (l.indexOf("yellow") >= 0) return { i: "\uD83D\uDFE8", c: "text-amber-400" };
  if (l.indexOf("red") >= 0) return { i: "\uD83D\uDFE5", c: "text-red-400" };
  if (l.indexOf("subst") >= 0) return { i: "\uD83D\uDD04", c: "text-blue-400" };
  return { i: "\u25CF", c: "text-white/20" };
}

function players(ev: KeyEvent): string {
  if (ev.participants && ev.participants.length > 0) return ev.participants.map(function(p) { return p.athlete.displayName; }).join(", ");
  if (ev.athletesInvolved && ev.athletesInvolved.length > 0) return ev.athletesInvolved.map(function(a) { return a.displayName; }).join(", ");
  return ev.shortText || ev.text || "";
}

export function MatchTimeline({ events, commentary }: Props) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Key Events */}
      <div className="px-4 py-3 border-b border-white/[0.05]">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Key Events</h3>
      </div>
      <div className="divide-y divide-white/[0.03]">
        {events.map(function(ev, i) {
          var info = icon(ev.type.text);
          var pl = players(ev);
          return (
            <motion.div key={ev.id || i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} viewport={{ once: true }} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-8 text-right text-[11px] font-mono font-bold text-white/25">{ev.clock ? ev.clock.displayValue : ""}</span>
              <span className={"text-sm " + info.c}>{info.i}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/75 truncate">{pl}</p>
                {ev.team && <p className="text-[9px] text-white/20 uppercase tracking-wider">{ev.team.displayName}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Commentary */}
      {commentary.length > 0 && (
        <>
          <div className="px-4 py-3 border-t border-white/[0.05] border-b border-white/[0.05]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Commentary</h3>
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-white/[0.02]">
            {commentary.slice(0, 15).map(function(c: any, i: number) {
              var minute = c.time || c.clock || "";
              var text = c.text || "";
              return (
                <div key={i} className="px-4 py-2.5 hover:bg-white/[0.01] transition-colors">
                  <div className="flex gap-3">
                    <span className="shrink-0 text-[10px] font-mono font-bold text-brand-400/40 w-10 text-right">{typeof minute === "object" ? minute.displayValue || "" : minute}</span>
                    <p className="text-[11px] text-white/40 leading-relaxed">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
