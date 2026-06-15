"use client";

import { motion } from "motion/react";

var FLAGS: Record<string, string> = {
  CIV:"\u{1F1E8}\u{1F1EE}",ECU:"\u{1F1EA}\u{1F1E8}",GER:"\u{1F1E9}\u{1F1EA}",CUW:"\u{1F1E8}\u{1F1FC}",NED:"\u{1F1F3}\u{1F1F1}",JPN:"\u{1F1EF}\u{1F1F5}",SWE:"\u{1F1F8}\u{1F1EA}",TUN:"\u{1F1F9}\u{1F1F3}",AUS:"\u{1F1E6}\u{1F1FA}",TUR:"\u{1F1F9}\u{1F1F7}",USA:"\u{1F1FA}\u{1F1F8}",PAR:"\u{1F1F5}\u{1F1FE}",BRA:"\u{1F1E7}\u{1F1F7}",MAR:"\u{1F1F2}\u{1F1E6}",MEX:"\u{1F1F2}\u{1F1FD}",RSA:"\u{1F1FF}\u{1F1E6}",KOR:"\u{1F1F0}\u{1F1F7}",CZE:"\u{1F1E8}\u{1F1FF}",CAN:"\u{1F1E8}\u{1F1E6}",BIH:"\u{1F1E7}\u{1F1E6}",QAT:"\u{1F1F6}\u{1F1E6}",SUI:"\u{1F1E8}\u{1F1ED}",HAI:"\u{1F1ED}\u{1F1F9}",SCO:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",ESP:"\u{1F1EA}\u{1F1F8}",CPV:"\u{1F1E8}\u{1F1FB}",BEL:"\u{1F1E7}\u{1F1EA}",EGY:"\u{1F1EA}\u{1F1EC}",KSA:"\u{1F1F8}\u{1F1E6}",URU:"\u{1F1FA}\u{1F1FE}",IRN:"\u{1F1EE}\u{1F1F7}",NZL:"\u{1F1F3}\u{1F1FF}",FRA:"\u{1F1EB}\u{1F1F7}",SEN:"\u{1F1F8}\u{1F1F3}",IRQ:"\u{1F1EE}\u{1F1F6}",NOR:"\u{1F1F3}\u{1F1F4}",ARG:"\u{1F1E6}\u{1F1F7}",ALG:"\u{1F1E9}\u{1F1FF}",AUT:"\u{1F1E6}\u{1F1F9}",JOR:"\u{1F1EF}\u{1F1F4}",ENG:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",CRO:"\u{1F1ED}\u{1F1F7}",GHA:"\u{1F1EC}\u{1F1ED}",PAN:"\u{1F1F5}\u{1F1E6}",COL:"\u{1F1E8}\u{1F1F4}",UZB:"\u{1F1FA}\u{1F1FF}",POR:"\u{1F1F5}\u{1F1F9}",COD:"\u{1F1E8}\u{1F1E9}",
};
function gf(a: string) { return FLAGS[a.toUpperCase()] || "\u{1F3F3}\u{FE0F}"; }

interface Props {
  home: { team: { displayName: string; abbreviation: string }; score: string };
  away: { team: { displayName: string; abbreviation: string }; score: string };
  status: { type: { detail: string; name: string } };
  keyEvents: Array<{ type: { text: string }; clock: { displayValue: string }; team?: { abbreviation: string }; athletesInvolved?: Array<{ displayName: string }>; participants?: Array<{ athlete: { displayName: string } }> }>;
}

export function MatchDetailHeader({ home, away, status, keyEvents }: Props) {
  var isLive = status.type.name.indexOf("HALF") >= 0 || status.type.name.indexOf("PLAY") >= 0;
  var isFT = status.type.name.indexOf("FULL_TIME") >= 0;

  var goals = keyEvents.filter(function(e) { return e.type.text.toLowerCase().indexOf("goal") >= 0; });
  var goalStr = goals.map(function(g) {
    var name = "";
    if (g.participants && g.participants.length > 0) name = g.participants[0].athlete.displayName;
    else if (g.athletesInvolved && g.athletesInvolved.length > 0) name = g.athletesInvolved[0].displayName;
    var min = g.clock ? g.clock.displayValue : "";
    return name.split(" ").pop() + " " + min + "'";
  }).join("  \u2022  ");

  return (
    <div className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: "hsl(228 14% 8% / 0.95)", backdropFilter: "blur(20px)" }}>
      <div className="text-center text-[10px] uppercase tracking-[0.3em] text-white/20 py-1.5 bg-brand-500/5 border-b border-white/[0.03]">2026 FIFA World Cup, Group Stage</div>
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Home */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
            <div className="text-right">
              <p className="text-sm sm:text-base font-bold text-white">{home.team.displayName}</p>
            </div>
            <span className="text-2xl sm:text-3xl">{gf(home.team.abbreviation)}</span>
          </motion.div>

          {/* Score */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-5xl font-black text-white tabular-nums" style={{ letterSpacing: "-0.04em" }}>{home.score}</span>
            <div className="flex flex-col items-center">
              {isLive && (
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider animate-pulse">{status.type.detail}</span>
              )}
              {isFT && <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">FT</span>}
              {!isLive && !isFT && <span className="text-[10px] text-white/20">{status.type.detail}</span>}
            </div>
            <span className="text-3xl sm:text-5xl font-black text-white tabular-nums" style={{ letterSpacing: "-0.04em" }}>{away.score}</span>
          </motion.div>

          {/* Away */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 sm:gap-3 flex-1 justify-start">
            <span className="text-2xl sm:text-3xl">{gf(away.team.abbreviation)}</span>
            <div className="text-left">
              <p className="text-sm sm:text-base font-bold text-white">{away.team.displayName}</p>
            </div>
          </motion.div>
        </div>

        {goalStr && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-[10px] text-white/30 mt-2 truncate">
            {"⚽"} {goalStr}
          </motion.p>
        )}
      </div>
    </div>
  );
}
