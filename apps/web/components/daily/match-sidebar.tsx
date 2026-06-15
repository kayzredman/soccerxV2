"use client";

import { motion } from "motion/react";

interface Props {
  venue: any;
  attendance: number | null;
  officials: any[];
  standings: any;
  news: any[];
  status: any;
}

export function MatchSidebar({ venue, attendance, officials, standings, news, status }: Props) {
  return (
    <div className="space-y-4">
      {/* Game Information */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.05]">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Game Information</h3>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {venue && (
            <div className="px-4 py-2.5 flex items-start gap-3">
              <span className="text-white/15 mt-0.5">{"📍"}</span>
              <div>
                <p className="text-xs text-white/60 font-medium">{venue.fullName}</p>
                {venue.address && <p className="text-[10px] text-white/25">{venue.address.city}{venue.address.country ? ", " + venue.address.country : ""}</p>}
              </div>
            </div>
          )}
          {attendance && (
            <div className="px-4 py-2.5 flex items-center gap-3">
              <span className="text-white/15">{"🏟️"}</span>
              <p className="text-xs text-white/60">Attendance: <span className="font-bold text-white/80">{attendance.toLocaleString()}</span></p>
            </div>
          )}
          {officials && officials.length > 0 && (
            <div className="px-4 py-2.5 flex items-start gap-3">
              <span className="text-white/15 mt-0.5">{"🧑‍⚖️"}</span>
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5">Match Officials</p>
                {officials.map(function(o: any, i: number) {
                  return <p key={i} className="text-xs text-white/50">{o.displayName || "TBD"}</p>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Group Standings */}
      {standings && (
        <div className="glass rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Group Standings</h3>
          </div>
          <div className="px-3 py-2">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-white/20 uppercase tracking-wider">
                  <th className="text-left py-1 pl-1 font-bold">Team</th>
                  <th className="text-center font-bold w-5">GP</th>
                  <th className="text-center font-bold w-5">W</th>
                  <th className="text-center font-bold w-5">D</th>
                  <th className="text-center font-bold w-5">L</th>
                  <th className="text-center font-bold w-7">GD</th>
                  <th className="text-center font-bold w-5">P</th>
                </tr>
              </thead>
              <tbody className="text-white/50">
                {(standings.entries || []).slice(0, 4).map(function(entry: any, i: number) {
                  var team = entry.team || {};
                  var stats = entry.stats || [];
                  function getStat(n: string) {
                    for (var s = 0; s < stats.length; s++) { if (stats[s].name === n || stats[s].abbreviation === n) return stats[s].value || stats[s].displayValue || "0"; }
                    return "0";
                  }
                  return (
                    <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="py-1.5 pl-1 font-medium text-white/60 truncate max-w-[100px]">{team.abbreviation || team.displayName || "?"}</td>
                      <td className="text-center">{getStat("gamesPlayed")}</td>
                      <td className="text-center">{getStat("wins")}</td>
                      <td className="text-center">{getStat("ties")}</td>
                      <td className="text-center">{getStat("losses")}</td>
                      <td className="text-center">{getStat("pointDifferential")}</td>
                      <td className="text-center font-bold text-white/80">{getStat("points")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Related News */}
      {news.length > 0 && (
        <div className="glass rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">World Cup News</h3>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {news.slice(0, 4).map(function(article: any, i: number) {
              var img = article.images && article.images[0] ? article.images[0].url : null;
              var link = article.links && article.links.web ? article.links.web.href : "#";
              return (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="flex gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors group">
                  {img && <img src={img} alt="" className="w-16 h-12 rounded object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white/60 leading-snug line-clamp-2 group-hover:text-white/80 transition-colors">{article.headline}</p>
                    {article.published && <p className="text-[9px] text-white/15 mt-1">{new Date(article.published).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
