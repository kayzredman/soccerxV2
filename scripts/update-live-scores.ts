import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });

import { eq } from 'drizzle-orm';
import { getDb, matches } from '@soccerx/db';

var apiKey = process.env.FOOTBALL_DATA_API_KEY;
if (!apiKey) { console.error('Missing key'); process.exit(1); }

var db = getDb();
var BASE = 'https://api.football-data.org/v4';

function mapStatus(s: string): string {
  var m: Record<string, string> = {
    SCHEDULED: 'SCHEDULED', TIMED: 'SCHEDULED',
    IN_PLAY: 'LIVE', PAUSED: 'LIVE', LIVE: 'LIVE',
    FINISHED: 'FINISHED', AWARDED: 'FINISHED',
    POSTPONED: 'POSTPONED', CANCELLED: 'CANCELED',
  };
  return m[s] || 'SCHEDULED';
}

function getScore(sc: any): { h: number|null; a: number|null } {
  if (!sc) return { h: null, a: null };
  if (sc.fullTime && sc.fullTime.home != null) return { h: sc.fullTime.home, a: sc.fullTime.away };
  if (sc.regularTime && sc.regularTime.home != null) return { h: sc.regularTime.home, a: sc.regularTime.away };
  if (sc.halfTime && sc.halfTime.home != null) return { h: sc.halfTime.home, a: sc.halfTime.away };
  return { h: null, a: null };
}

async function run() {
  var today = new Date().toISOString().slice(0, 10);
  console.log('Checking scores for ' + today + '...');
  var res = await fetch(BASE + '/competitions/WC/matches?dateFrom=' + today + '&dateTo=' + today, {
    headers: { 'X-Auth-Token': apiKey! },
  });
  if (!res.ok) { console.error('API error ' + res.status); process.exit(1); }
  var data = await res.json();
  var list = data.matches || [];
  if (list.length === 0) { console.log('No matches today.'); process.exit(0); }
  console.log(list.length + ' matches found.\n');
  var updated = 0;
  var live = 0;
  var finished = 0;
  for (var i = 0; i < list.length; i++) {
    var m = list[i];
    var ref = 'footballdata:' + m.id;
    var st = mapStatus(m.status || 'SCHEDULED');
    var hn = m.homeTeam ? m.homeTeam.shortName || m.homeTeam.name : 'TBD';
    var an = m.awayTeam ? m.awayTeam.shortName || m.awayTeam.name : 'TBD';
    var sc = getScore(m.score);
    var ex = await db.select().from(matches).where(eq(matches.externalRef, ref)).limit(1);
    if (!ex[0]) { continue; }
    var fh = sc.h;
    var fa = sc.a;
    if (st === 'LIVE' && fh == null) { fh = ex[0].homeScore; fa = ex[0].awayScore; }
    var oc = ex[0].status !== st || ex[0].homeScore !== fh || ex[0].awayScore !== fa;
    if (!oc) continue;
    await db.update(matches).set({
      homeScore: fh, awayScore: fa, status: st as any,
      meta: { matchday: m.matchday, group: m.group, apiStatus: m.status, lastUpdate: new Date().toISOString(), score: m.score },
    }).where(eq(matches.id, ex[0].id));
    updated++;
    var ss = (fh != null ? fh : '?') + '-' + (fa != null ? fa : '?');
    if (st === 'LIVE') { live++; console.log('  LIVE: ' + hn + ' ' + ss + ' ' + an); }
    if (ex[0].status !== 'FINISHED' && st === 'FINISHED') { finished++; console.log('  FT: ' + hn + ' ' + ss + ' ' + an); }
  }
  console.log('\nUpdated: ' + updated + '  Live: ' + live + '  Finished: ' + finished);
  process.exit(0);
}

run().catch(function(e) { console.error('Failed:', e); process.exit(1); });
