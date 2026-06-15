import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });

import { eq, or, inArray } from 'drizzle-orm';
import { getDb, matches, teams } from '@soccerx/db';

var apiKey = process.env.FOOTBALL_DATA_API_KEY;
if (!apiKey) { console.error('Missing FOOTBALL_DATA_API_KEY'); process.exit(1); }

var db = getDb();
var FD_BASE = 'https://api.football-data.org/v4';
var ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';

function mapStatus(s: string): string {
  var m: Record<string, string> = {
    SCHEDULED: 'SCHEDULED', TIMED: 'SCHEDULED',
    IN_PLAY: 'LIVE', PAUSED: 'LIVE', LIVE: 'LIVE',
    FINISHED: 'FINISHED', AWARDED: 'FINISHED',
    POSTPONED: 'POSTPONED', CANCELLED: 'CANCELED',
  };
  return m[s] || 'SCHEDULED';
}

function mapEspnStatus(name: string): string {
  if (name.indexOf('SECOND_HALF') >= 0) return 'LIVE';
  if (name.indexOf('FIRST_HALF') >= 0) return 'LIVE';
  if (name.indexOf('HALF') >= 0 && name.indexOf('FULL') < 0) return 'LIVE';
  if (name.indexOf('PLAY') >= 0) return 'LIVE';
  if (name.indexOf('FULL_TIME') >= 0) return 'FINISHED';
  if (name.indexOf('FINAL') >= 0) return 'FINISHED';
  return 'SCHEDULED';
}

function getScore(sc: any): { h: number | null; a: number | null } {
  if (!sc) return { h: null, a: null };
  if (sc.fullTime && sc.fullTime.home != null) return { h: sc.fullTime.home, a: sc.fullTime.away };
  if (sc.regularTime && sc.regularTime.home != null) return { h: sc.regularTime.home, a: sc.regularTime.away };
  if (sc.halfTime && sc.halfTime.home != null) return { h: sc.halfTime.home, a: sc.halfTime.away };
  return { h: null, a: null };
}

var TLA_MAP: Record<string, string> = {
  CIV: 'CIV', COT: 'CIV', IC: 'CIV', ECU: 'ECU', GER: 'GER',
  CUW: 'CUW', CUR: 'CUW', NED: 'NED', HOL: 'NED', JPN: 'JPN',
  JAP: 'JPN', SWE: 'SWE', TUN: 'TUN', AUS: 'AUS', TUR: 'TUR',
  USA: 'USA', PAR: 'PAR', BRA: 'BRA', MAR: 'MAR', MEX: 'MEX',
  RSA: 'RSA', KOR: 'KOR', CZE: 'CZE', CAN: 'CAN', BIH: 'BIH',
  QAT: 'QAT', SUI: 'SUI', HAI: 'HAI', SCO: 'SCO', ESP: 'ESP',
  CPV: 'CPV', BEL: 'BEL', EGY: 'EGY', KSA: 'KSA', URY: 'URY',
  URU: 'URY', IRN: 'IRN', NZL: 'NZL', FRA: 'FRA', SEN: 'SEN',
  IRQ: 'IRQ', NOR: 'NOR', ARG: 'ARG', ALG: 'ALG', AUT: 'AUT',
  JOR: 'JOR', ENG: 'ENG', CRO: 'CRO', GHA: 'GHA', PAN: 'PAN',
};

function norm(a: string): string { var u = a.toUpperCase(); return TLA_MAP[u] || u; }

async function fetchESPN() {
  var map = new Map();
  try {
    var res = await fetch(ESPN_BASE);
    if (!res.ok) { console.log('  ESPN: HTTP ' + res.status); return map; }
    var data = await res.json();
    var events = data.events || [];
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      var comp = ev.competitions[0];
      if (!comp || !comp.competitors || comp.competitors.length < 2) continue;
      var homeC = comp.competitors.find(function(c: any) { return c.homeAway === 'home'; });
      var awayC = comp.competitors.find(function(c: any) { return c.homeAway === 'away'; });
      if (!homeC || !awayC) continue;
      var key = norm(homeC.team.abbreviation) + ':' + norm(awayC.team.abbreviation);
      var hs = parseInt(homeC.score, 10);
      var as2 = parseInt(awayC.score, 10);
      if (!isNaN(hs) && !isNaN(as2)) {
        map.set(key, {
          home: hs, away: as2,
          status: mapEspnStatus(ev.status.type.name || ''),
          detail: ev.status.type.detail || '',
          espnId: ev.id,
        });
      }
    }
    console.log('  ESPN: ' + map.size + ' matches with scores');
  } catch (e) { console.log('  ESPN: fetch failed'); }
  return map;
}

