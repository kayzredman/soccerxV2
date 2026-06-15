import { getTeams, getMatches, getGroups } from "@/lib/api";
import { BracketView } from "@/components/bracket/bracket-view";
import { KnockoutTree } from "@/components/bracket/knockout-tree";
import { Shell } from "@/components/ui/shell";
import type { Team, Match, Group } from "@/lib/types";

export default async function BracketPage() {
  var teamsData: Team[] = (await getTeams()) || [];
  var matchesData: Match[] = (await getMatches()) || [];
  var groupsData: Group[] = (await getGroups()) || [];

  var groupLetterMap: Record<string, string> = {};
  for (var i = 0; i < groupsData.length; i++) {
    groupLetterMap[groupsData[i].id] = groupsData[i].letter;
  }

  var groupMap = new Map<string, { letter: string; teams: Team[] }>();
  for (var i = 0; i < teamsData.length; i++) {
    var team = teamsData[i];
    var gid = team.groupId || "ungrouped";
    if (gid === "ungrouped") continue;
    if (!groupMap.has(gid)) {
      groupMap.set(gid, { letter: groupLetterMap[gid] || "?", teams: [] });
    }
    groupMap.get(gid)!.teams.push(team);
  }

  var sortedGroups = Array.from(groupMap.values()).sort(function(a, b) {
    return a.letter.localeCompare(b.letter);
  });

  var groupMatches = matchesData.filter(function(m) { return m.stage === "GROUP"; });
  var knockoutMatches = matchesData.filter(function(m) { return m.stage !== "GROUP"; });

  return (
    <Shell className="py-10">
      <div className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">Bracket Builder</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {teamsData.length} teams &middot; {sortedGroups.length} groups
        </h1>
        <p className="text-white/40">
          {groupMatches.length} group stage + {knockoutMatches.length} knockout matches loaded.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-lg font-bold text-white mb-4">Group Stage</h2>
        <BracketView groups={sortedGroups} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Knockout Rounds</h2>
        <KnockoutTree matches={knockoutMatches} />
      </div>
    </Shell>
  );
}
