/**
 * SoccerX - Live Score Updater
 *
 * Polls API-Football for today's matches and updates scores + status.
 * Run by cron every 5 min or called from BullMQ.
 *
 * Usage:
 *   npx tsx scripts/update-live-scores.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });

import { eq } from 'drizzle-orm';
import { getDb, matches } from '@soccerx/db';
import {
  ApiFootballClient,
  WC2026_LEAGUE_ID,
  WC2026_SEASON,
  mapMatchStatus,
} from '@soccerx/integrations';

const apiKey = process.env.FOOTBALL_DATA_API_KEY;
if (!apiKey) {
  console.error('FOOTBALL_DATA_API_KEY is missing from .env');
  process.exit(1);
}

const client = new ApiFootballClient({ apiKey });
const db = getDb();

async function run() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`Checking live scores for ${today}...`);

  const res = await client.getLiveAndRecentFixtures(WC2026_LEAGUE_ID, WC2026_SEASON);

  if (res.results === 0) {
    console.log('   No matches today. Done.');
    process.exit(0);
  }

  let updated = 0;
  let newlyFinished = 0;

  for (const f of res.response) {
    const externalRef = `apifootball:${f.fixture.id}`;
    const newStatus = mapMatchStatus(f.fixture.status.short);

    const existing = await db.select().from(matches)
      .where(eq(matches.externalRef, externalRef))
      .limit(1);

    if (!existing[0]) {
      console.log(`   Unknown fixture ${externalRef} - skipping`);
      continue;
    }

    const oldStatus = existing[0].status;

    await db.update(matches)
      .set({
        homeScore: f.goals.home,
        awayScore: f.goals.away,
        status: newStatus as any,
        meta: {
          ...(existing[0].meta as Record<string, unknown> ?? {}),
          lastUpdate: new Date().toISOString(),
          elapsed: f.fixture.status.elapsed,
          score: f.score,
        },
      })
      .where(eq(matches.id, existing[0].id));

    updated++;

    if (oldStatus !== 'FINISHED' && newStatus === 'FINISHED') {
      newlyFinished++;
      console.log(`   FINISHED: ${f.teams.home.name} ${f.goals.home}-${f.goals.away} ${f.teams.away.name}`);
    }
  }

  console.log(`\nUpdated ${updated} matches, ${newlyFinished} newly finished.`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Live update failed:', err);
  process.exit(1);
});
