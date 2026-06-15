import { getMatches, getTeams } from "@/lib/api";
import { getScoreboard, getNews } from "@/lib/espn";
import { Shell, GlassPanel } from "@/components/ui/shell";
import { DailyMatchPreview } from "@/components/daily/daily-match-preview";
import { NewsFeed } from "@/components/daily/news-feed";
import { BlurFade } from "@/components/ui/blur-fade";
import type { Team, Match } from "@/lib/types";

export default async function DailyPage() {
  var matchesData: Match[] = (await getMatches()) || [];
  var teamsData: Team[] = (await getTeams()) || [];
  var espn = await getScoreboard();
  var news = await getNews(8);

  var teamMap: Record<string, Team> = {};
  for (var i = 0; i < teamsData.length; i++) { teamMap[teamsData[i].id] = teamsData[i]; }

  var today = new Date().toISOString().slice(0, 10);
  var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  var tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  var todayMatches = matchesData.filter(function(m) {
    var d = m.kickoffAt ? m.kickoffAt.slice(0, 10) : "";
    return d === today || d === yesterday;
  });
  var tomorrowMatches = matchesData.filter(function(m) {
    var d = m.kickoffAt ? m.kickoffAt.slice(0, 10) : "";
    return d === tomorrow;
  });

  var liveMatches = matchesData.filter(function(m) { return m.status === "LIVE"; });
  var finishedRecent = todayMatches.filter(function(m) { return m.status === "FINISHED"; });
  var scheduledToday = todayMatches.filter(function(m) { return m.status === "SCHEDULED"; });

  var totalGoals = 0;
  for (var j = 0; j < finishedRecent.length; j++) { totalGoals += (finishedRecent[j].homeScore || 0) + (finishedRecent[j].awayScore || 0); }
  for (var k = 0; k < liveMatches.length; k++) { totalGoals += (liveMatches[k].homeScore || 0) + (liveMatches[k].awayScore || 0); }

  return (
    <Shell className="py-8 space-y-10">
      {/* Header */}
      <BlurFade delay={0}>
        <div className="relative overflow-hidden rounded-3xl glass-featured p-8 sm:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-emerald-500/5" />
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              World Cup 2026
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
              <span className="gradient-text">Daily Digest</span>
            </h1>
            <p className="text-white/30 mt-3 max-w-lg text-sm leading-relaxed">Live scores, match events, player stats, and the latest World Cup news.</p>
          </div>
        </div>
      </BlurFade>

      {/* Quick Stats */}
      <BlurFade delay={0.05}>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Matches", value: todayMatches.length, color: "text-white" },
            { label: "Live Now", value: liveMatches.length, color: "text-emerald-400" },
            { label: "Completed", value: finishedRecent.length, color: "text-white" },
            { label: "Goals Scored", value: totalGoals, color: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" },
          ].map(function(stat, i) {
            return (
              <GlassPanel key={stat.label} className="text-center py-6 px-4 hover-lift">
                <p className={"text-3xl sm:text-4xl font-black " + stat.color}>{stat.value}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] mt-2">{stat.label}</p>
              </GlassPanel>
            );
          })}
        </div>
      </BlurFade>

      {/* Live Matches - FEATURED */}
      {liveMatches.length > 0 && (
        <BlurFade delay={0.1}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Now
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/20 to-transparent" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {liveMatches.map(function(match) {
                return <DailyMatchPreview key={match.id} match={match} home={match.homeTeamId ? teamMap[match.homeTeamId] : null} away={match.awayTeamId ? teamMap[match.awayTeamId] : null} />;
              })}
            </div>
          </div>
        </BlurFade>
      )}

      {/* Results */}
      {finishedRecent.length > 0 && (
        <BlurFade delay={0.15}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Results</span>
              <div className="h-px flex-1 bg-white/[0.04]" />
              <span className="text-[10px] text-white/15 uppercase">{finishedRecent.length} matches</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {finishedRecent.map(function(match) {
                return <DailyMatchPreview key={match.id} match={match} home={match.homeTeamId ? teamMap[match.homeTeamId] : null} away={match.awayTeamId ? teamMap[match.awayTeamId] : null} />;
              })}
            </div>
          </div>
        </BlurFade>
      )}

      {/* Coming Up */}
      {scheduledToday.length > 0 && (
        <BlurFade delay={0.2}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Coming Up</span>
              <div className="h-px flex-1 bg-white/[0.04]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {scheduledToday.map(function(match) {
                return <DailyMatchPreview key={match.id} match={match} home={match.homeTeamId ? teamMap[match.homeTeamId] : null} away={match.awayTeamId ? teamMap[match.awayTeamId] : null} />;
              })}
            </div>
          </div>
        </BlurFade>
      )}

      {/* News */}
      {news && news.articles && news.articles.length > 0 && (
        <BlurFade delay={0.25}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">World Cup News</span>
              <div className="h-px flex-1 bg-white/[0.04]" />
              <span className="text-[10px] text-brand-400/40">via ESPN</span>
            </div>
            <NewsFeed articles={news.articles} />
          </div>
        </BlurFade>
      )}

      {/* Tomorrow */}
      {tomorrowMatches.length > 0 && (
        <BlurFade delay={0.3}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Tomorrow</span>
              <div className="h-px flex-1 bg-white/[0.04]" />
              <span className="text-[10px] text-white/15 uppercase">{tomorrowMatches.length} matches</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {tomorrowMatches.map(function(match) {
                return <DailyMatchPreview key={match.id} match={match} home={match.homeTeamId ? teamMap[match.homeTeamId] : null} away={match.awayTeamId ? teamMap[match.awayTeamId] : null} />;
              })}
            </div>
          </div>
        </BlurFade>
      )}

      {todayMatches.length === 0 && liveMatches.length === 0 && (
        <GlassPanel className="text-center py-20">
          <p className="text-5xl mb-4">{"\u26BD"}</p>
          <p className="text-white/40 text-sm">No matches today. Check back on match days!</p>
        </GlassPanel>
      )}
    </Shell>
  );
}
