import { getMatches, getTeams } from "@/lib/api";
import { MatchList } from "@/components/matches/match-list";
import { Shell } from "@/components/ui/shell";
import type { Team, Match } from "@/lib/types";

export default async function MatchesPage() {
  var matchesData: Match[] = (await getMatches()) || [];
  var teamsData: Team[] = (await getTeams()) || [];

  var teamMap: Record<string, Team> = {};
  for (var i = 0; i < teamsData.length; i++) {
    teamMap[teamsData[i].id] = teamsData[i];
  }

  var groupMatches = matchesData.filter(function(m) { return m.stage === "GROUP"; });

  return (
    <Shell className="py-10">
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">Fixtures</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {matchesData.length} matches scheduled
        </h1>
        <p className="text-white/40">
          {groupMatches.length} group stage &middot; {matchesData.length - groupMatches.length} knockout
        </p>
      </div>
      <MatchList matches={matchesData} teamMap={teamMap} />
    </Shell>
  );
}
