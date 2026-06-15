import { getMatches, getTeams } from "@/lib/api";
import { Shell, GlassPanel } from "@/components/ui/shell";
import { DailyMatchPreview } from "@/components/daily/daily-match-preview";
import type { Team, Match } from "@/lib/types";

export default async function DailyPage() {
  var matchesData: Match[] = (await getMatches()) || [];
  var teamsData: Team[] = (await getTeams()) || [];

  var teamMap: Record<string, Team> = {};
  for (var i = 0; i < teamsData.length; i++) {
    teamMap[teamsData[i].id] = teamsData[i];
  }

  var today = new Date().toISOString().slice(0, 10);
  var tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  var todayMatches = matchesData.filter(function(m) {
    var d = m.kickoffAt ? m.kickoffAt.slice(0, 10) : "";
    return d === today;
  });

  var tomorrowMatches = matchesData.filter(function(m) {
    var d = m.kickoffAt ? m.kickoffAt.slice(0, 10) : "";
    return d === tomorrow;
  });

  var liveMatches = matchesData.filter(function(m) { return m.status === "LIVE"; });
  var finishedToday = todayMatches.filter(function(m) { return m.status === "FINISHED"; });
  var scheduledToday = todayMatches.filter(function(m) { return m.status === "SCHEDULED" || m.status === "TIMED"; });

  var totalGoalsToday = 0;
  for (var i = 0; i < finishedToday.length; i++) {
    totalGoalsToday += (finishedToday[i].homeScore || 0) + (finishedToday[i].awayScore || 0);
  }

  return (
    <Shell className="py-10">
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">Daily Digest</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {today}
        </h1>
        <p className="text-white/40">
          Your daily briefing for FIFA World Cup 2026.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <GlassPanel className="text-center py-6">
          <p className="text-3xl font-black text-white">{todayMatches.length}</p>
          <p className="text-xs text-white/30 uppercase tracking-wider mt-1">Matches Today</p>
        </GlassPanel>
        <GlassPanel className="text-center py-6">
          <p className="text-3xl font-black text-emerald-400">{liveMatches.length}</p>
          <p className="text-xs text-white/30 uppercase tracking-wider mt-1">Live Now</p>
        </GlassPanel>
        <GlassPanel className="text-center py-6">
          <p className="text-3xl font-black text-white">{finishedToday.length}</p>
          <p className="text-xs text-white/30 uppercase tracking-wider mt-1">Completed</p>
        </GlassPanel>
        <GlassPanel className="text-center py-6">
          <p className="text-3xl font-black gradient-text">{totalGoalsToday}</p>
          <p className="text-xs text-white/30 uppercase tracking-wider mt-1">Goals Today</p>
        </GlassPanel>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Now
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {liveMatches.map(function(match) {
              var home = match.homeTeamId ? teamMap[match.homeTeamId] : null;
              var away = match.awayTeamId ? teamMap[match.awayTeamId] : null;
              return <DailyMatchPreview key={match.id} match={match} home={home} away={away} />;
            })}
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      {scheduledToday.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Coming Up Today</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {scheduledToday.map(function(match) {
              var home = match.homeTeamId ? teamMap[match.homeTeamId] : null;
              var away = match.awayTeamId ? teamMap[match.awayTeamId] : null;
              return <DailyMatchPreview key={match.id} match={match} home={home} away={away} />;
            })}
          </div>
        </div>
      )}

      {/* Today's Results */}
      {finishedToday.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Results</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {finishedToday.map(function(match) {
              var home = match.homeTeamId ? teamMap[match.homeTeamId] : null;
              var away = match.awayTeamId ? teamMap[match.awayTeamId] : null;
              return <DailyMatchPreview key={match.id} match={match} home={home} away={away} />;
            })}
          </div>
        </div>
      )}

      {/* Tomorrow Preview */}
      {tomorrowMatches.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Tomorrow&apos;s Matches</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tomorrowMatches.map(function(match) {
              var home = match.homeTeamId ? teamMap[match.homeTeamId] : null;
              var away = match.awayTeamId ? teamMap[match.awayTeamId] : null;
              return <DailyMatchPreview key={match.id} match={match} home={home} away={away} />;
            })}
          </div>
        </div>
      )}

      {/* No matches fallback */}
      {todayMatches.length === 0 && liveMatches.length === 0 && (
        <GlassPanel className="text-center py-16">
          <p className="text-4xl mb-3">{"⚽"}</p>
          <p className="text-white/40 text-sm">No matches scheduled for today.</p>
          <p className="text-white/25 text-xs mt-2">Check back on match days for live updates, scores, and stats.</p>
        </GlassPanel>
      )}
    </Shell>
  );
}
