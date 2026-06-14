import { Injectable } from '@nestjs/common';
import { and, asc, desc, eq } from 'drizzle-orm';
import { getDb, leaderboardCache } from '@soccerx/db';

@Injectable()
export class LeaderboardsService {
  private readonly db = getDb();

  async global(limit = 50) {
    return this.db
      .select()
      .from(leaderboardCache)
      .where(and(eq(leaderboardCache.scopeType, 'global'), eq(leaderboardCache.scopeKey, 'all')))
      .orderBy(asc(leaderboardCache.rank), desc(leaderboardCache.totalPoints))
      .limit(limit);
  }

  async forLeague(leagueId: string, limit = 50) {
    return this.db
      .select()
      .from(leaderboardCache)
      .where(and(eq(leaderboardCache.scopeType, 'league'), eq(leaderboardCache.scopeKey, leagueId)))
      .orderBy(asc(leaderboardCache.rank), desc(leaderboardCache.totalPoints))
      .limit(limit);
  }
}
