import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });

import { eq } from 'drizzle-orm';
import { getDb, groups, matches, teams, tournaments } from '@soccerx/db';
import { ApiFootballClient } from '@soccerx/integrations';

var apiKey = process.env.FOOTBALL_DATA_API_KEY;
if (!apiKey) {
  console.error('FOOTBALL_DATA_API_KEY is missing from .env');
  process.exit(1);
}

var client = new ApiFootballClient({ apiKey: apiKey });
var db = getDb();

function mapStatus(s: string): string {
  var m: Record<string, string> = {
    SCHEDULED: 'SCHEDULED', TIMED: 'SCHEDULED', LIVE: 'LIVE',
    IN_PLAY: 'LIVE', PAUSED: 'LIVE', FINISHED: 'FINISHED',
    POSTPONED: 'POSTPONED', CANCELLED: 'CANCELED', SUSPENDED: 'POSTPONED',
    AWARDED: 'FINISHED',
  };
  return m[s] || 'SCHEDULED';
}

function mapStage(s: string): string {
  if (!s) return 'GROUP';
  var lower = s.toLowerCase();
  if (lower.includes('group')) return 'GROUP';
  if (lower.includes('last_32') || lower.includes('round_of_32')) return 'R32';
  if (lower.includes('last_16') || lower.includes('round_of_16')) return 'R16';
  if (lower.includes('quarter')) return 'QF';
  if (lower.includes('semi')) return 'SF';
  if (lower.includes('third') || lower.includes('3rd')) return 'THIRD_PLACE';
  if (lower.includes('final')) return 'FINAL';
  return 'GROUP';
}

function extractGroupLetter(raw: string): string {
  var cleaned = raw.replace('GROUP_', '').replace('Group ', '').trim();
  if (cleaned.length > 2) {
    return cleaned.slice(-1).toUpperCase();
  }
  return cleaned.toUpperCase();
}

async function run() {
  console.log('SoccerX WC2026 Ingest (football-data.org v4)\n');

  console.log('Step 1/4 - Tournament...');
  var existing = await db.select().from(tournaments).where(eq(tournaments.slug, 'wc2026')).limit(1);
  var tournamentId: string;

  if (existing[0]) {
    tournamentId = existing[0].id;
    console.log('   Exists: ' + tournamentId);
  } else {
    var ins = await db.insert(tournaments).values({
      slug: 'wc2026',
      name: 'FIFA World Cup 2026',
      startsAt: new Date('2026-06-11T00:00:00Z'),
      endsAt: new Date('2026-07-19T00:00:00Z'),
      format: '48-team',
    }).returning();
    tournamentId = ins[0].id;
    console.log('   Created: ' + tournamentId);
  }

  console.log('\nStep 2/4 - Groups...');
  var groupTeamMap = new Map();
  var groupLetterToId = new Map();

  try {
    var standingsData = await client.getStandings();
    var standingsList = standingsData.standings || [];

    for (var i = 0; i < standingsList.length; i++) {
      var standing = standingsList[i];
      if (standing.type !== 'TOTAL') continue;

      var groupName = standing.group || '';
      if (!groupName) continue;
      var letter = extractGroupLetter(groupName);
      if (!letter) continue;

      var existingGroups = await db.select().from(groups).where(eq(groups.tournamentId, tournamentId));
      var existingGroup = existingGroups.find(function(r: any) { return r.letter === letter; });

      var groupId: string;
      if (existingGroup) {
        groupId = existingGroup.id;
      } else {
        var gIns = await db.insert(groups).values({ tournamentId: tournamentId, letter: letter }).returning();
        groupId = gIns[0].id;
      }
      groupLetterToId.set(letter, groupId);

      var table = standing.table || [];
      for (var j = 0; j < table.length; j++) {
        groupTeamMap.set(table[j].team.id, groupId);
      }
      console.log('   Group ' + letter + ' - ' + table.length + ' teams');
    }

    if (groupLetterToId.size === 0) {
      console.log('   No groups found yet. Continuing...');
    }
  } catch (e: any) {
    console.log('   Standings not available: ' + e.message);
    console.log('   Continuing without groups...');
  }

  console.log('\nStep 3/4 - Teams...');
  var teamsData = await client.getTeams();
  var teamsList = teamsData.teams || [];
  var teamIdMap = new Map();
  var teamsCount = 0;

  for (var i = 0; i < teamsList.length; i++) {
    var apiTeam = teamsList[i];
    var code = (apiTeam.tla || apiTeam.shortName || apiTeam.name.slice(0, 3)).toUpperCase();
    var gid = groupTeamMap.get(apiTeam.id) || null;

    var existingTeams = await db.select().from(teams).where(eq(teams.tournamentId, tournamentId));
    var existingTeam = existingTeams.find(function(r: any) { return r.code === code; });

    var teamId: string;
    if (existingTeam) {
      await db.update(teams).set({ name: apiTeam.name, groupId: gid }).where(eq(teams.id, existingTeam.id));
      teamId = existingTeam.id;
    } else {
      var tIns = await db.insert(teams).values({
        tournamentId: tournamentId,
        name: apiTeam.name,
        code: code,
        flagEmoji: '',
        groupId: gid,
      }).returning();
      teamId = tIns[0].id;
    }
    teamIdMap.set(apiTeam.id, teamId);
    teamsCount++;
  }
  console.log('   ' + teamsCount + ' teams upserted');

  console.log('\nStep 4/4 - Matches...');
  var matchesData = await client.getMatches();
  var matchesList = matchesData.matches || [];
  var matchesCount = 0;

  for (var i = 0; i < matchesList.length; i++) {
    var m = matchesList[i];
    var extRef = 'footballdata:' + m.id;
    var homeId = m.homeTeam ? teamIdMap.get(m.homeTeam.id) || null : null;
    var awayId = m.awayTeam ? teamIdMap.get(m.awayTeam.id) || null : null;
    var stage = mapStage(m.stage || m.group || '');
    var status = mapStatus(m.status || 'SCHEDULED');
    var homeScore = m.score && m.score.fullTime ? m.score.fullTime.home : null;
    var awayScore = m.score && m.score.fullTime ? m.score.fullTime.away : null;

    var existingMatches = await db.select().from(matches).where(eq(matches.externalRef, extRef)).limit(1);

    if (existingMatches[0]) {
      await db.update(matches).set({
        stage: stage as any,
        kickoffAt: new Date(m.utcDate),
        venue: m.venue || null,
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeScore: homeScore,
        awayScore: awayScore,
        status: status as any,
        meta: { matchday: m.matchday, group: m.group },
      }).where(eq(matches.id, existingMatches[0].id));
    } else {
      await db.insert(matches).values({
        tournamentId: tournamentId,
        stage: stage as any,
        kickoffAt: new Date(m.utcDate),
        venue: m.venue || null,
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeScore: homeScore,
        awayScore: awayScore,
        status: status as any,
        externalRef: extRef,
        meta: { matchday: m.matchday, group: m.group },
      });
    }
    matchesCount++;
  }
  console.log('   ' + matchesCount + ' matches upserted');

  console.log('\n' + '='.repeat(50));
  console.log('INGEST COMPLETE');
  console.log('='.repeat(50));
  console.log('   Tournament: FIFA World Cup 2026');
  console.log('   Groups:     ' + groupLetterToId.size);
  console.log('   Teams:      ' + teamsCount);
  console.log('   Matches:    ' + matchesCount);
  console.log('   DB:         soccerx_v2');
  console.log('='.repeat(50));

  process.exit(0);
}

run().catch(function(err) {
  console.error('Ingest failed:', err);
  process.exit(1);
});
