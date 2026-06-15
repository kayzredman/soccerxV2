import { HeroSection } from "@/components/sections/hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { LiveStatsBar } from "@/components/sections/live-stats-bar";
import { getTeams, getMatches, getTournament } from "@/lib/api";

export default async function HomePage() {
  var teamsData = await getTeams();
  var matchesData = await getMatches();
  var tournament = await getTournament();

  var teamCount = teamsData ? teamsData.length : 0;
  var matchCount = matchesData ? matchesData.length : 0;
  var liveMatches = matchesData ? matchesData.filter(function(m: any) { return m.status === "LIVE"; }).length : 0;
  var finishedMatches = matchesData ? matchesData.filter(function(m: any) { return m.status === "FINISHED"; }).length : 0;

  return (
    <>
      <LiveStatsBar teamCount={teamCount} matchCount={matchCount} liveMatches={liveMatches} finishedMatches={finishedMatches}
        tournamentName={tournament ? tournament.name : "FIFA World Cup 2026"} />
      <HeroSection />
      <FeatureGrid />
      <CtaBand />
    </>
  );
}