async function run() {
  var now = new Date();
  var today = now.toISOString().slice(0, 10);
  var yesterday = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);

  console.log('\n[SoccerX] Live update - ' + today);
  console.log('  Checking: ' + yesterday + ' and ' + today);
  console.log('='.repeat(50));

  // 1. ESPN (real-time)
  console.log('\nFetching ESPN...');
  var espnScores = await fetchESPN();

  // 2. football-data.org (yesterday + today)
  console.log('Fetching football-data.org...');
  var res = await fetch(FD_BASE + '/competitions/WC/matches?dateFrom=' + yesterday + '&dateTo=' + today, {
    headers: { 'X-Auth-Token': apiKey! },
  });
  if (!res.ok) { console.error('FD error: ' + res.status); process.exit(1); }
  var data = await res.json();
  var list = data.matches || [];
  console.log('  FD: ' + list.length + ' matches found\n');

  // 3. Build team TLA lookup from DB
  var allTeams = await db.select().from(teams);
  var teamIdToTLA: Record<string, string> = {};
  for (var t = 0; t < allTeams.length; t++) {
    teamIdToTLA[allTeams[t].id] = allTeams[t].code;
  }

  var updated = 0;
  var live = 0;
  var finished = 0;

  for (var i = 0; i < list.length; i++) {
    var m = list[i];
    var ref = 'footballdata:' + m.id;
    var fdStatus = mapStatus(m.status || 'SCHEDULED');
    var hn = m.homeTeam ? m.homeTeam.shortName || m.homeTeam.name : 'TBD';
    var an = m.awayTeam ? m.awayTeam.shortName || m.awayTeam.name : 'TBD';
    var homeTLA = m.homeTeam ? norm(m.homeTeam.tla || '') : '';
    var awayTLA = m.awayTeam ? norm(m.awayTeam.tla || '') : '';
    var fdScore = getScore(m.score);

    var ex = await db.select().from(matches).where(eq(matches.externalRef, ref)).limit(1);
    if (!ex[0]) continue;

    // ESPN enrichment
    var espnKey = homeTLA + ':' + awayTLA;
    var espnData = espnScores.get(espnKey);

    var finalStatus = fdStatus;
    var finalHome: number | null = fdScore.h;
    var finalAway: number | null = fdScore.a;
    var detail = '';
    var espnId = '';

    if (espnData) {
      espnId = espnData.espnId;
      detail = espnData.detail;

      if (espnData.status === 'LIVE') {
        finalStatus = 'LIVE';
        finalHome = espnData.home;
        finalAway = espnData.away;
      } else if (espnData.status === 'FINISHED') {
        finalStatus = 'FINISHED';
        if (fdScore.h != null) { finalHome = fdScore.h; finalAway = fdScore.a; }
        else { finalHome = espnData.home; finalAway = espnData.away; }
      }
    }

    if (finalStatus === 'LIVE' && finalHome == null) {
      finalHome = ex[0].homeScore;
      finalAway = ex[0].awayScore;
    }

    var changed = ex[0].status !== finalStatus || ex[0].homeScore !== finalHome || ex[0].awayScore !== finalAway;
    if (!changed) continue;

    await db.update(matches).set({
      homeScore: finalHome, awayScore: finalAway, status: finalStatus as any,
      meta: {
        matchday: m.matchday, group: m.group,
        apiStatus: m.status, espnEventId: espnId, detail: detail,
        lastUpdate: new Date().toISOString(), score: m.score,
      },
    }).where(eq(matches.id, ex[0].id));

    updated++;
    var ss = (finalHome != null ? finalHome : '?') + '-' + (finalAway != null ? finalAway : '?');
    var src = espnData ? ' [ESPN]' : ' [FD]';

    if (finalStatus === 'LIVE') {
      live++;
      console.log('  LIVE: ' + hn + ' ' + ss + ' ' + an + (detail ? ' (' + detail + ')' : '') + src);
    } else if (ex[0].status !== 'FINISHED' && finalStatus === 'FINISHED') {
      finished++;
      console.log('  FT:   ' + hn + ' ' + ss + ' ' + an + src);
    } else {
      console.log('  UPD:  ' + hn + ' ' + ss + ' ' + an + ' [' + finalStatus + ']' + src);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('  Updated: ' + updated + '  Live: ' + live + '  Finished: ' + finished);
  console.log('='.repeat(50) + '\n');
  process.exit(0);
}

run().catch(function(e) { console.error('Failed:', e); process.exit(1); });
