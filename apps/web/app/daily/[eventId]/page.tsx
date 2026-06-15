import { getMatchSummary } from "@/lib/espn";
import { Shell } from "@/components/ui/shell";
import { BlurFade } from "@/components/ui/blur-fade";
import { MatchDetailHeader } from "@/components/daily/match-detail-header";
import { MatchStats } from "@/components/daily/match-stats";
import { MatchLineup } from "@/components/daily/match-lineup";
import { MatchTimeline } from "@/components/daily/match-timeline";
import { MatchSidebar } from "@/components/daily/match-sidebar";
import { MatchArticle } from "@/components/daily/match-article";
import Link from "next/link";

export default async function MatchDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  var { eventId } = await params;
  var summary = await getMatchSummary(eventId);

  if (!summary) {
    return (
      <Shell className="py-10">
        <div className="glass text-center py-20 rounded-2xl">
          <p className="text-5xl mb-4">{"⚽"}</p>
          <p className="text-white/40">Match data not available.</p>
          <Link href="/daily" className="text-brand-400 text-sm mt-4 inline-block hover:underline">Back to Daily</Link>
        </div>
      </Shell>
    );
  }

  var comp = summary.header.competitions[0];
  var homeComp = comp.competitors.find(function(c: any) { return c.homeAway === "home"; });
  var awayComp = comp.competitors.find(function(c: any) { return c.homeAway === "away"; });
  var status = comp.status;
  var venue = summary.gameInfo && summary.gameInfo.venue ? summary.gameInfo.venue : null;
  var attendance = summary.gameInfo ? summary.gameInfo.attendance : null;
  var officials = summary.gameInfo ? summary.gameInfo.officials || [] : [];
  var homeTeam = summary.boxscore.teams[0];
  var awayTeam = summary.boxscore.teams[1];
  var homeRoster = summary.rosters && summary.rosters[0] ? summary.rosters[0] : null;
  var awayRoster = summary.rosters && summary.rosters[1] ? summary.rosters[1] : null;
  var keyEvents = summary.keyEvents || [];
  var commentary = summary.commentary || [];
  var article = summary.article || null;
  var leaders = summary.leaders || [];
  var standings = summary.standings || null;
  var news = summary.news ? summary.news.articles || [] : [];

  return (
    <div className="min-h-screen bg-[hsl(228,14%,8%)]">
      {/* Sticky Header */}
      <MatchDetailHeader home={homeComp!} away={awayComp!} status={status} keyEvents={keyEvents} />

      <Shell className="py-6">
        <div className="mb-4">
          <Link href="/daily" className="inline-flex items-center gap-2 text-xs text-white/25 hover:text-brand-400 transition-colors group">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Daily Digest
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid gap-5 lg:grid-cols-[260px_1fr_280px]">

          {/* LEFT COLUMN - Lineups */}
          <div className="space-y-4 order-2 lg:order-1">
            <BlurFade delay={0.1}>
              {homeRoster && awayRoster && (
                <MatchLineup home={homeRoster} away={awayRoster} />
              )}
            </BlurFade>
          </div>

          {/* CENTER COLUMN - Article + Commentary + Stats */}
          <div className="space-y-5 order-1 lg:order-2">
            {article && (
              <BlurFade delay={0.05}>
                <MatchArticle article={article} />
              </BlurFade>
            )}

            {keyEvents.length > 0 && (
              <BlurFade delay={0.1}>
                <MatchTimeline events={keyEvents} commentary={commentary} />
              </BlurFade>
            )}

            {homeTeam && awayTeam && (
              <BlurFade delay={0.15}>
                <MatchStats home={homeTeam} away={awayTeam} />
              </BlurFade>
            )}
          </div>

          {/* RIGHT COLUMN - Game Info + Standings + News */}
          <div className="space-y-4 order-3">
            <BlurFade delay={0.1}>
              <MatchSidebar
                venue={venue}
                attendance={attendance}
                officials={officials}
                standings={standings}
                news={news}
                status={status}
              />
            </BlurFade>
          </div>
        </div>
      </Shell>
    </div>
  );
}
