import { Queue, Worker, JobsOptions } from 'bullmq';
import IORedis from 'ioredis';
import { and, eq, isNull } from 'drizzle-orm';
import { getEnv } from '@soccerx/config';
import { getDb, leaderboardCache, leagues, leagueMembers, matches, picks, scoreEvents } from '@soccerx/db';

const env = getEnv();
const connection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });
const db = getDb();

export const scoringQueue = new Queue('soccerx-scoring', { connection });

export async function enqueueScoreMatch(matchId: string, opts?: JobsOptions) {
  return scoringQueue.add('score-match', { matchId }, opts);
}

export async function enqueueRefreshLeaderboards(scope: 'global' | 'league', scopeKey = 'all', opts?: JobsOptions) {
  return scoringQueue.add('refresh-leaderboards', { scope, scopeKey }, opts);
}

async function scoreMatch(matchId: string) {
  const match = (await db.select().from(matches).where(eq(matches.id, matchId)).limit(1))[0];
  if (!match || match.status !== 'FINISHED') return { skipped: true };

  const relatedPicks = await db.select().from(picks).where(eq(picks.matchId, matchId));

  for (const pick of relatedPicks) {
    const exists = await db
      .select()
      .from(scoreEvents)
      .where(and(eq(scoreEvents.pickId, pick.id), eq(scoreEvents.matchId, matchId), eq(scoreEvents.reason, 'match-score')))
      .limit(1);

    if (exists[0]) continue;

    // Hook only: real scoring matrix should be expanded from product rules.
    const points = pick.teamId && (pick.teamId === match.homeTeamId || pick.teamId === match.awayTeamId) ? 10 : 0;

    await db.insert(scoreEvents).values({
      userId: pick.userId,
      tournamentId: pick.tournamentId,
      pickId: pick.id,
      matchId,
      points,
      reason: 'match-score',
    });
  }

  return { scored: relatedPicks.length };
}

async function refreshGlobalLeaderboard() {
  const totals = await db.execute(`
    select
      se.user_id,
      coalesce(sum(se.points), 0) as total_points,
      row_number() over (order by coalesce(sum(se.points), 0) desc, min(se.created_at) asc) as rank
    from soccerx.score_events se
    group by se.user_id
  ` as any);

  for (const row of (totals as any).rows ?? []) {
    await db
      .insert(leaderboardCache)
      .values({
        scopeType: 'global',
        scopeKey: 'all',
        userId: row.user_id,
        totalPoints: Number(row.total_points),
        rank: Number(row.rank),
      })
      .onConflictDoUpdate({
        target: [leaderboardCache.scopeType, leaderboardCache.scopeKey, leaderboardCache.userId],
        set: {
          totalPoints: Number(row.total_points),
          rank: Number(row.rank),
          lastRefreshed: new Date(),
        },
      });
  }

  return { refreshed: true };
}

async function refreshLeagueLeaderboard(leagueId: string) {
  const totals = await db.execute(`
    select
      lm.user_id,
      coalesce(sum(se.points), 0) as total_points,
      row_number() over (order by coalesce(sum(se.points), 0) desc, min(coalesce(se.created_at, now())) asc) as rank
    from soccerx.league_members lm
    left join soccerx.score_events se on se.user_id = lm.user_id
    where lm.league_id = '${leagueId}'
    group by lm.user_id
  ` as any);

  for (const row of (totals as any).rows ?? []) {
    await db
      .insert(leaderboardCache)
      .values({
        scopeType: 'league',
        scopeKey: leagueId,
        userId: row.user_id,
        totalPoints: Number(row.total_points),
        rank: Number(row.rank),
      })
      .onConflictDoUpdate({
        target: [leaderboardCache.scopeType, leaderboardCache.scopeKey, leaderboardCache.userId],
        set: {
          totalPoints: Number(row.total_points),
          rank: Number(row.rank),
          lastRefreshed: new Date(),
        },
      });
  }

  return { refreshed: true, leagueId };
}

new Worker(
  'soccerx-scoring',
  async (job) => {
    if (job.name === 'score-match') {
      return scoreMatch(job.data.matchId as string);
    }

    if (job.name === 'refresh-leaderboards') {
      if (job.data.scope === 'league') {
        return refreshLeagueLeaderboard(job.data.scopeKey as string);
      }
      return refreshGlobalLeaderboard();
    }

    return { ignored: true };
  },
  { connection },
);

console.log('SoccerX scoring worker is running');
